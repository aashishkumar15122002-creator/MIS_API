const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const dataDir = path.resolve(__dirname, '..', 'data');
const dbPath = path.join(dataDir, 'db.json');
const signupPath = path.join(dataDir, 'userid-password.json');

const initialDb = {
  customers: [],
  phones: [],
  messages: [],
  queue: [],
  sessions: []
};

function ensureDb() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(initialDb, null, 2));
  }
}

function readDb() {
  ensureDb();
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  return migrateDb(db);
}

function writeDb(db) {
  ensureDb();
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

function readSignupRegistry() {
  ensureDb();
  if (!fs.existsSync(signupPath)) {
    return { signups: [] };
  }

  const registry = JSON.parse(fs.readFileSync(signupPath, 'utf8'));
  if (!Array.isArray(registry.signups)) {
    registry.signups = [];
  }
  return registry;
}

function writeSignupRegistry(registry) {
  ensureDb();
  fs.writeFileSync(signupPath, JSON.stringify(registry, null, 2));
}

function id(prefix) {
  return `${prefix}_${crypto.randomBytes(10).toString('hex')}`;
}

function secret(prefix) {
  return `${prefix}_${crypto.randomBytes(24).toString('hex')}`;
}

function hash(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function createCustomer({ name, trialDays, username, password }) {
  const apiKey = secret('wqa');
  const connectToken = secret('connect');
  const loginPassword = password || secret('pwd');
  const loginUsername = normalizeUsername(username || `${name}-${crypto.randomBytes(3).toString('hex')}`);
  const passwordSalt = crypto.randomBytes(16).toString('hex');
  const now = new Date();
  const trialEndsAt = new Date(now.getTime() + trialDays * 24 * 60 * 60 * 1000);
  const customer = {
    id: id('cus'),
    name,
    username: loginUsername,
    plainPassword: loginPassword,
    passwordSalt,
    passwordHash: hashPassword(loginPassword, passwordSalt),
    status: 'trialing',
    apiKey,
    apiKeyHash: hash(apiKey),
    connectTokenHash: hash(connectToken),
    webhookUrl: '',
    trialEndsAt: trialEndsAt.toISOString(),
    subscriptionStatus: 'trialing',
    createdAt: now.toISOString()
  };

  const db = readDb();
  if (db.customers.some(customer => customer.username === loginUsername)) {
    const err = new Error('Customer username already exists.');
    err.statusCode = 409;
    throw err;
  }
  db.customers.push(customer);
  writeDb(db);

  return { customer, apiKey, connectToken, username: loginUsername, password: loginPassword };
}

function createSignupCustomer({ name, trialDays, username, password }) {
  const loginUsername = normalizeUsername(username);
  if (!loginUsername) {
    const err = new Error('User ID is required.');
    err.statusCode = 400;
    throw err;
  }

  if (String(password || '').length < 6) {
    const err = new Error('Password must be at least 6 characters.');
    err.statusCode = 400;
    throw err;
  }

  const registry = readSignupRegistry();
  if (registry.signups.some(signup => signup.username === loginUsername)) {
    const err = new Error('This user ID has already used the free trial. Please login instead.');
    err.statusCode = 409;
    throw err;
  }

  const result = createCustomer({
    name: String(name || loginUsername).trim() || loginUsername,
    trialDays,
    username: loginUsername,
    password
  });

  registry.signups.unshift({
    username: result.customer.username,
    customerId: result.customer.id,
    plainPassword: result.customer.plainPassword,
    passwordSalt: result.customer.passwordSalt,
    passwordHash: result.customer.passwordHash,
    trialClaimedAt: result.customer.createdAt,
    trialEndsAt: result.customer.trialEndsAt
  });
  writeSignupRegistry(registry);

  return result;
}

function findCustomerByApiKey(apiKey) {
  if (!apiKey) {
    return null;
  }
  return readDb().customers.find(customer => customer.apiKeyHash === hash(apiKey)) || null;
}

function findCustomerById(customerId) {
  return readDb().customers.find(customer => customer.id === customerId) || null;
}

function updateCustomer(customerId, patch) {
  const db = readDb();
  const customer = db.customers.find(item => item.id === customerId);
  if (!customer) {
    return null;
  }
  Object.assign(customer, patch);
  writeDb(db);
  return customer;
}

function deleteCustomer(customerId) {
  const db = readDb();
  const customer = db.customers.find(item => item.id === customerId);
  if (!customer) {
    return null;
  }

  const before = {
    phones: db.phones.length,
    messages: db.messages.length,
    queue: db.queue.length,
    sessions: db.sessions.length
  };

  db.customers = db.customers.filter(item => item.id !== customerId);
  db.phones = db.phones.filter(item => item.customerId !== customerId);
  db.messages = db.messages.filter(item => item.customerId !== customerId);
  db.queue = db.queue.filter(item => item.customerId !== customerId);
  db.sessions = db.sessions.filter(item => item.customerId !== customerId);
  writeDb(db);

  return {
    customer,
    removed: {
      phones: before.phones - db.phones.length,
      messages: before.messages - db.messages.length,
      queue: before.queue - db.queue.length,
      sessions: before.sessions - db.sessions.length
    }
  };
}

function findCustomerByLogin(username, password) {
  const normalized = normalizeUsername(username);
  const customer = readDb().customers.find(item => item.username === normalized);
  if (!customer || !customer.passwordSalt || !customer.passwordHash) {
    return null;
  }

  const candidate = hashPassword(password, customer.passwordSalt);
  return safeEqual(candidate, customer.passwordHash) ? customer : null;
}

function createSession(customerId) {
  const token = secret('sess');
  const db = readDb();
  const session = {
    id: id('ses'),
    customerId,
    tokenHash: hash(token),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString()
  };
  db.sessions.unshift(session);
  db.sessions = db.sessions.slice(0, 1000);
  writeDb(db);
  return { session, token };
}

function findCustomerBySessionToken(token) {
  if (!token) {
    return null;
  }

  const db = readDb();
  const session = db.sessions.find(item => item.tokenHash === hash(token));
  if (!session || new Date(session.expiresAt).getTime() <= Date.now()) {
    return null;
  }

  return db.customers.find(customer => customer.id === session.customerId) || null;
}

function isCustomerAllowed(customer) {
  if (!customer || customer.status === 'blocked') {
    return false;
  }

  if (customer.subscriptionStatus === 'active') {
    return true;
  }

  return new Date(customer.trialEndsAt).getTime() > Date.now();
}

function verifyConnectToken(customer, token) {
  return Boolean(customer && token && customer.connectTokenHash === hash(token));
}

function createPhone({ customerId, label }) {
  const phone = {
    id: id('phn'),
    customerId,
    label: label || 'WhatsApp Phone',
    status: 'created',
    lastQrAt: null,
    lastReadyAt: null,
    lastDisconnectedAt: null,
    createdAt: new Date().toISOString()
  };
  const db = readDb();
  db.phones.push(phone);
  writeDb(db);
  return phone;
}

function updatePhone(phoneId, patch) {
  const db = readDb();
  const phone = db.phones.find(item => item.id === phoneId);
  if (!phone) {
    return null;
  }
  Object.assign(phone, patch);
  writeDb(db);
  return phone;
}

function findPhone(phoneId) {
  return readDb().phones.find(phone => phone.id === phoneId) || null;
}

function listPhones(customerId) {
  return readDb().phones.filter(phone => phone.customerId === customerId);
}

function ensureSingleCustomerPhone(customerId, label = 'Main WhatsApp') {
  const db = readDb();
  const phones = db.phones
    .filter(phone => phone.customerId === customerId)
    .sort((left, right) => new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime());

  if (!phones.length) {
    const phone = {
      id: id('phn'),
      customerId,
      label,
      status: 'created',
      lastQrAt: null,
      lastReadyAt: null,
      lastDisconnectedAt: null,
      createdAt: new Date().toISOString()
    };
    db.phones.push(phone);
    writeDb(db);
    return { phone, removed: [] };
  }

  const keeper = phones.find(phone => phone.status === 'ready')
    || phones.find(phone => phone.status === 'qr')
    || phones.find(phone => phone.status === 'starting')
    || phones[0];
  const removed = phones.filter(phone => phone.id !== keeper.id);
  if (removed.length) {
    const removeIds = new Set(removed.map(phone => phone.id));
    db.phones = db.phones.filter(phone => phone.customerId !== customerId || !removeIds.has(phone.id));
    writeDb(db);
  }

  return { phone: keeper, removed };
}

function listCustomerSummaries() {
  const db = readDb();
  return db.customers.map(customer => {
    const phones = db.phones.filter(phone => phone.customerId === customer.id);
    const queue = db.queue.filter(item => item.customerId === customer.id);
    const messages = db.messages.filter(message => message.customerId === customer.id);
    return {
      id: customer.id,
      name: customer.name,
      username: customer.username,
      plainPassword: customer.plainPassword || '',
      apiKey: customer.apiKey || '',
      status: customer.status,
      disabled: customer.status === 'blocked',
      subscriptionStatus: customer.subscriptionStatus,
      trialEndsAt: customer.trialEndsAt,
      createdAt: customer.createdAt,
      phoneCount: phones.length,
      queueCount: queue.length,
      pendingQueueCount: queue.filter(item => item.status === 'queued' || item.status === 'sending').length,
      messageCount: messages.length,
      lastMessageAt: messages[0]?.createdAt || null
    };
  });
}

function logMessage(entry) {
  const db = readDb();
  const message = {
    id: id('msg'),
    createdAt: new Date().toISOString(),
    ...entry
  };
  db.messages.unshift(message);
  db.messages = db.messages.slice(0, 5000);
  writeDb(db);
  return message;
}

function listMessages(customerId, limit = 100) {
  return readDb()
    .messages
    .filter(message => message.customerId === customerId)
    .slice(0, Math.min(Number(limit) || 100, 500));
}

function listPhoneMessages(phoneId, limit = 100) {
  return readDb()
    .messages
    .filter(message => message.phoneId === phoneId)
    .slice(0, Math.min(Number(limit) || 100, 500));
}

function enqueueMessage(entry) {
  const db = readDb();
  const queued = {
    id: id('que'),
    status: 'queued',
    attempts: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...entry
  };
  db.queue.unshift(queued);
  db.queue = db.queue.slice(0, 5000);
  writeDb(db);
  return queued;
}

function listQueue(customerId, limit = 100) {
  return readDb()
    .queue
    .filter(item => item.customerId === customerId)
    .slice(0, Math.min(Number(limit) || 100, 500));
}

function listPhoneQueue(phoneId, limit = 100) {
  return readDb()
    .queue
    .filter(item => item.phoneId === phoneId)
    .slice(0, Math.min(Number(limit) || 100, 500));
}

function nextQueuedMessage() {
  return readDb()
    .queue
    .slice()
    .reverse()
    .find(item => item.status === 'queued') || null;
}

function updateQueueMessage(queueId, patch) {
  const db = readDb();
  const item = db.queue.find(entry => entry.id === queueId);
  if (!item) {
    return null;
  }
  Object.assign(item, patch, { updatedAt: new Date().toISOString() });
  writeDb(db);
  return item;
}

function migrateDb(db) {
  let changed = false;
  for (const key of Object.keys(initialDb)) {
    if (!Array.isArray(db[key])) {
      db[key] = [];
      changed = true;
    }
  }
  if (changed) {
    writeDb(db);
  }
  return db;
}

function normalizeUsername(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(String(password || ''), salt, 120000, 32, 'sha256').toString('hex');
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

module.exports = {
  createCustomer,
  deleteCustomer,
  createPhone,
  createSession,
  createSignupCustomer,
  enqueueMessage,
  findCustomerByApiKey,
  findCustomerById,
  findCustomerByLogin,
  findCustomerBySessionToken,
  findPhone,
  ensureSingleCustomerPhone,
  isCustomerAllowed,
  listPhoneMessages,
  listPhoneQueue,
  listMessages,
  listPhones,
  listCustomerSummaries,
  listQueue,
  logMessage,
  nextQueuedMessage,
  updateCustomer,
  updatePhone,
  updateQueueMessage,
  verifyConnectToken
};
