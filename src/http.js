function sendJson(response, statusCode, payload, headers = {}) {
  response.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    pragma: 'no-cache',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'content-type,authorization,x-session-token,x-admin-session-token',
    ...headers
  });
  response.end(JSON.stringify(payload, null, 2));
}

function sendHtml(response, statusCode, html, headers = {}) {
  response.writeHead(statusCode, {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'no-store',
    pragma: 'no-cache',
    ...headers
  });
  response.end(html);
}

function redirect(response, location) {
  response.writeHead(302, { location });
  response.end();
}

async function readJson(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch {
    throw error(400, 'Invalid JSON body.');
  }
}

function bearerToken(request) {
  const header = request.headers.authorization || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : '';
}

function cookieValue(request, name) {
  const cookie = request.headers.cookie || '';
  const parts = cookie.split(';').map(part => part.trim()).filter(Boolean);
  for (const part of parts) {
    const index = part.indexOf('=');
    if (index === -1) {
      continue;
    }
    const key = part.slice(0, index);
    const value = part.slice(index + 1);
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return '';
}

function sessionCookie(name, value, maxAgeSeconds) {
  const encoded = encodeURIComponent(value);
  return `${name}=${encoded}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
}

function clearCookie(name) {
  return `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

function error(statusCode, message, details) {
  const err = new Error(message);
  err.statusCode = statusCode;
  err.details = details;
  return err;
}

module.exports = {
  bearerToken,
  clearCookie,
  cookieValue,
  error,
  redirect,
  readJson,
  sendHtml,
  sendJson,
  sessionCookie
};
