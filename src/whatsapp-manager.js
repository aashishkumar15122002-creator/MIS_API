const path = require('node:path');
const fs = require('node:fs');
const qrcode = require('qrcode');
const {
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeWASocket,
  useMultiFileAuthState
} = require('@whiskeysockets/baileys');
const { updatePhone } = require('./store');

const clients = new Map();
const runtime = new Map();
const sessionDir = path.resolve(__dirname, '..', 'sessions');

function getOrStartClient(phone) {
  const existing = clients.get(phone.id);
  if (existing) {
    return existing;
  }

  setRuntime(phone.id, {
    qr: null,
    qrImage: null,
    status: 'starting',
    ready: false,
    error: null
  });

  const entry = {
    socket: null,
    starting: startClient(phone)
  };
  clients.set(phone.id, entry);
  return entry;
}

async function startClient(phone) {
  try {
    const authPath = authPathFor(phone.id);
    const { state: auth, saveCreds } = await useMultiFileAuthState(authPath);
    const { version } = await fetchLatestBaileysVersion();
    const socket = makeWASocket({
      auth,
      version,
      printQRInTerminal: false,
      browser: ['MIS_api', 'Baileys', '1.0']
    });

    const entry = clients.get(phone.id);
    if (entry) {
      entry.socket = socket;
    }

    socket.ev.on('creds.update', saveCreds);
    socket.ev.on('connection.update', update => {
      handleConnectionUpdate(phone, update);
    });

    return socket;
  } catch (err) {
    setRuntime(phone.id, {
      qr: null,
      qrImage: null,
      status: 'error',
      ready: false,
      error: err.message
    });
    updatePhone(phone.id, { status: 'error' });
    clients.delete(phone.id);
    throw err;
  }
}

async function handleConnectionUpdate(phone, update) {
  const { connection, lastDisconnect, qr } = update;

  if (qr) {
    const qrImage = await qrcode.toDataURL(qr);
    setRuntime(phone.id, {
      qr,
      qrImage,
      status: 'qr',
      ready: false,
      error: null
    });
    updatePhone(phone.id, {
      status: 'qr',
      lastQrAt: new Date().toISOString()
    });
    return;
  }

  if (connection === 'connecting') {
    setRuntime(phone.id, {
      ...stateFor(phone.id),
      status: 'starting',
      ready: false,
      error: null
    });
    updatePhone(phone.id, { status: 'starting' });
  }

  if (connection === 'open') {
    setRuntime(phone.id, {
      qr: null,
      qrImage: null,
      status: 'ready',
      ready: true,
      error: null
    });
    updatePhone(phone.id, {
      status: 'ready',
      lastReadyAt: new Date().toISOString()
    });
  }

  if (connection === 'close') {
    const reason = lastDisconnect?.error?.output?.statusCode;
    const loggedOut = reason === DisconnectReason.loggedOut;
    const message = lastDisconnect?.error?.message || 'WhatsApp connection closed.';

    clients.delete(phone.id);
    setRuntime(phone.id, {
      qr: null,
      qrImage: null,
      status: loggedOut ? 'unlinked' : 'disconnected',
      ready: false,
      error: loggedOut ? null : message
    });
    updatePhone(phone.id, {
      status: loggedOut ? 'unlinked' : 'disconnected',
      lastDisconnectedAt: new Date().toISOString()
    });

    if (!loggedOut) {
      setTimeout(() => {
        getOrStartClient(phone);
      }, 3000);
    }
  }
}

async function sendText(phone, to, message) {
  return sendMessage(phone, to, { message });
}

async function sendMessage(phone, to, { message, file } = {}) {
  const entry = getOrStartClient(phone);
  const socket = entry.socket || await entry.starting;
  const state = stateFor(phone.id);

  if (!state.ready) {
    throw new Error('WhatsApp phone is not ready. Scan QR first.');
  }

  const jid = `${normalizePhone(to)}@s.whatsapp.net`;
  if (file?.data && file?.mimetype) {
    return socket.sendMessage(jid, mediaPayload(file, message));
  }

  return socket.sendMessage(jid, { text: String(message || '') });
}

async function restartClient(phone) {
  const current = clients.get(phone.id);
  if (current?.socket) {
    try {
      current.socket.end(new Error('Session restarted.'));
    } catch {
      // The socket may already be closed.
    }
  }
  clients.delete(phone.id);

  setRuntime(phone.id, {
    qr: null,
    qrImage: null,
    status: 'starting',
    ready: false,
    error: null
  });
  updatePhone(phone.id, { status: 'starting' });
  return getOrStartClient(phone);
}

async function unlinkClient(phone) {
  const current = clients.get(phone.id);
  if (current?.socket) {
    try {
      await current.socket.logout();
    } catch {
      // Logout can fail when the socket is already closed; removing auth still unlinks locally.
    }
    try {
      current.socket.end(new Error('Session unlinked.'));
    } catch {
      // The socket may already be closed.
    }
  }

  clients.delete(phone.id);
  fs.rmSync(authPathFor(phone.id), { recursive: true, force: true });
  setRuntime(phone.id, {
    qr: null,
    qrImage: null,
    status: 'unlinked',
    ready: false,
    error: null
  });
  updatePhone(phone.id, {
    status: 'unlinked',
    lastDisconnectedAt: new Date().toISOString()
  });
}

function mediaPayload(file, caption) {
  const buffer = Buffer.from(file.data, 'base64');
  const mimetype = String(file.mimetype || 'application/octet-stream');
  const filename = file.filename || 'file';

  if (mimetype.startsWith('image/')) {
    return { image: buffer, caption: caption || undefined, mimetype };
  }

  if (mimetype.startsWith('video/')) {
    return { video: buffer, caption: caption || undefined, mimetype };
  }

  if (mimetype.startsWith('audio/')) {
    return { audio: buffer, mimetype };
  }

  return {
    document: buffer,
    mimetype,
    fileName: filename,
    caption: caption || undefined
  };
}

function getRuntimeStatus(phoneId) {
  return runtime.get(phoneId) || {
    qr: null,
    qrImage: null,
    status: 'not_started',
    ready: false,
    error: null
  };
}

function stateFor(phoneId) {
  if (!runtime.has(phoneId)) {
    setRuntime(phoneId, {
      qr: null,
      qrImage: null,
      status: 'not_started',
      ready: false,
      error: null
    });
  }
  return runtime.get(phoneId);
}

function setRuntime(phoneId, patch) {
  runtime.set(phoneId, patch);
}

function authPathFor(phoneId) {
  return path.join(sessionDir, phoneId);
}

function normalizePhone(value) {
  return String(value || '').replace(/[^\d]/g, '');
}

module.exports = {
  getOrStartClient,
  getRuntimeStatus,
  restartClient,
  sendMessage,
  sendText,
  unlinkClient
};
