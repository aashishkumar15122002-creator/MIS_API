const http = require('node:http');
const crypto = require('node:crypto');
const { URL } = require('node:url');
const { config } = require('./config');
const {
  bearerToken,
  clearCookie,
  cookieValue,
  error,
  readJson,
  redirect,
  sendHtml,
  sendJson,
  sessionCookie
} = require('./http');
const { adminPage, connectPage, homePage, loginPage } = require('./pages');
const {
  createCustomer,
  createPhone,
  createSession,
  createSignupCustomer,
  enqueueMessage,
  findCustomerByApiKey,
  findCustomerById,
  findCustomerByLogin,
  findCustomerBySessionToken,
  findPhone,
  isCustomerAllowed,
  listPhoneMessages,
  listPhoneQueue,
  listCustomerSummaries,
  listMessages,
  listPhones,
  listQueue,
  logMessage,
  nextQueuedMessage,
  updateCustomer,
  updateQueueMessage,
  verifyConnectToken
} = require('./store');
const { getOrStartClient, getRuntimeStatus, onWhatsappEvent, restartClient, sendMessage, unlinkClient } = require('./whatsapp-manager');

const server = http.createServer(async (request, response) => {
  try {
    if (request.method === 'OPTIONS') {
      return sendJson(response, 204, {});
    }

    const url = new URL(request.url, config.baseUrl);

    if (request.method === 'GET' && (
      url.pathname === '/' ||
      url.pathname === '/Login_page' ||
      url.pathname === '/login_page' ||
      url.pathname === '/main_page'
    )) {
      return sendHtml(response, 200, loginPage({ config }));
    }

    if (request.method === 'GET' && url.pathname === '/site') {
      return sendHtml(response, 200, loginPage({ config }));
    }

    if (request.method === 'GET' && url.pathname === '/admin') {
      if (!isValidAdminSession(request)) {
        return redirect(response, '/Login_page');
      }
      return sendHtml(response, 200, adminPage({ config }));
    }

    if (request.method === 'GET' && url.pathname === '/login') {
      return sendHtml(response, 200, loginPage({ config }));
    }

    if (request.method === 'GET' && url.pathname === '/health') {
      return sendJson(response, 200, { ok: true, time: new Date().toISOString() });
    }

    if (request.method === 'POST' && url.pathname === '/v1/auth/login') {
      const authKey = request.socket.remoteAddress || 'unknown';
      requireLoginAllowed(authKey);
      const body = await readJson(request);
      if (isAdminLogin(body.username, body.password)) {
        const adminSession = createAdminSession();
        clearLoginFailures(authKey);
        return sendJson(response, 200, {
          ok: true,
          role: 'admin',
          adminSessionToken: adminSession.token,
          expiresAt: adminSession.expiresAt
        }, {
          'set-cookie': sessionCookie('mis_admin_session', adminSession.token, 12 * 60 * 60)
        });
      }

      const customer = findCustomerByLogin(body.username, body.password);

      if (!customer || !isCustomerAllowed(customer)) {
        recordLoginFailure(authKey);
        throw error(401, 'Invalid username or password.');
      }

      const { token, session } = createSession(customer.id);
      clearLoginFailures(authKey);
      return sendJson(response, 200, {
        ok: true,
        role: 'customer',
        sessionToken: token,
        expiresAt: session.expiresAt,
        customer: publicCustomer(customer)
      }, {
        'set-cookie': sessionCookie('mis_customer_session', token, 30 * 24 * 60 * 60)
      });
    }

    if (request.method === 'POST' && url.pathname === '/v1/auth/signup') {
      const authKey = request.socket.remoteAddress || 'unknown';
      requireLoginAllowed(authKey);
      const body = await readJson(request);
      const username = String(body.username || '').trim();
      const password = String(body.password || '');
      const name = String(body.name || body.companyName || username).trim();

      const result = createSignupCustomer({
        name,
        trialDays: config.trialDays,
        username,
        password
      });
      const phone = createPhone({
        customerId: result.customer.id,
        label: body.phoneLabel || 'Main WhatsApp'
      });
      getOrStartClient(phone);

      const { token, session } = createSession(result.customer.id);
      clearLoginFailures(authKey);
      return sendJson(response, 201, {
        ok: true,
        role: 'customer',
        sessionToken: token,
        expiresAt: session.expiresAt,
        customer: publicCustomer(result.customer),
        phone
      }, {
        'set-cookie': sessionCookie('mis_customer_session', token, 30 * 24 * 60 * 60)
      });
    }

    if (request.method === 'POST' && url.pathname === '/v1/auth/logout') {
      return sendJson(response, 200, { ok: true }, {
        'set-cookie': [
          clearCookie('mis_admin_session'),
          clearCookie('mis_customer_session')
        ]
      });
    }

    if (request.method === 'GET' && url.pathname === '/v1/customer/me') {
      const customer = requireSessionCustomer(request);
      return sendJson(response, 200, {
        ok: true,
        customer: publicCustomer(customer),
        phones: listPhones(customer.id)
      });
    }

    if (request.method === 'POST' && url.pathname === '/v1/customer/webhook') {
      const customer = requireSessionCustomer(request);
      const body = await readJson(request);
      const webhookUrl = normalizeWebhookUrl(body.webhookUrl || body.url);
      const updated = updateCustomer(customer.id, { webhookUrl });
      return sendJson(response, 200, {
        ok: true,
        customer: publicCustomer(updated)
      });
    }

    if (request.method === 'GET' && url.pathname === '/v1/customer/messages') {
      const customer = requireSessionCustomer(request);
      return sendJson(response, 200, {
        ok: true,
        messages: listMessages(customer.id, url.searchParams.get('limit') || 100)
      });
    }

    if (request.method === 'GET' && url.pathname === '/v1/customer/queue') {
      const customer = requireSessionCustomer(request);
      return sendJson(response, 200, {
        ok: true,
        queue: listQueue(customer.id, url.searchParams.get('limit') || 100)
      });
    }

    const customerUnlinkMatch = url.pathname.match(/^\/v1\/customer\/phones\/([^/]+)\/unlink$/);
    if (request.method === 'POST' && customerUnlinkMatch) {
      const customer = requireSessionCustomer(request);
      const phone = findPhone(customerUnlinkMatch[1]);

      if (!phone || phone.customerId !== customer.id) {
        throw error(404, 'Phone not found.');
      }

      await unlinkClient(phone);
      return sendJson(response, 200, {
        ok: true,
        phoneId: phone.id,
        status: 'unlinked'
      });
    }

    const customerPhoneStatusMatch = url.pathname.match(/^\/v1\/customer\/phones\/([^/]+)\/status$/);
    if (request.method === 'GET' && customerPhoneStatusMatch) {
      const customer = requireSessionCustomer(request);
      const phone = findPhone(customerPhoneStatusMatch[1]);

      if (!phone || phone.customerId !== customer.id) {
        throw error(404, 'Phone not found.');
      }

      const state = getRuntimeStatus(phone.id);
      return sendJson(response, 200, {
        ok: true,
        phoneId: phone.id,
        label: phone.label,
        status: state.status || phone.status,
        ready: state.ready || phone.status === 'ready',
        qrImage: state.qrImage,
        error: state.error
      });
    }

    const customerPhoneLinkMatch = url.pathname.match(/^\/v1\/customer\/phones\/([^/]+)\/link$/);
    if (request.method === 'POST' && customerPhoneLinkMatch) {
      const customer = requireSessionCustomer(request);
      const phone = findPhone(customerPhoneLinkMatch[1]);

      if (!phone || phone.customerId !== customer.id) {
        throw error(404, 'Phone not found.');
      }

      await restartClient(phone);
      const state = getRuntimeStatus(phone.id);
      return sendJson(response, 202, {
        ok: true,
        phoneId: phone.id,
        status: state.status,
        ready: state.ready,
        qrImage: state.qrImage
      });
    }

    if (request.method === 'POST' && url.pathname === '/v1/admin/customers') {
      requireAdminSession(request);
      const body = await readJson(request);
      const name = String(body.name || '').trim();

      if (!name) {
        throw error(400, '`name` is required.');
      }

      const result = createCustomer({
        name,
        trialDays: Number(body.trialDays || config.trialDays),
        username: body.username,
        password: body.password
      });
      const phone = createPhone({
        customerId: result.customer.id,
        label: body.phoneLabel || 'Main WhatsApp'
      });
      getOrStartClient(phone);

      return sendJson(response, 201, {
        ok: true,
        customer: publicCustomer(result.customer),
        apiKey: result.apiKey,
        connectToken: result.connectToken,
        username: result.username,
        password: result.password,
        phone,
        connectUrl: `${config.baseUrl}/connect/${phone.id}?token=${encodeURIComponent(result.connectToken)}`
      });
    }

    if (request.method === 'GET' && url.pathname === '/v1/admin/customers') {
      requireAdminSession(request);
      return sendJson(response, 200, {
        ok: true,
        customers: listCustomerSummaries()
      });
    }

    if (request.method === 'POST' && url.pathname === '/v1/phones') {
      const customer = requireCustomer(request);
      const body = await readJson(request);
      const phone = createPhone({ customerId: customer.id, label: body.label });
      getOrStartClient(phone);
      return sendJson(response, 201, {
        ok: true,
        phone,
        connectUrl: `${config.baseUrl}/connect/${phone.id}?token=CONNECT_TOKEN`,
        note: 'Replace CONNECT_TOKEN with the customer connect token printed when the customer was created.'
      });
    }

    const connectMatch = url.pathname.match(/^\/connect\/([^/]+)$/);
    if (request.method === 'GET' && connectMatch) {
      const phone = requirePhoneWithConnectToken(connectMatch[1], url.searchParams.get('token'));
      const customer = findCustomerById(phone.customerId);
      getOrStartClient(phone);
      return sendHtml(response, 200, connectPage({
        phone,
        status: getRuntimeStatus(phone.id),
        token: url.searchParams.get('token'),
        apiKey: customer?.apiKey || ''
      }));
    }

    const phoneStatusMatch = url.pathname.match(/^\/v1\/phones\/([^/]+)\/status$/);
    if (request.method === 'GET' && phoneStatusMatch) {
      const phone = getPhoneForStatus(request, url, phoneStatusMatch[1]);
      getOrStartClient(phone);
      const state = getRuntimeStatus(phone.id);
      return sendJson(response, 200, {
        ok: true,
        phoneId: phone.id,
        label: phone.label,
        status: state.status,
        ready: state.ready,
        qrImage: state.qrImage,
        error: state.error
      });
    }

    const phoneRestartMatch = url.pathname.match(/^\/v1\/phones\/([^/]+)\/restart$/);
    if (request.method === 'POST' && phoneRestartMatch) {
      const phone = getPhoneForStatus(request, url, phoneRestartMatch[1]);
      await restartClient(phone);
      return sendJson(response, 202, { ok: true, phoneId: phone.id, status: 'starting' });
    }

    const phoneMessagesMatch = url.pathname.match(/^\/v1\/phones\/([^/]+)\/messages$/);
    if (request.method === 'GET' && phoneMessagesMatch) {
      const phone = getPhoneForStatus(request, url, phoneMessagesMatch[1]);
      return sendJson(response, 200, {
        ok: true,
        messages: listPhoneMessages(phone.id, url.searchParams.get('limit') || 50)
      });
    }

    const phoneQueueMatch = url.pathname.match(/^\/v1\/phones\/([^/]+)\/queue$/);
    if (request.method === 'GET' && phoneQueueMatch) {
      const phone = getPhoneForStatus(request, url, phoneQueueMatch[1]);
      return sendJson(response, 200, {
        ok: true,
        queue: listPhoneQueue(phone.id, url.searchParams.get('limit') || 50)
      });
    }

    if (request.method === 'GET' && url.pathname === '/v1/phones') {
      const customer = requireCustomer(request);
      return sendJson(response, 200, { ok: true, phones: listPhones(customer.id) });
    }

    if (request.method === 'POST' && url.pathname === '/v1/messages/send') {
      const customer = requireCustomer(request);
      const body = await readJson(request);
      const phone = findPhone(body.phoneId);

      if (!phone || phone.customerId !== customer.id) {
        throw error(404, 'Phone not found.');
      }

      const file = normalizeFile(body.file || body.media);
      if (!body.to || (!body.message && !file)) {
        throw error(400, '`phoneId`, `to`, and `message` or `file` are required.');
      }

      const queued = enqueueMessage({
        customerId: customer.id,
        phoneId: phone.id,
        to: normalizePhone(body.to),
        message: body.message || '',
        file,
        source: 'api'
      });
      notifyWebhook(customer, 'message.queued', {
        queueId: queued.id,
        phoneId: phone.id,
        to: queued.to,
        message: queued.message,
        file: publicFile(queued.file),
        status: queued.status,
        createdAt: queued.createdAt
      });
      return sendJson(response, 202, {
        ok: true,
        queued: true,
        queueId: queued.id,
        status: queued.status
      });
    }

    if (request.method === 'POST' && url.pathname === '/v1/messages/queue') {
      const customer = requireCustomer(request);
      const body = await readJson(request);
      const phone = findPhone(body.phoneId);

      if (!phone || phone.customerId !== customer.id) {
        throw error(404, 'Phone not found.');
      }

      const file = normalizeFile(body.file || body.media);
      if (!body.to || (!body.message && !file)) {
        throw error(400, '`phoneId`, `to`, and `message` or `file` are required.');
      }

      const queued = enqueueMessage({
        customerId: customer.id,
        phoneId: phone.id,
        to: normalizePhone(body.to),
        message: body.message || '',
        file
      });
      notifyWebhook(customer, 'message.queued', {
        queueId: queued.id,
        phoneId: phone.id,
        to: queued.to,
        message: queued.message,
        file: publicFile(queued.file),
        status: queued.status,
        createdAt: queued.createdAt
      });
      return sendJson(response, 202, { ok: true, queueId: queued.id, status: queued.status });
    }

    if (request.method === 'GET' && url.pathname === '/v1/messages') {
      const customer = requireCustomer(request);
      return sendJson(response, 200, {
        ok: true,
        messages: listMessages(customer.id, url.searchParams.get('limit') || 100)
      });
    }

    if (request.method === 'GET' && url.pathname === '/v1/queue') {
      const customer = requireCustomer(request);
      return sendJson(response, 200, {
        ok: true,
        queue: listQueue(customer.id, url.searchParams.get('limit') || 100)
      });
    }

    throw error(404, 'Route not found.');
  } catch (err) {
    return sendJson(response, err.statusCode || 500, {
      ok: false,
      error: err.message,
      details: err.details
    });
  }
});

server.listen(config.port, () => {
  console.log(`MIS_api QR WhatsApp API running at ${config.baseUrl}`);
});

let queueProcessing = false;
const adminSessions = new Map();
const loginFailures = new Map();
setInterval(processQueue, config.queueIntervalMs);

function requireCustomer(request) {
  const customer = findCustomerByApiKey(bearerToken(request));

  if (!customer) {
    throw error(401, 'Invalid or missing API key.');
  }

  if (!isCustomerAllowed(customer)) {
    throw error(402, 'Trial expired or subscription inactive.');
  }

  return customer;
}

function requireSessionCustomer(request) {
  const token = request.headers['x-session-token'] || cookieValue(request, 'mis_customer_session');
  const customer = findCustomerBySessionToken(token);

  if (!customer) {
    throw error(401, 'Invalid or missing session.');
  }

  if (!isCustomerAllowed(customer)) {
    throw error(402, 'Trial expired or subscription inactive.');
  }

  return customer;
}

function requireAdminSession(request) {
  const token = request.headers['x-admin-session-token'] || cookieValue(request, 'mis_admin_session');
  const expiresAt = adminSessions.get(token);

  if (!token || !expiresAt) {
    throw error(401, 'Admin login required.');
  }

  if (Date.now() > expiresAt) {
    adminSessions.delete(token);
    throw error(401, 'Admin login expired.');
  }
}

function isValidAdminSession(request) {
  const token = request.headers['x-admin-session-token'] || cookieValue(request, 'mis_admin_session');
  const expiresAt = adminSessions.get(token);

  if (!token || !expiresAt) {
    return false;
  }

  if (Date.now() > expiresAt) {
    adminSessions.delete(token);
    return false;
  }

  return true;
}

function isAdminLogin(username, password) {
  return Boolean(
    config.adminUsername &&
    config.adminPassword &&
    String(username || '').trim().toLowerCase() === String(config.adminUsername).trim().toLowerCase() &&
    String(password || '') === String(config.adminPassword)
  );
}

function createAdminSession() {
  const expiresAt = Date.now() + 12 * 60 * 60 * 1000;
  const token = `admin_sess_${crypto.randomBytes(24).toString('hex')}`;
  adminSessions.set(token, expiresAt);
  return {
    token,
    expiresAt: new Date(expiresAt).toISOString()
  };
}

function requireLoginAllowed(key) {
  const attempt = loginFailures.get(key);
  if (!attempt) {
    return;
  }

  if (Date.now() > attempt.resetAt) {
    loginFailures.delete(key);
    return;
  }

  if (attempt.count >= 10) {
    throw error(429, 'Too many login attempts. Try again after 15 minutes.');
  }
}

function recordLoginFailure(key) {
  const now = Date.now();
  const attempt = loginFailures.get(key);
  if (!attempt || now > attempt.resetAt) {
    loginFailures.set(key, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return;
  }

  attempt.count += 1;
}

function clearLoginFailures(key) {
  loginFailures.delete(key);
}

function publicCustomer(customer) {
  return {
    id: customer.id,
    name: customer.name,
    username: customer.username,
    apiKey: customer.apiKey || '',
    webhookUrl: customer.webhookUrl || '',
    webhookEnabled: Boolean(customer.webhookUrl),
    status: customer.status,
    subscriptionStatus: customer.subscriptionStatus,
    trialEndsAt: customer.trialEndsAt,
    createdAt: customer.createdAt
  };
}

function requirePhoneWithConnectToken(phoneId, token) {
  const phone = findPhone(phoneId);
  if (!phone) {
    throw error(404, 'Phone not found.');
  }

  const customer = findCustomerById(phone.customerId);
  if (!verifyConnectToken(customer, token)) {
    throw error(401, 'Invalid connect token.');
  }

  if (!isCustomerAllowed(customer)) {
    throw error(402, 'Trial expired or subscription inactive.');
  }

  return phone;
}

function getPhoneForStatus(request, url, phoneId) {
  const apiCustomer = findCustomerByApiKey(bearerToken(request));
  if (apiCustomer) {
    const phone = findPhone(phoneId);
    if (!phone || phone.customerId !== apiCustomer.id) {
      throw error(404, 'Phone not found.');
    }
    return phone;
  }

  return requirePhoneWithConnectToken(phoneId, url.searchParams.get('token'));
}

function normalizePhone(value) {
  return String(value || '').replace(/[^\d]/g, '');
}

function normalizeFile(file) {
  if (!file) {
    return null;
  }

  const data = String(file.data || file.base64 || '').replace(/^data:[^;]+;base64,/, '');
  const mimetype = String(file.mimetype || file.mimeType || '').trim();
  const filename = String(file.filename || file.name || 'file').trim();

  if (!data || !mimetype) {
    throw error(400, '`file.data` and `file.mimetype` are required.');
  }

  return {
    data,
    mimetype,
    filename
  };
}

function normalizeWebhookUrl(value) {
  const webhookUrl = String(value || '').trim();
  if (!webhookUrl) {
    return '';
  }

  let parsed;
  try {
    parsed = new URL(webhookUrl);
  } catch {
    throw error(400, 'Webhook URL must be a valid URL.');
  }

  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    throw error(400, 'Webhook URL must start with http:// or https://.');
  }

  return parsed.toString();
}

function publicFile(file) {
  if (!file) {
    return null;
  }
  return {
    mimetype: file.mimetype,
    filename: file.filename
  };
}

function notifyWebhook(customer, event, data) {
  if (!customer?.webhookUrl) {
    return;
  }

  const payload = {
    event,
    customerId: customer.id,
    timestamp: new Date().toISOString(),
    data
  };

  deliverWebhook(customer.webhookUrl, payload).catch(err => {
    console.error(`Webhook delivery failed for ${customer.id}: ${err.message}`);
  });
}

async function deliverWebhook(webhookUrl, payload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function processQueue() {
  if (queueProcessing) {
    return;
  }

  const item = nextQueuedMessage();
  if (!item) {
    return;
  }

  queueProcessing = true;
  updateQueueMessage(item.id, {
    status: 'sending',
    attempts: Number(item.attempts || 0) + 1
  });

  try {
    const phone = findPhone(item.phoneId);
    if (!phone) {
      throw new Error('Phone not found.');
    }

    const whatsappMessage = await sendMessage(phone, item.to, {
      message: item.message,
      file: item.file
    });
    const log = logMessage({
      customerId: item.customerId,
      phoneId: item.phoneId,
      to: normalizePhone(item.to),
      message: item.message,
      file: item.file,
      status: 'sent',
      source: 'queue',
      whatsappMessageId: whatsappMessage?.id?._serialized || null
    });
    const updatedQueue = updateQueueMessage(item.id, {
      status: 'sent',
      messageId: log.id,
      error: null
    });
    notifyWebhook(findCustomerById(item.customerId), 'message.sent', {
      queueId: item.id,
      messageId: log.id,
      phoneId: item.phoneId,
      to: normalizePhone(item.to),
      message: item.message,
      file: publicFile(item.file),
      status: updatedQueue?.status || 'sent',
      whatsappMessageId: whatsappMessage?.id?._serialized || null,
      sentAt: log.createdAt
    });
  } catch (err) {
    const updatedQueue = updateQueueMessage(item.id, {
      status: 'failed',
      error: err.message
    });
    const log = logMessage({
      customerId: item.customerId,
      phoneId: item.phoneId,
      to: normalizePhone(item.to),
      message: item.message,
      file: item.file,
      status: 'failed',
      source: 'queue',
      error: err.message
    });
    notifyWebhook(findCustomerById(item.customerId), 'message.failed', {
      queueId: item.id,
      messageId: log.id,
      phoneId: item.phoneId,
      to: normalizePhone(item.to),
      message: item.message,
      file: publicFile(item.file),
      status: updatedQueue?.status || 'failed',
      error: err.message,
      failedAt: log.createdAt
    });
  } finally {
    queueProcessing = false;
  }
}

onWhatsappEvent(({ event, payload, timestamp }) => {
  const customer = findCustomerById(payload.customerId);
  if (!customer) {
    return;
  }

  if (event === 'message.received') {
    const log = logMessage({
      customerId: payload.customerId,
      phoneId: payload.phoneId,
      from: payload.from,
      to: '',
      message: payload.message,
      status: 'received',
      source: 'whatsapp',
      direction: 'inbound',
      whatsappMessageId: payload.whatsappMessageId
    });
    notifyWebhook(customer, event, {
      ...payload,
      messageId: log.id,
      receivedAt: payload.receivedAt || timestamp
    });
    return;
  }

  notifyWebhook(customer, event, payload);
});
