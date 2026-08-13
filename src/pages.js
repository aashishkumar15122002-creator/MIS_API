function homePage({ config }) {
  const payment = config.payment;
  return `<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MIS_api | WhatsApp QR API</title>
    <style>
      ${baseStyles()}
      .site-shell { max-width: 1180px; margin: 0 auto; padding: 22px 18px 52px; }
      .nav { align-items: center; display: flex; justify-content: space-between; margin-bottom: 28px; position: sticky; top: 0; z-index: 3; background: rgba(246, 247, 244, .94); border-bottom: 1px solid rgba(220, 227, 221, .72); padding: 10px 0; }
      .brand { color: var(--ink); font-size: 22px; font-weight: 900; letter-spacing: 0; text-decoration: none; }
      .nav-links { align-items: center; display: flex; gap: 16px; }
      .nav-links a { color: var(--muted); font-size: 14px; font-weight: 700; text-decoration: none; }
      .hero { align-items: center; display: grid; gap: 30px; grid-template-columns: 1.1fr .9fr; min-height: 560px; }
      .eyebrow { color: var(--accent); font-size: 13px; font-weight: 800; margin-bottom: 12px; text-transform: uppercase; }
      .hero h1 { font-size: clamp(38px, 6vw, 72px); letter-spacing: 0; line-height: .98; margin: 0 0 18px; max-width: 780px; }
      .hero p { color: var(--muted); font-size: 18px; line-height: 1.55; max-width: 650px; }
      .hero-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
      .hero-visual { background: #101815; border-radius: 8px; color: #fff; min-height: 410px; padding: 22px; position: relative; overflow: hidden; }
      .hero-visual:before { background: #36c487; content: ""; height: 5px; left: 22px; position: absolute; right: 22px; top: 22px; }
      .terminal { margin-top: 38px; }
      .terminal-line { align-items: center; border-bottom: 1px solid rgba(255,255,255,.13); display: flex; justify-content: space-between; padding: 14px 0; }
      .terminal-line span:first-child { color: #b7c9c0; }
      .terminal-line span:last-child { color: #fff; font-weight: 800; }
      .hero-meta { display: grid; gap: 10px; grid-template-columns: repeat(3, 1fr); margin-top: 22px; }
      .metric { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12); border-radius: 8px; padding: 14px; }
      .metric strong { display: block; font-size: 24px; margin-bottom: 4px; }
      .metric span { color: #b7c9c0; font-size: 12px; }
      .console-preview { background: #f2f7f4; border: 1px solid #d6e2db; border-radius: 8px; display: grid; gap: 14px; grid-template-columns: .85fr 1.15fr; padding: 14px; }
      .scan-preview { align-items: center; background: #fff; border: 1px dashed #aab7b1; border-radius: 8px; display: flex; justify-content: center; min-height: 210px; }
      .scan-box { border: 10px solid #101815; height: 112px; width: 112px; }
      .console-list { display: grid; gap: 10px; }
      .console-item { align-items: center; background: #fff; border: 1px solid #dce3dd; border-radius: 8px; display: flex; justify-content: space-between; padding: 13px; }
      .console-item span:first-child { color: var(--muted); }
      .console-item span:last-child { font-weight: 900; }
      .device-access { background: #101815; border-radius: 8px; color: #fff; display: grid; gap: 18px; grid-template-columns: .9fr 1.1fr; margin: 24px 0; padding: 22px; }
      .device-access p { color: #b7c9c0; line-height: 1.5; margin: 8px 0 0; }
      .device-form { display: grid; gap: 10px; }
      .field-grid { display: grid; gap: 10px; grid-template-columns: 1fr 1fr; }
      label { color: #b7c9c0; display: grid; font-size: 12px; font-weight: 800; gap: 6px; text-transform: uppercase; }
      input { background: #fff; border: 1px solid #dce3dd; border-radius: 7px; color: var(--ink); font: inherit; min-height: 42px; padding: 0 12px; width: 100%; }
      .device-form .button { background: #36c487; color: #07130e; width: max-content; }
      .bands { display: grid; gap: 14px; grid-template-columns: repeat(3, 1fr); margin: 24px 0; }
      .feature { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 20px; }
      .feature h3 { font-size: 17px; margin: 0 0 8px; }
      .feature p { color: var(--muted); line-height: 1.5; margin: 0; }
      .wide-feature { display: grid; gap: 14px; grid-template-columns: repeat(2, 1fr); }
      .step-list { counter-reset: steps; display: grid; gap: 10px; }
      .step { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; display: grid; gap: 4px; grid-template-columns: 44px 1fr; padding: 16px; }
      .step:before { align-items: center; background: var(--ink); border-radius: 7px; color: #fff; content: counter(steps); counter-increment: steps; display: flex; font-weight: 900; height: 34px; justify-content: center; width: 34px; }
      .step strong { display: block; margin-bottom: 3px; }
      .step span { color: var(--muted); line-height: 1.45; }
      .section-title { align-items: end; display: flex; gap: 18px; justify-content: space-between; margin: 34px 0 14px; }
      .section-title h2 { font-size: 28px; margin: 0; }
      .section-title p { max-width: 520px; text-align: right; }
      .pricing { display: grid; gap: 14px; grid-template-columns: 1fr 1fr; }
      .price-card { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 22px; }
      .price { font-size: 38px; font-weight: 900; margin: 10px 0; }
      .api-box { background: #f0f4f2; border-radius: 8px; font-family: Consolas, monospace; overflow-wrap: anywhere; padding: 14px; }
      .code-grid { display: grid; gap: 14px; grid-template-columns: 1.1fr .9fr; }
      .faq { display: grid; gap: 10px; }
      .faq details { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 16px; }
      .faq summary { cursor: pointer; font-weight: 800; }
      .faq p { color: var(--muted); line-height: 1.5; margin: 10px 0 0; }
      .contact-band { align-items: center; background: #101815; border-radius: 8px; color: #fff; display: flex; gap: 16px; justify-content: space-between; margin-top: 34px; padding: 22px; }
      .contact-band p { color: #b7c9c0; margin-top: 6px; }
      .contact-band .button { background: #36c487; color: #07130e; }
      @media (max-width: 850px) {
        .hero, .bands, .pricing, .code-grid, .wide-feature, .console-preview, .device-access, .field-grid { grid-template-columns: 1fr; }
        .hero { min-height: auto; }
        .nav { align-items: flex-start; gap: 14px; position: static; }
        .nav-links { flex-wrap: wrap; justify-content: flex-end; }
        .section-title { align-items: flex-start; display: block; }
        .section-title p { margin-top: 6px; text-align: left; }
        .hero-meta { grid-template-columns: 1fr; }
        .contact-band { align-items: flex-start; display: block; }
        .contact-band .button { margin-top: 14px; width: 100%; }
      }
      ${professionalStyles()}
      ${appLoginStyles()}
    </style>
  </head>
  <body>
    <div class="site-shell">
      <nav class="nav">
        <a class="brand" href="/">MIS_api</a>
        <div class="nav-links">
          <a href="#features">Features</a>
          <a href="#device">Device</a>
          <a href="/Login_page">Login</a>
          <a href="#workflow">Workflow</a>
          <a href="#api">API</a>
          <a href="#pricing">Pricing</a>
          <a href="mailto:${escapeHtml(payment.salesEmail)}">Contact</a>
        </div>
      </nav>

      <section class="hero">
        <div>
          <div class="eyebrow">QR based WhatsApp API</div>
          <h1>MIS_api turns any WhatsApp number into a flexible messaging API.</h1>
          <p>Connect a number by QR, send custom messages or template-style payloads from any system, queue every request, and give operators a clean console for scanning, logs, payments, and reconnects.</p>
          <div class="hero-actions">
            <a class="button" href="#pricing">Start trial</a>
            <a class="button secondary" href="#api">View API</a>
          </div>
        </div>
        <div class="hero-visual" aria-label="API status preview">
          <div class="terminal">
            <div class="terminal-line"><span>Connection</span><span>Ready</span></div>
            <div class="terminal-line"><span>Incoming API</span><span>Queued</span></div>
            <div class="terminal-line"><span>Release delay</span><span>${Math.round(config.queueIntervalMs / 1000)} sec</span></div>
            <div class="terminal-line"><span>Billing</span><span>${escapeHtml(payment.monthlyPrice)}/month</span></div>
          </div>
          <div class="hero-meta">
            <div class="metric"><strong>QR</strong><span>connect</span></div>
            <div class="metric"><strong>API</strong><span>send endpoint</span></div>
            <div class="metric"><strong>Logs</strong><span>operator view</span></div>
          </div>
        </div>
      </section>

      <div class="section-title" id="features">
        <h2>Built For First Customers</h2>
        <p>A focused product surface your company can demo, onboard, and support without heavy SaaS infrastructure.</p>
      </div>
      <div class="bands">
        <div class="feature"><h3>QR pairing</h3><p>Each customer links their WhatsApp number from the browser console.</p></div>
        <div class="feature"><h3>Flexible payloads</h3><p>Customers can send their own message text, generated content, or template-style messages from any workflow.</p></div>
        <div class="feature"><h3>Logs and queue</h3><p>Operators can refresh status, view sends, and monitor queued jobs.</p></div>
      </div>

      <div class="console-preview">
        <div class="scan-preview"><div class="scan-box" aria-label="QR scan preview"></div></div>
        <div class="console-list">
          <div class="console-item"><span>Scan screen</span><span>QR / Connected</span></div>
          <div class="console-item"><span>Queue</span><span>Live</span></div>
          <div class="console-item"><span>Logs</span><span>Recent sends</span></div>
          <div class="console-item"><span>Redeploy</span><span>Reconnect</span></div>
        </div>
      </div>

      <div class="device-access" id="device">
        <div>
          <div class="eyebrow">Customer device access</div>
          <h2>Open the scan screen from your customer credentials.</h2>
          <p>Each customer receives a phone ID and connect token. Enter both to open the private QR scan and connected-status console.</p>
        </div>
        <div class="device-form">
          <div class="field-grid">
            <label>Phone ID<input id="devicePhoneId" placeholder="phn_xxxxx"></label>
            <label>Connect Token<input id="deviceToken" placeholder="connect_xxxxx"></label>
          </div>
          <button class="button" id="openDeviceBtn" type="button">Link a device</button>
        </div>
      </div>

      <div class="wide-feature">
        <div class="feature"><h3>Controlled sending</h3><p>Every send request enters the queue first, then MIS_api releases messages one by one to reduce sudden bursts from any integration.</p></div>
        <div class="feature"><h3>Manual billing</h3><p>Use the built-in pricing and UPI contact section for the first paying customers before adding payment gateway automation.</p></div>
      </div>

      <div class="section-title" id="workflow">
        <h2>How It Works</h2>
        <p>Simple enough for a first user, structured enough for a sales demo.</p>
      </div>
      <div class="step-list">
        <div class="step"><div><strong>Create customer</strong><span>Generate a trial account with API key and connect token.</span></div></div>
        <div class="step"><div><strong>Connect WhatsApp</strong><span>Open the secure connect link and scan the QR from WhatsApp Linked Devices.</span></div></div>
        <div class="step"><div><strong>Send from anywhere</strong><span>Use the API from a CRM, website, internal tool, automation script, or any custom workflow.</span></div></div>
        <div class="step"><div><strong>Monitor console</strong><span>Use refresh, queue, logs, and redeploy controls from the browser dashboard.</span></div></div>
      </div>

      <div class="section-title" id="api">
        <h2>API</h2>
        <p>Use customer API keys for private access.</p>
      </div>
      <div class="code-grid">
        <div class="api-box">POST ${escapeHtml(config.baseUrl)}/v1/messages/send<br><br>{<br>&nbsp;&nbsp;"phoneId": "PHONE_ID",<br>&nbsp;&nbsp;"to": "91XXXXXXXXXX",<br>&nbsp;&nbsp;"message": "Hello from MIS_api"<br>}</div>
        <div class="api-box">GET ${escapeHtml(config.baseUrl)}/health<br>GET ${escapeHtml(config.baseUrl)}/v1/messages<br>GET ${escapeHtml(config.baseUrl)}/v1/queue</div>
      </div>

      <div class="section-title" id="pricing">
        <h2>Pricing</h2>
        <p>Manual payment option for first customers.</p>
      </div>
      <div class="pricing">
        <div class="price-card">
          <h3>${escapeHtml(payment.planName)}</h3>
          <div class="price">${escapeHtml(payment.monthlyPrice)}</div>
          <p>One WhatsApp number, API access, queued sending, logs, reconnect console, and support.</p>
        </div>
        <div class="price-card">
          <h3>Pay manually</h3>
          <p>UPI ID</p>
          <div class="api-box">${escapeHtml(payment.upiId)}</div>
          <p style="margin-top:12px;">After payment, send screenshot to ${escapeHtml(payment.salesEmail)}.</p>
        </div>
      </div>

      <div class="section-title">
        <h2>FAQ</h2>
        <p>Set expectations clearly before your first sale.</p>
      </div>
      <div class="faq">
        <details open><summary>How does connection work?</summary><p>MIS_api uses QR based WhatsApp Web automation for early customers and pilot workflows.</p></details>
        <details><summary>Does the connected machine need to stay online?</summary><p>Yes. The Node server, tunnel, and WhatsApp session must remain active for sending to work.</p></details>
        <details><summary>Can customers send bulk spam?</summary><p>No. Customers should send only to opted-in contacts, start slowly, and honor opt-out requests.</p></details>
      </div>

      <div class="contact-band">
        <div>
          <h2>Ready To Onboard A Trial Customer?</h2>
          <p>Create their API key, connect their WhatsApp number, and let them send from their own workflow.</p>
        </div>
        <a class="button" href="mailto:${escapeHtml(payment.salesEmail)}">Contact Sales</a>
      </div>
    </div>
    <script>
      document.getElementById('openDeviceBtn').addEventListener('click', () => {
        const phoneId = document.getElementById('devicePhoneId').value.trim();
        const token = document.getElementById('deviceToken').value.trim();
        if (!phoneId || !token) {
          alert('Enter phone ID and connect token.');
          return;
        }
        window.location.href = '/connect/' + encodeURIComponent(phoneId) + '?token=' + encodeURIComponent(token);
      });
    </script>
  </body>
</html>`;
}

function adminPage({ config }) {
  return `<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MIS_api Admin</title>
    <style>
      ${baseStyles()}
      ${consoleStyles()}
      main { max-width: 980px; margin: 0 auto; padding: 26px 16px 44px; }
      .form-grid { display: grid; gap: 12px; grid-template-columns: 1fr 1fr; }
      .result-grid { display: grid; gap: 10px; grid-template-columns: 1fr 1fr; margin-top: 14px; }
      .secret-box { background: #f0f4f2; border: 1px solid var(--line); border-radius: 8px; padding: 12px; overflow-wrap: anywhere; }
      .admin-stack { display: grid; gap: 14px; }
      table { border-collapse: collapse; font-size: 13px; width: 100%; }
      th, td { border-bottom: 1px solid var(--line); padding: 10px 8px; text-align: left; vertical-align: top; }
      th { color: var(--muted); font-size: 12px; font-weight: 800; text-transform: uppercase; }
      label { color: var(--muted); display: grid; font-size: 12px; font-weight: 800; gap: 6px; text-transform: uppercase; }
      input { background: #fff; border: 1px solid var(--line); border-radius: 7px; color: var(--ink); font: inherit; min-height: 42px; padding: 0 12px; width: 100%; }
      @media (max-width: 780px) { .form-grid, .result-grid { grid-template-columns: 1fr; } }
      ${professionalStyles()}
    </style>
  </head>
  <body>
    <main>
      <header>
        <div>
          <h1>MIS_api Admin</h1>
          <p>Create a customer login, API key, phone ID, connect token, and QR link in one step.</p>
        </div>
        <div class="actions"><a class="button secondary" href="/Login_page">Website</a><button class="secondary" id="adminLogoutBtn">Logout</button></div>
      </header>

      <div class="admin-stack">
      <section>
        <div class="panel-head"><h2>Create Customer</h2><span class="pill">Admin</span></div>
        <div class="panel-body">
          <div class="form-grid">
            <label>Company Name<input id="name" placeholder="Customer Company"></label>
            <label>Phone Label<input id="phoneLabel" placeholder="Main WhatsApp"></label>
            <label>Username<input id="username" placeholder="customer-login"></label>
            <label>Password<input id="password" placeholder="Leave blank to auto-generate"></label>
            <label>Trial Days<input id="trialDays" type="number" value="${Number(config.trialDays || 7)}"></label>
          </div>
          <div class="actions" style="justify-content:flex-start;margin-top:14px;">
            <button id="createBtn">Create customer</button>
          </div>
          <div id="result"></div>
        </div>
      </section>
      <section>
        <div class="panel-head">
          <h2>All Users</h2>
          <button class="secondary" id="refreshCustomersBtn">Refresh</button>
        </div>
        <div class="panel-body">
          <div class="summary">
            <div class="summary-card"><span>Total Users</span><strong id="totalUsers">0</strong></div>
            <div class="summary-card"><span>Active Trials</span><strong id="activeTrials">0</strong></div>
            <div class="summary-card"><span>Queued</span><strong id="adminQueued">0</strong></div>
          </div>
          <table>
            <thead>
              <tr><th>Company</th><th>Login</th><th>Trial Ends</th><th>Days Left</th><th>Phones</th><th>Queue</th><th>Logs</th></tr>
            </thead>
            <tbody id="customerRows"><tr><td colspan="7" class="small">Loading...</td></tr></tbody>
          </table>
        </div>
      </section>
      </div>
    </main>
    <script>
      const adminToken = sessionStorage.getItem('mis_api_admin_session') || '';
      if (!adminToken) {
        document.querySelector('main').innerHTML = '<section style="max-width:520px;margin:80px auto;"><div class="panel-head"><h2>Admin login required</h2><span class="pill">Secure</span></div><div class="panel-body"><p class="small">Please login first. Admin details are not loaded without a valid admin session.</p><div class="actions" style="justify-content:flex-start;margin-top:14px;"><a class="button" href="/">Go to login</a></div></div></section>';
      } else {
        loadCustomers();
      }
      document.getElementById('adminLogoutBtn')?.addEventListener('click', async () => {
        await fetch('/v1/auth/logout', { method: 'POST' }).catch(() => {});
        sessionStorage.removeItem('mis_api_admin_session');
        window.location.href = '/';
      });
      document.getElementById('refreshCustomersBtn')?.addEventListener('click', loadCustomers);
      document.getElementById('createBtn')?.addEventListener('click', async () => {
        const payload = {
          name: document.getElementById('name').value.trim(),
          phoneLabel: document.getElementById('phoneLabel').value.trim(),
          username: document.getElementById('username').value.trim(),
          password: document.getElementById('password').value,
          trialDays: Number(document.getElementById('trialDays').value || 7)
        };
        const response = await fetch('/v1/admin/customers', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-admin-session-token': adminToken
          },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!data.ok) {
          document.getElementById('result').innerHTML = '<p class="small">' + escapeHtml(data.error || 'Could not create customer.') + '</p>';
          return;
        }
        document.getElementById('result').innerHTML = '<div class="result-grid">' +
          box('Login Username', data.username) +
          box('Login Password', data.password) +
          box('API Key', data.apiKey) +
          box('Phone ID', data.phone.id) +
          box('Connect Token', data.connectToken) +
          box('Link Device URL', data.connectUrl) +
          '</div><div class="actions" style="justify-content:flex-start;margin-top:12px;"><a class="button" href="' + data.connectUrl + '">Open scan screen</a><a class="button secondary" href="/Login_page">Customer login</a></div>';
        await loadCustomers();
      });

      async function loadCustomers() {
        const response = await fetch('/v1/admin/customers', {
          headers: { 'x-admin-session-token': adminToken }
        });
        const data = await response.json();
        if (!data.ok) {
          document.getElementById('customerRows').innerHTML = '<tr><td colspan="7" class="small">' + escapeHtml(data.error || 'Admin login required.') + '</td></tr>';
          return;
        }
        const customers = data.customers || [];
        document.getElementById('totalUsers').textContent = customers.length;
        document.getElementById('activeTrials').textContent = customers.filter(customer => daysLeft(customer.trialEndsAt) >= 0).length;
        document.getElementById('adminQueued').textContent = customers.reduce((sum, customer) => sum + Number(customer.pendingQueueCount || 0), 0);
        document.getElementById('customerRows').innerHTML = customers.length
          ? customers.map(customerRow).join('')
          : '<tr><td colspan="7" class="small">No customers yet.</td></tr>';
      }

      function customerRow(customer) {
        return '<tr>' +
          '<td><strong>' + escapeHtml(customer.name) + '</strong><br><span class="small">' + escapeHtml(customer.subscriptionStatus) + '</span></td>' +
          '<td>' + escapeHtml(customer.username || '-') + '</td>' +
          '<td>' + escapeHtml(formatDate(customer.trialEndsAt)) + '</td>' +
          '<td>' + daysLeft(customer.trialEndsAt) + '</td>' +
          '<td>' + customer.phoneCount + '</td>' +
          '<td>' + customer.pendingQueueCount + ' / ' + customer.queueCount + '</td>' +
          '<td>' + customer.messageCount + '</td>' +
          '</tr>';
      }

      function box(label, value) {
        return '<div class="secret-box"><strong>' + escapeHtml(label) + '</strong><br>' + escapeHtml(value || '') + '</div>';
      }
      function daysLeft(value) {
        return Math.ceil((new Date(value).getTime() - Date.now()) / 86400000);
      }

      function customerStatusLabel(customer) {
        if (customer.subscriptionStatus === 'active') return 'Active plan';
        const left = daysLeft(customer.trialEndsAt);
        if (left < 0) return 'Trial expired';
        return 'Free trial';
      }

      function customerStatusClass(customer) {
        if (customer.subscriptionStatus === 'active') return 'active';
        return daysLeft(customer.trialEndsAt) < 0 ? 'failed' : 'queued';
      }

      function trialBanner(customer) {
        if (customer.subscriptionStatus === 'active') {
          return '<strong>Active plan</strong><span>Your workspace is active and ready for API sends.</span>';
        }
        const left = daysLeft(customer.trialEndsAt);
        if (left < 0) {
          return '<strong>Trial expired</strong><span>Sending is paused until the subscription is activated.</span>';
        }
        return '<strong>Free trial</strong><span>' + left + ' day' + (left === 1 ? '' : 's') + ' remaining. Trial ends ' + escapeHtml(formatDate(customer.trialEndsAt)) + '.</span><div class="trial-progress"><i style="width:' + Math.max(0, Math.min(100, Math.round((left / ${Number(config.trialDays || 7)}) * 100))) + '%"></i></div>';
      }

      function friendlyPhoneStatus(status) {
        const labels = {
          created: 'setup needed',
          starting: 'starting',
          qr: 'scan QR',
          ready: 'connected',
          disconnected: 'inactive',
          unlinked: 'inactive',
          error: 'error',
          auth_failure: 'auth failed'
        };
        return labels[status] || status;
      }

      function phoneSeverity(status, connected) {
        if (connected || status === 'ready') return 'active';
        if (status === 'qr' || status === 'starting' || status === 'created') return 'queued';
        return 'failed';
      }

      function phoneStatusHelp(status, connected) {
        if (connected || status === 'ready') return 'Connected and ready to send queued API messages.';
        if (status === 'qr') return 'Waiting for WhatsApp QR scan.';
        if (status === 'starting' || status === 'created') return 'Session is not connected yet.';
        return 'WhatsApp is inactive. Reconnect before sending messages.';
      }
      function formatDate(value) {
        if (!value) return '-';
        return new Date(value).toLocaleDateString();
      }
      function escapeHtml(value) {
        return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
      }
    </script>
  </body>
</html>`;
}

function loginPage({ config }) {
  const payment = config.payment;
  return `<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MIS_api Login</title>
    <style>
      ${baseStyles()}
      ${consoleStyles()}
      body { background: #f7faf9; }
      main { max-width: 1240px; margin: 0 auto; padding: 22px 18px 48px; }
      .portal-top { align-items: center; background: rgba(247,250,249,.92); border-bottom: 1px solid #dbe5e1; display: flex; justify-content: space-between; margin: 0 -18px 28px; padding: 12px 18px; position: sticky; top: 0; z-index: 4; }
      .portal-title { align-items: center; display: flex; gap: 28px; }
      .portal-title h1 { font-size: 26px; font-weight: 900; margin: 0; }
      .portal-title p { color: var(--muted); font-size: 14px; margin: 0; }
      .login-grid { align-items: start; display: grid; gap: 24px; grid-template-columns: minmax(0, 1fr) 340px; }
      .login-card { background: #fff; border: 1px solid #d8e3df; border-radius: 8px; box-shadow: 0 16px 44px rgba(15, 29, 24, .08); color: var(--ink); position: sticky; top: 84px; }
      .login-card .panel-head { border-color: #e3ebe7; }
      .login-card .panel-body { padding: 22px; }
      .login-card label { color: #50625c; }
      .login-card input { border: 1px solid #cfdcd7; min-height: 46px; }
      .login-card button { background: #18b66f; color: #06110c; min-height: 46px; width: 100%; }
      .login-note { border-top: 1px solid #e3ebe7; color: var(--muted); font-size: 13px; line-height: 1.5; margin-top: 18px; padding-top: 14px; }
      .public-stack { display: grid; gap: 18px; }
      .public-stack, .customer-stack, .admin-dashboard { animation: riseIn .42s ease both; grid-column: 1; grid-row: 1; }
      .login-card { animation: fadeIn .3s ease both; grid-column: 2; grid-row: 1; }
      .public-hero { align-items: center; background: #0d1814; border-radius: 8px; color: #fff; display: grid; gap: 22px; grid-template-columns: 1fr 380px; min-height: 430px; overflow: hidden; padding: 34px; }
      .public-hero h2 { font-size: 48px; line-height: 1; margin: 0 0 14px; max-width: 650px; }
      .public-hero p { color: #bbcac4; font-size: 17px; line-height: 1.55; max-width: 660px; }
      .public-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
      .public-actions .button { background: #18b66f; color: #06110c; }
      .public-actions .button.secondary { background: rgba(255,255,255,.1); color: #fff; }
      .hero-console { background: #15241f; border: 1px solid rgba(255,255,255,.12); border-radius: 8px; box-shadow: inset 0 1px 0 rgba(255,255,255,.06); overflow: hidden; }
      .console-top { align-items: center; border-bottom: 1px solid rgba(255,255,255,.1); display: flex; gap: 8px; padding: 12px 14px; }
      .dot { background: #18b66f; border-radius: 999px; height: 9px; width: 9px; }
      .console-body { color: #d9eee5; font-family: Consolas, monospace; font-size: 13px; line-height: 1.7; padding: 16px; }
      .console-muted { color: #7e928b; }
      .detail-grid { display: grid; gap: 14px; grid-template-columns: repeat(3, 1fr); }
      .detail-card { background: #fff; border: 1px solid #d8e3df; border-radius: 8px; padding: 18px; }
      .detail-card strong { display: block; font-size: 18px; margin-bottom: 7px; }
      .detail-card span, .detail-card p { color: var(--muted); line-height: 1.45; }
      .api-panel { background: #fff; border: 1px solid #d8e3df; border-radius: 8px; padding: 20px; }
      .api-panel h2 { margin-bottom: 10px; }
      .api-box { background: #0d1814; border-radius: 8px; color: #d9eee5; font-family: Consolas, monospace; overflow-wrap: anywhere; padding: 16px; }
      .pricing-row { display: grid; gap: 14px; grid-template-columns: .9fr 1.1fr; }
      .price-big { font-size: 38px; font-weight: 900; margin: 8px 0; }
      .price-card-main { background: #e9fff4; border-color: #9fe7c5; }
      .customer-stack { display: grid; gap: 14px; }
      .admin-dashboard { display: grid; gap: 14px; }
      .dash-grid { display: grid; gap: 14px; grid-template-columns: 1fr 1fr; }
      .admin-grid { display: grid; gap: 14px; grid-template-columns: 380px 1fr; }
      .form-grid { display: grid; gap: 10px; grid-template-columns: 1fr 1fr; }
      .result-grid { display: grid; gap: 10px; grid-template-columns: 1fr 1fr; margin-top: 14px; }
      .secret-box { background: #f0f7f4; border: 1px solid #d8e3df; border-radius: 8px; padding: 12px; overflow-wrap: anywhere; }
      .customer-hero { background: #fff; border: 1px solid var(--line); border-radius: 8px; box-shadow: 0 14px 40px rgba(17,25,21,.06); padding: 16px; }
      .top-logout.hidden { display: none; }
      .phone-card { background: #f8faf8; border: 1px solid var(--line); border-radius: 8px; display: grid; gap: 14px; margin-top: 10px; padding: 14px; }
      .phone-main { align-items: center; display: flex; justify-content: space-between; gap: 12px; }
      .phone-card strong { display: block; margin-bottom: 4px; }
      .phone-card code { background: #edf3ef; border-radius: 6px; display: inline-block; font-family: Consolas, monospace; padding: 4px 6px; }
      .phone-actions { align-items: center; display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; }
      .phone-link { background: #18b66f; color: #06110c; }
      .phone-qr { align-items: center; background: #fff; border: 1px dashed #a9bbb4; border-radius: 8px; display: none; gap: 14px; grid-template-columns: 180px 1fr; padding: 14px; }
      .phone-qr.active { display: grid; }
      .phone-qr img { background: #fff; border: 8px solid #fff; box-shadow: 0 8px 24px rgba(15,29,24,.1); max-width: 160px; width: 100%; }
      .phone-qr strong { margin: 0 0 6px; }
      .script-box { display: grid; gap: 10px; }
      .script-box textarea { background: #0d1814; border: 0; border-radius: 8px; color: #d9eee5; font-family: Consolas, monospace; font-size: 12px; line-height: 1.45; min-height: 280px; padding: 14px; resize: vertical; width: 100%; }
      button.danger { background: #b42318; color: #fff; }
      table { border-collapse: collapse; font-size: 13px; width: 100%; }
      th, td { border-bottom: 1px solid var(--line); padding: 10px 8px; text-align: left; vertical-align: top; }
      th { color: var(--muted); font-size: 12px; font-weight: 800; text-transform: uppercase; }
      td.message { max-width: 280px; overflow-wrap: anywhere; }
      label { color: var(--muted); display: grid; font-size: 12px; font-weight: 800; gap: 6px; margin-bottom: 10px; text-transform: uppercase; }
      input { background: #fff; border: 1px solid var(--line); border-radius: 7px; color: var(--ink); font: inherit; min-height: 42px; padding: 0 12px; width: 100%; }
      .hidden { display: none; }
      @keyframes riseIn {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @media (max-width: 860px) {
        .portal-top { align-items: flex-start; display: block; position: static; }
        .portal-title { align-items: flex-start; display: grid; gap: 6px; }
        .portal-top .actions { margin-top: 12px; }
        .login-card { position: static; }
        .login-grid, .dash-grid, .admin-grid, .detail-grid, .pricing-row, .public-hero, .form-grid, .result-grid, .phone-qr { grid-template-columns: 1fr; }
        .login-card, .public-stack, .customer-stack, .admin-dashboard { grid-column: auto; grid-row: auto; }
        .public-hero h2 { font-size: 36px; }
      }
      ${professionalStyles()}
      ${premiumSaaSStyles()}
    </style>
  </head>
  <body>
    <main>
      <div class="portal-top">
        <div class="portal-title">
          <h1>MIS_api</h1>
        </div>
        <nav class="portal-nav" aria-label="Primary">
          <button class="ghost" type="button" data-scroll-target="api">API Docs</button>
          <button class="ghost" type="button" data-scroll-target="pricing">Pricing</button>
          <a class="ghost-link" href="mailto:${escapeHtml(payment.salesEmail)}">Support</a>
        </nav>
        <div class="actions"><button class="secondary top-logout hidden" id="topLogoutBtn">Logout</button></div>
      </div>
      <div class="login-grid">
        <section class="login-card" id="loginCard">
          <div class="panel-head"><div><h2 id="authTitle">Welcome to MIS_api</h2><p id="authSubtitle">Sign in to manage your WhatsApp API workspace.</p></div><span class="pill">Secure</span></div>
          <div class="panel-body">
            <div class="auth-tabs">
              <button class="active" id="showLoginBtn" type="button">Sign in</button>
              <button class="secondary" id="showSignupBtn" type="button">Create account</button>
            </div>
            <form id="loginForm">
              <label>User ID<input id="username" autocomplete="username"></label>
              <label>Password<input id="password" type="password" autocomplete="current-password"></label>
              <button id="loginBtn" type="submit">Sign in</button>
            </form>
            <form class="hidden" id="signupForm">
              <label>Company name<input id="signupName" autocomplete="organization"></label>
              <label>User ID<input id="signupUsername" autocomplete="username"></label>
              <label>Password<input id="signupPassword" type="password" autocomplete="new-password"></label>
              <button id="signupBtn" type="submit">Start free trial</button>
            </form>
            <p class="small auth-error" id="loginError"></p>
            <div class="login-note" id="authNote">Admin and customer workspaces are protected. Use logout after managing shared devices.</div>
          </div>
        </section>
        <div id="publicDetails" class="public-stack">
          <section class="public-hero">
            <div>
              <div class="product-kicker">WhatsApp API Infrastructure</div>
              <h2>WhatsApp messaging infrastructure, without the operational headache.</h2>
              <p>Connect WhatsApp numbers, manage QR sessions, queue outbound messages and monitor delivery activity from one developer-friendly workspace.</p>
              <div class="public-actions">
                <button type="button" data-scroll-target="api">View API endpoint</button>
                <button class="secondary" type="button" data-scroll-target="pricing">View plans</button>
              </div>
              <div class="trust-line">Built for developers • Queue controls • Message logs • Secure API access</div>
            </div>
            <div class="hero-console" aria-label="API preview">
              <div class="console-top"><strong>POST /v1/messages/send</strong><span class="pill queued">Queued</span></div>
              <div class="console-body">
                <div><span><i class="status-dot connected"></i>QR session</span><strong>Connected</strong></div>
                <div><span><i class="status-dot warning"></i>Queue interval</span><strong>${Math.round(config.queueIntervalMs / 1000)} sec</strong></div>
                <div><span><i class="status-dot neutral"></i>Logs</span><strong>Sent / Failed</strong></div>
                <div><span><i class="status-dot connected"></i>Authentication</span><strong>Bearer API key</strong></div>
              </div>
            </div>
          </section>

          <div class="detail-grid" id="features">
            <div class="detail-card">${iconSvg('qr')}<strong>QR Sessions</strong><span>Connect, reconnect and monitor WhatsApp sessions from one place.</span></div>
            <div class="detail-card">${iconSvg('queue')}<strong>Message Queue</strong><span>Release outbound messages at controlled intervals instead of sending in bursts.</span></div>
            <div class="detail-card">${iconSvg('logs')}<strong>Audit Trail</strong><span>See sent and failed messages with a clear operational history.</span></div>
          </div>

          <section class="api-panel" id="api">
            <div class="section-head">
              <div><h2>Send your first message</h2><p>Use your customer API key to send messages through your connected WhatsApp number.</p></div>
              <button class="secondary" id="copyPublicApiBtn" type="button">Copy</button>
            </div>
            <pre class="api-box"><code id="publicCurlCode">curl -X POST ${escapeHtml(config.baseUrl)}/v1/messages/send \\
  -H "Authorization: Bearer CUSTOMER_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "phoneId": "PHONE_ID",
    "to": "91XXXXXXXXXX",
    "message": "Hello from MIS_api"
  }'</code></pre>
          </section>

          <div class="pricing-row" id="pricing">
            <div class="price-card">
              <span class="price-label">Free Trial</span>
              <div class="price-big">${Number(config.trialDays || 7)} days</div>
              <p>Test one connected WhatsApp account with API access, queue, logs, and dashboard access.</p>
              <button type="button" data-auth-mode="signup">Start free trial</button>
            </div>
            <div class="price-card price-card-main">
              <span class="recommended">Recommended</span>
              <span class="price-label">${escapeHtml(payment.planName)}</span>
              <div class="price-big">${escapeHtml(payment.monthlyPrice)}</div>
              <ul>
                <li>One WhatsApp number</li>
                <li>QR reconnect page</li>
                <li>API key access</li>
                <li>Queue management</li>
                <li>Message logs</li>
                <li>Support</li>
              </ul>
              <a class="button secondary" href="mailto:${escapeHtml(payment.salesEmail)}">Contact support</a>
            </div>
          </div>
        </div>
        <div id="dashboard" class="customer-stack hidden">
          <section class="customer-hero">
            <div class="panel-head">
              <div><h2>Overview</h2><p id="customerName">Monitor your WhatsApp API activity and connected sessions.</p></div>
              <div class="actions"><span class="pill" id="customerStatus">trial</span><button id="addPhoneBtn" type="button">Add WhatsApp number</button><button class="secondary" id="customerRefreshBtn">Refresh</button></div>
            </div>
            <div class="panel-body">
              <div class="trial-banner" id="trialBanner"></div>
              <p class="dashboard-notice" id="dashboardNotice"></p>
              <div class="summary">
                <div class="summary-card"><span>Phones</span><strong id="phoneCount">0</strong></div>
                <div class="summary-card"><span>Queue</span><strong id="queueCount">0</strong></div>
                <div class="summary-card"><span>Logs</span><strong id="logCount">0</strong></div>
                <div class="summary-card"><span>Failed</span><strong id="failedCount">0</strong></div>
              </div>
              <div class="webhook-card">
                <div>
                  <strong>Webhooks</strong>
                  <p class="small">Receive POST events for queued, sent, failed, phone status, and incoming messages.</p>
                </div>
                <div class="webhook-form">
                  <input id="webhookUrl" placeholder="https://example.com/mis-api-webhook">
                  <button class="secondary" id="saveWebhookBtn" type="button">Save webhook</button>
                </div>
                <p class="small" id="webhookStatus"></p>
              </div>
              <div id="phoneCards"></div>
            </div>
          </section>
          <div class="dash-grid">
            <section>
              <div class="panel-head"><h2>Message Queue</h2><span class="pill queued" id="queueLabel">0 queued</span></div>
              <div class="panel-body">
                <table>
                  <thead><tr><th>Status</th><th>To</th><th>Message</th><th>Time</th></tr></thead>
                  <tbody id="queueRows"><tr><td colspan="4" class="empty-row"><strong>Restricted</strong><span>Sign in to load queued messages.</span></td></tr></tbody>
                </table>
              </div>
            </section>
            <section>
              <div class="panel-head"><h2>Message Activity</h2><span class="pill" id="logLabel">0 logs</span></div>
              <div class="panel-body">
                <table>
                  <thead><tr><th>Status</th><th>To</th><th>Message</th><th>Time</th></tr></thead>
                  <tbody id="logRows"><tr><td colspan="4" class="empty-row"><strong>Restricted</strong><span>Sign in to load message activity.</span></td></tr></tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
        <div id="adminDashboard" class="admin-dashboard hidden">
          <section class="customer-hero">
            <div class="panel-head">
              <h2>Admin Workspace</h2>
              <div class="actions"><button class="secondary" id="adminRefreshBtn">Refresh</button></div>
            </div>
            <div class="panel-body">
              <div class="summary">
                <div class="summary-card"><span>Total Users</span><strong id="inlineTotalUsers">0</strong></div>
                <div class="summary-card"><span>Active Trials</span><strong id="inlineActiveTrials">0</strong></div>
                <div class="summary-card"><span>Queued</span><strong id="inlineQueued">0</strong></div>
              </div>
            </div>
          </section>
          <div class="admin-grid">
            <section>
              <div class="panel-head"><h2>Create Customer</h2><span class="pill">Admin</span></div>
              <div class="panel-body">
                <div class="form-grid">
                  <label>Company<input id="adminName" placeholder="Customer Company"></label>
                  <label>Phone Label<input id="adminPhoneLabel" placeholder="Main WhatsApp"></label>
                  <label>Username<input id="adminUsername" placeholder="customer-login"></label>
                  <label>Password<input id="adminPassword" placeholder="Leave blank to auto-generate"></label>
                  <label>Trial Days<input id="adminTrialDays" type="number" value="${Number(config.trialDays || 7)}"></label>
                </div>
                <div class="actions" style="justify-content:flex-start;margin-top:14px;">
                  <button id="adminCreateBtn">Create customer</button>
                </div>
                <div id="adminResult"></div>
              </div>
            </section>
            <section>
              <div class="panel-head"><h2>Customers</h2><span class="small" id="inlineCustomerLabel">0 users</span></div>
              <div class="panel-body">
                <table>
                  <thead><tr><th>Company</th><th>Login</th><th>Trial</th><th>Phones</th><th>Queue</th><th>Logs</th></tr></thead>
                  <tbody id="inlineCustomerRows"><tr><td colspan="6" class="small">Login as admin to load users.</td></tr></tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
    <script>
      let sessionToken = '';
      localStorage.removeItem('mis_api_session');
      restoreCustomerSession();
      document.getElementById('loginForm').addEventListener('submit', async event => {
        event.preventDefault();
        await login();
      });
      document.getElementById('signupForm').addEventListener('submit', async event => {
        event.preventDefault();
        await signup();
      });
      document.getElementById('showLoginBtn').addEventListener('click', () => setAuthMode('login'));
      document.getElementById('showSignupBtn').addEventListener('click', () => setAuthMode('signup'));
      document.getElementById('addPhoneBtn').addEventListener('click', addPhone);
      document.getElementById('customerRefreshBtn').addEventListener('click', loadDashboard);
      document.getElementById('saveWebhookBtn').addEventListener('click', saveWebhook);
      document.getElementById('topLogoutBtn').addEventListener('click', logout);
      document.getElementById('adminRefreshBtn').addEventListener('click', loadAdminDashboard);
      document.getElementById('adminCreateBtn').addEventListener('click', createAdminCustomer);
      document.getElementById('copyPublicApiBtn')?.addEventListener('click', async () => {
        await copyText(document.getElementById('publicCurlCode').textContent);
        document.getElementById('copyPublicApiBtn').textContent = 'Copied';
        setTimeout(() => {
          document.getElementById('copyPublicApiBtn').textContent = 'Copy';
        }, 1200);
      });
      const phonePollers = new Map();
      const apiBaseUrl = ${JSON.stringify(config.baseUrl)};
      let customerApiKey = '';

      function setAuthMode(mode) {
        const signup = mode === 'signup';
        document.getElementById('authTitle').textContent = 'Welcome to MIS_api';
        document.getElementById('authSubtitle').textContent = signup
          ? 'Create your workspace and start your free trial.'
          : 'Sign in to manage your WhatsApp API workspace.';
        document.getElementById('loginForm').classList.toggle('hidden', signup);
        document.getElementById('signupForm').classList.toggle('hidden', !signup);
        document.getElementById('showLoginBtn').className = signup ? 'secondary' : 'active';
        document.getElementById('showSignupBtn').className = signup ? 'active' : 'secondary';
        document.getElementById('authNote').textContent = signup
          ? '${Number(config.trialDays || 7)}-day free trial. One trial is allowed for each user ID.'
          : 'Admin and customer workspaces are protected. Use logout after managing shared devices.';
        document.getElementById('loginError').textContent = '';
      }

      async function login() {
        const response = await fetch('/v1/auth/login', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            username: document.getElementById('username').value.trim(),
            password: document.getElementById('password').value
          })
        });
        const data = await response.json();
        if (!data.ok) {
          document.getElementById('loginError').textContent = data.error || 'Login failed.';
          return;
        }
        if (data.role === 'admin') {
          sessionStorage.setItem('mis_api_admin_session', data.adminSessionToken);
          document.getElementById('loginError').textContent = '';
          await showAdminDashboard();
          return;
        }
        sessionToken = data.sessionToken;
        document.getElementById('loginError').textContent = '';
        showCustomerShell();
        await loadDashboard();
      }

      async function signup() {
        const response = await fetch('/v1/auth/signup', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            name: document.getElementById('signupName').value.trim(),
            username: document.getElementById('signupUsername').value.trim(),
            password: document.getElementById('signupPassword').value
          })
        });
        const data = await response.json();
        if (!data.ok) {
          document.getElementById('loginError').textContent = data.error || 'Signup failed.';
          return;
        }
        sessionToken = data.sessionToken;
        document.getElementById('loginError').textContent = '';
        showCustomerShell();
        await loadDashboard();
      }

      function logout() {
        sessionToken = '';
        document.body.classList.remove('is-authenticated');
        sessionStorage.removeItem('mis_api_admin_session');
        localStorage.removeItem('mis_api_session');
        fetch('/v1/auth/logout', { method: 'POST' }).catch(() => {});
        document.getElementById('loginCard').classList.remove('hidden');
        document.getElementById('topLogoutBtn').classList.add('hidden');
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('adminDashboard').classList.add('hidden');
        document.getElementById('publicDetails').classList.remove('hidden');
        stopPhonePollers();
        document.getElementById('password').value = '';
        document.getElementById('username').focus();
      }

      function showCustomerShell() {
        document.body.classList.add('is-authenticated');
        document.getElementById('loginCard').classList.add('hidden');
        document.getElementById('topLogoutBtn').classList.remove('hidden');
        document.getElementById('publicDetails').classList.add('hidden');
        document.getElementById('adminDashboard').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
      }

      async function showAdminDashboard() {
        document.body.classList.add('is-authenticated');
        document.getElementById('loginCard').classList.add('hidden');
        document.getElementById('topLogoutBtn').classList.remove('hidden');
        document.getElementById('publicDetails').classList.add('hidden');
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('adminDashboard').classList.remove('hidden');
        await loadAdminDashboard();
      }

      async function loadDashboard() {
        const [me, queue, logs] = await Promise.all([
          fetchJson('/v1/customer/me'),
          fetchJson('/v1/customer/queue?limit=100'),
          fetchJson('/v1/customer/messages?limit=100')
        ]);
        if (!me.ok) {
          localStorage.removeItem('mis_api_session');
          return;
        }
        showCustomerShell();
        const queueRows = queue.queue || [];
        const logRows = logs.messages || [];
        const failedRows = logRows.filter(item => item.status === 'failed');
        document.getElementById('customerName').textContent = me.customer.name + ' workspace';
        document.getElementById('customerStatus').textContent = customerStatusLabel(me.customer);
        document.getElementById('customerStatus').className = 'pill ' + customerStatusClass(me.customer);
        document.getElementById('trialBanner').innerHTML = trialBanner(me.customer);
        document.getElementById('webhookUrl').value = me.customer.webhookUrl || '';
        customerApiKey = me.customer.apiKey || '';
        document.getElementById('phoneCount').textContent = me.phones.length;
        document.getElementById('queueCount').textContent = queueRows.length;
        document.getElementById('logCount').textContent = logRows.length;
        document.getElementById('failedCount').textContent = failedRows.length;
        document.getElementById('queueLabel').textContent = queueRows.filter(item => item.status === 'queued' || item.status === 'sending').length + ' queued';
        document.getElementById('logLabel').textContent = logRows.length + ' logs';
        document.getElementById('phoneCards').innerHTML = me.phones.length
          ? me.phones.map(phoneCard).join('')
          : '<div class="empty-state"><strong>No WhatsApp number linked</strong><span>Click Add WhatsApp number, then scan the QR from WhatsApp > Linked devices.</span><button type="button" data-add-phone>Add WhatsApp number</button></div>';
        refreshScriptBoxes();
        document.getElementById('queueRows').innerHTML = queueRows.length
          ? queueRows.map(row).join('')
          : '<tr><td colspan="4" class="empty-row"><strong>No queued messages</strong><span>Messages waiting to be sent will appear here.</span></td></tr>';
        document.getElementById('logRows').innerHTML = logRows.length
          ? logRows.map(row).join('')
          : '<tr><td colspan="4" class="empty-row"><strong>No message activity</strong><span>Sent, failed, and received messages will appear here.</span></td></tr>';
      }

      async function fetchJson(url) {
        const headers = sessionToken ? { 'x-session-token': sessionToken } : {};
        const response = await fetch(url, { headers });
        return response.json();
      }

      function phoneCard(phone) {
        const status = String(phone.status || 'created').toLowerCase();
        const connected = status === 'ready';
        const canLink = status === 'unlinked' || status === 'disconnected' || status === 'auth_failure' || status === 'error' || status === 'created';
        const label = connected ? 'connected' : friendlyPhoneStatus(status);
        const severity = phoneSeverity(status, connected);
        const qrAction = '<button class="phone-link" type="button" data-link-phone="' + escapeHtml(phone.id) + '">' + escapeHtml(connected ? 'QR / Reconnect' : (status === 'created' ? 'View QR' : 'Reconnect')) + '</button>';
        const disconnectAction = connected
          ? '<button class="danger" type="button" data-unlink-phone="' + escapeHtml(phone.id) + '">Disconnect</button>'
          : '';
        return '<div class="phone-card phone-' + escapeHtml(severity) + '" id="phoneCard-' + escapeHtml(phone.id) + '">' +
          '<div class="phone-main"><div><strong>' + escapeHtml(phone.label) + '</strong>' +
          '<span class="phone-help">' + escapeHtml(phoneStatusHelp(status, connected)) + '</span>' +
          '<code>' + escapeHtml(phone.id) + '</code></div><div class="phone-actions"><span class="pill ' + escapeHtml(severity) + '" id="phoneStatus-' + escapeHtml(phone.id) + '">' + escapeHtml(label) + '</span>' +
          qrAction + disconnectAction + '</div></div>' +
          '<div class="phone-qr" id="phoneQr-' + escapeHtml(phone.id) + '"><div id="phoneQrImage-' + escapeHtml(phone.id) + '"></div><div><strong id="phoneQrTitle-' + escapeHtml(phone.id) + '">Waiting for QR</strong><p class="small" id="phoneQrText-' + escapeHtml(phone.id) + '">Open WhatsApp Linked Devices and scan this QR when it appears.</p></div></div>' +
          '<div class="script-box"><div class="panel-head"><h2>WhatsApp.gs</h2><button class="secondary" type="button" data-copy-whatsapp="' + escapeHtml(phone.id) + '">Copy</button></div>' +
          '<textarea readonly data-whatsapp-script="' + escapeHtml(phone.id) + '"></textarea></div>' +
          '</div>';
      }

      async function saveWebhook() {
        const button = document.getElementById('saveWebhookBtn');
        const status = document.getElementById('webhookStatus');
        button.disabled = true;
        button.textContent = 'Saving...';
        status.textContent = '';
        const data = await fetchJsonPost('/v1/customer/webhook', {
          webhookUrl: document.getElementById('webhookUrl').value.trim()
        });
        button.disabled = false;
        button.textContent = 'Save webhook';
        status.textContent = data.ok ? 'Webhook saved.' : (data.error || 'Could not save webhook.');
        status.className = 'small ' + (data.ok ? 'success-text' : 'error-text');
      }

      async function addPhone() {
        const button = document.getElementById('addPhoneBtn');
        const notice = document.getElementById('dashboardNotice');
        button.disabled = true;
        button.textContent = 'Creating...';
        notice.textContent = 'Creating WhatsApp number...';
        notice.className = 'dashboard-notice';
        try {
          const data = await fetchJsonPost('/v1/customer/phones', {
            label: 'Main WhatsApp'
          });
          if (!data.ok || !data.phone?.id) {
            throw new Error(data.error || 'Could not create WhatsApp number.');
          }

          document.getElementById('phoneCards').innerHTML = phoneCard(data.phone);
          document.getElementById('phoneCount').textContent = '1';
          refreshScriptBoxes();
          notice.textContent = 'WhatsApp number created. Opening QR scanner...';
          await linkPhone(data.phone.id);
          document.getElementById('phoneCard-' + data.phone.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (error) {
          notice.textContent = error.message || 'Could not create WhatsApp number.';
          notice.className = 'dashboard-notice error-text';
        } finally {
          button.disabled = false;
          button.textContent = 'Add WhatsApp number';
        }
      }

      async function fetchJsonPost(url, payload) {
        const headers = { 'content-type': 'application/json' };
        if (sessionToken) {
          headers['x-session-token'] = sessionToken;
        }
        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload)
        });
        return response.json();
      }

      async function restoreCustomerSession() {
        const me = await fetchJson('/v1/customer/me');
        if (me.ok) {
          showCustomerShell();
          await loadDashboard();
          return;
        }
        const admin = await fetchJson('/v1/admin/customers');
        if (admin.ok) {
          await showAdminDashboard();
        }
      }

      async function loadAdminDashboard() {
        const data = await fetchJson('/v1/admin/customers');
        if (!data.ok) {
          document.getElementById('inlineCustomerRows').innerHTML = '<tr><td colspan="6" class="small">' + escapeHtml(data.error || 'Admin login required.') + '</td></tr>';
          return;
        }
        const customers = data.customers || [];
        document.getElementById('inlineTotalUsers').textContent = customers.length;
        document.getElementById('inlineActiveTrials').textContent = customers.filter(customer => daysLeft(customer.trialEndsAt) >= 0).length;
        document.getElementById('inlineQueued').textContent = customers.reduce((sum, customer) => sum + Number(customer.pendingQueueCount || 0), 0);
        document.getElementById('inlineCustomerLabel').textContent = customers.length + ' users';
        document.getElementById('inlineCustomerRows').innerHTML = customers.length
          ? customers.map(adminCustomerRow).join('')
          : '<tr><td colspan="6" class="small">No customers yet.</td></tr>';
      }

      async function createAdminCustomer() {
        const payload = {
          name: document.getElementById('adminName').value.trim(),
          phoneLabel: document.getElementById('adminPhoneLabel').value.trim(),
          username: document.getElementById('adminUsername').value.trim(),
          password: document.getElementById('adminPassword').value,
          trialDays: Number(document.getElementById('adminTrialDays').value || 7)
        };
        const response = await fetch('/v1/admin/customers', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!data.ok) {
          document.getElementById('adminResult').innerHTML = '<p class="small">' + escapeHtml(data.error || 'Could not create customer.') + '</p>';
          return;
        }
        document.getElementById('adminResult').innerHTML = '<div class="result-grid">' +
          box('Login Username', data.username) +
          box('Login Password', data.password) +
          box('API Key', data.apiKey) +
          box('Phone ID', data.phone.id) +
          box('Connect Token', data.connectToken) +
          box('Link Device URL', data.connectUrl) +
          '</div>';
        await loadAdminDashboard();
      }

      function adminCustomerRow(customer) {
        return '<tr>' +
          '<td><strong>' + escapeHtml(customer.name) + '</strong><br><span class="small">' + escapeHtml(customer.subscriptionStatus) + '</span></td>' +
          '<td>' + escapeHtml(customer.username || '-') + '</td>' +
          '<td>' + daysLeft(customer.trialEndsAt) + ' days</td>' +
          '<td>' + customer.phoneCount + '</td>' +
          '<td>' + customer.pendingQueueCount + ' / ' + customer.queueCount + '</td>' +
          '<td>' + customer.messageCount + '</td>' +
          '</tr>';
      }

      function box(label, value) {
        return '<div class="secret-box"><strong>' + escapeHtml(label) + '</strong><br>' + escapeHtml(value || '') + '</div>';
      }

      function daysLeft(value) {
        return Math.ceil((new Date(value).getTime() - Date.now()) / 86400000);
      }

      document.addEventListener('click', async event => {
        const scrollButton = event.target.closest('[data-scroll-target]');
        if (scrollButton) {
          const target = document.getElementById(scrollButton.getAttribute('data-scroll-target'));
          target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }

        const authButton = event.target.closest('[data-auth-mode]');
        if (authButton) {
          setAuthMode(authButton.getAttribute('data-auth-mode'));
          document.getElementById('loginCard')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }

        const addPhoneButton = event.target.closest('[data-add-phone]');
        if (addPhoneButton) {
          await addPhone();
          return;
        }

        const linkButton = event.target.closest('[data-link-phone]');
        if (linkButton) {
          const phoneId = linkButton.getAttribute('data-link-phone');
          linkButton.disabled = true;
          linkButton.textContent = 'Starting...';
          await linkPhone(phoneId);
          return;
        }

        const copyButton = event.target.closest('[data-copy-whatsapp]');
        if (copyButton) {
          const phoneId = copyButton.getAttribute('data-copy-whatsapp');
          const box = document.querySelector('[data-whatsapp-script="' + cssEscape(phoneId) + '"]');
          if (!box) return;
          await copyText(box.value);
          copyButton.textContent = 'Copied';
          setTimeout(() => {
            copyButton.textContent = 'Copy';
          }, 1200);
          return;
        }

        const button = event.target.closest('[data-unlink-phone]');
        if (!button) {
          return;
        }
        const phoneId = button.getAttribute('data-unlink-phone');
        if (!confirm('Unlink this phone? You will need to scan QR again before sending.')) {
          return;
        }
        button.disabled = true;
        button.textContent = 'Unlinking...';
        const headers = sessionToken ? { 'x-session-token': sessionToken } : {};
        const response = await fetch('/v1/customer/phones/' + encodeURIComponent(phoneId) + '/unlink', {
          method: 'POST',
          headers
        });
        const data = await response.json();
        if (!data.ok) {
          alert(data.error || 'Could not unlink phone.');
        }
        stopPhonePoller(phoneId);
        await loadDashboard();
      });

      async function linkPhone(phoneId) {
        const headers = sessionToken ? { 'x-session-token': sessionToken } : {};
        const qrPanel = document.getElementById('phoneQr-' + phoneId);
        qrPanel?.classList.add('active');
        setPhoneQrState(phoneId, null, 'Starting session', 'Preparing WhatsApp QR. This can take a few seconds.');
        const response = await fetch('/v1/customer/phones/' + encodeURIComponent(phoneId) + '/link', {
          method: 'POST',
          headers
        });
        const data = await response.json();
        if (!data.ok) {
          alert(data.error || 'Could not start link session.');
          await loadDashboard();
          return;
        }
        updatePhoneStatus(phoneId, data.status, data.ready, data.qrImage);
        startPhonePoller(phoneId);
      }

      function startPhonePoller(phoneId) {
        stopPhonePoller(phoneId);
        phonePollers.set(phoneId, setInterval(() => refreshPhoneStatus(phoneId), 3000));
        refreshPhoneStatus(phoneId);
      }

      function stopPhonePoller(phoneId) {
        const poller = phonePollers.get(phoneId);
        if (poller) {
          clearInterval(poller);
          phonePollers.delete(phoneId);
        }
      }

      function stopPhonePollers() {
        for (const phoneId of phonePollers.keys()) {
          stopPhonePoller(phoneId);
        }
      }

      async function refreshPhoneStatus(phoneId) {
        const data = await fetchJson('/v1/customer/phones/' + encodeURIComponent(phoneId) + '/status');
        if (!data.ok) {
          stopPhonePoller(phoneId);
          return;
        }
        updatePhoneStatus(phoneId, data.status, data.ready, data.qrImage, data.error);
        if (data.ready) {
          stopPhonePoller(phoneId);
          setTimeout(loadDashboard, 600);
        }
      }

      function updatePhoneStatus(phoneId, status, ready, qrImage, error) {
        const rawStatus = String(status || 'starting').toLowerCase();
        const label = ready ? 'connected' : friendlyPhoneStatus(rawStatus);
        const severity = phoneSeverity(rawStatus, ready);
        const pill = document.getElementById('phoneStatus-' + phoneId);
        if (pill) {
          pill.textContent = label;
          pill.className = 'pill ' + severity;
        }

        if (ready) {
          setPhoneQrState(phoneId, null, 'Active', 'WhatsApp is connected. API sending is ready.');
          return;
        }

        if (qrImage) {
          setPhoneQrState(phoneId, qrImage, 'Scan QR', 'Open WhatsApp > Linked devices > Link a device.');
          return;
        }

        setPhoneQrState(phoneId, null, label, error || 'Waiting for WhatsApp QR.');
      }

      function setPhoneQrState(phoneId, qrImage, title, text) {
        const panel = document.getElementById('phoneQr-' + phoneId);
        const image = document.getElementById('phoneQrImage-' + phoneId);
        const heading = document.getElementById('phoneQrTitle-' + phoneId);
        const body = document.getElementById('phoneQrText-' + phoneId);
        if (!panel || !image || !heading || !body) {
          return;
        }
        panel.classList.add('active');
        image.innerHTML = qrImage ? '<img src="' + qrImage + '" alt="WhatsApp QR code">' : '';
        heading.textContent = title;
        body.textContent = text;
      }

      function refreshScriptBoxes() {
        const apiKey = customerApiKey || 'CUSTOMER_API_KEY';
        document.querySelectorAll('[data-whatsapp-script]').forEach(box => {
          box.value = whatsappGsCode(box.getAttribute('data-whatsapp-script'), apiKey);
        });
      }

      function whatsappGsCode(phoneId, apiKey) {
        return [
          "const MISAPI_BASE_URL = '" + jsString(apiBaseUrl) + "';",
          "const MISAPI_API_KEY = '" + jsString(apiKey) + "';",
          "const MISAPI_PHONE_ID = '" + jsString(phoneId) + "';",
          '',
          'function whatsapp(contact, msg, file) {',
          '  if (arguments.length === 2 && isWhatsAppFile_(msg)) {',
          '    file = msg;',
          '    msg = "";',
          '  }',
          '',
          '  const payload = {',
          '    phoneId: MISAPI_PHONE_ID,',
          '    to: contact,',
          '    message: msg || ""',
          '  };',
          '',
          '  const blob = whatsappBlob_(file);',
          '  if (blob) {',
          '    payload.file = {',
          '      data: Utilities.base64Encode(blob.getBytes()),',
          '      mimetype: blob.getContentType() || "application/octet-stream",',
          '      filename: blob.getName() || "file"',
          '    };',
          '  }',
          '',
          '  const response = UrlFetchApp.fetch(MISAPI_BASE_URL + "/v1/messages/send", {',
          "    method: 'post',",
          "    contentType: 'application/json',",
          '    headers: {',
          '      Authorization: "Bearer " + MISAPI_API_KEY',
          '    },',
          '    payload: JSON.stringify(payload),',
          '    muteHttpExceptions: true',
          '  });',
          '',
          '  const code = response.getResponseCode();',
          '  const text = response.getContentText();',
          '',
          '  try {',
          '    const data = JSON.parse(text);',
          '    return {',
          '      ok: code >= 200 && code < 300 && data.ok === true,',
          '      code: code,',
          '      status: data.status || "",',
          '      queueId: data.queueId || "",',
          '      data: data',
          '    };',
          '  } catch (error) {',
          '    return {',
          '      ok: code >= 200 && code < 300,',
          '      code: code,',
          '      data: text',
          '    };',
          '  }',
          '}',
          '',
          'function isWhatsAppFile_(value) {',
          '  return value && (typeof value.getBlob === "function" || typeof value.getBytes === "function");',
          '}',
          '',
          'function whatsappBlob_(file) {',
          '  if (!file) return null;',
          '  if (typeof file.getBlob === "function") return file.getBlob();',
          '  return file;',
          '}'
        ].join('\\n');
      }

      async function copyText(value) {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value);
          return;
        }
        const helper = document.createElement('textarea');
        helper.value = value;
        helper.style.position = 'fixed';
        helper.style.left = '-9999px';
        document.body.appendChild(helper);
        helper.focus();
        helper.select();
        document.execCommand('copy');
        helper.remove();
      }

      function jsString(value) {
        return String(value || '').replace(/\\\\/g, '\\\\\\\\').replace(/'/g, "\\\\'");
      }

      function cssEscape(value) {
        if (window.CSS && CSS.escape) {
          return CSS.escape(value);
        }
        return String(value).replace(/"/g, '\\\\"');
      }

      function row(item) {
        const content = item.message || item.error || item.file?.filename || '';
        const recipient = item.direction === 'inbound' ? (item.from || '-') : (item.to || '-');
        const status = item.status || '';
        return '<tr>' +
          '<td><span class="pill ' + escapeHtml(status) + '">' + escapeHtml(statusLabel(status)) + '</span></td>' +
          '<td>' + escapeHtml(recipient) + '</td>' +
          '<td class="message" title="' + escapeHtml(content) + '">' + escapeHtml(content || '-') + '</td>' +
          '<td class="small">' + escapeHtml(formatDate(item.updatedAt || item.createdAt)) + '</td>' +
          '</tr>';
      }

      function statusLabel(status) {
        const labels = {
          queued: 'Queued',
          sending: 'Sending',
          sent: 'Sent',
          failed: 'Failed',
          received: 'Received'
        };
        return labels[status] || status || '-';
      }

      function formatDate(value) {
        if (!value) return '-';
        return new Date(value).toLocaleString();
      }

      function escapeHtml(value) {
        return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
      }
    </script>
  </body>
</html>`;
}

function connectPage({ phone, status, token, apiKey }) {
  const initialQr = status.qrImage
    ? `<img class="qr" src="${status.qrImage}" alt="WhatsApp QR code">`
    : `<div class="empty">${status.ready ? '<strong>Connected</strong><span>WhatsApp is ready for queued API sends.</span>' : '<strong>Scan Required</strong><span>Waiting for a WhatsApp QR code.</span>'}</div>`;

  return `<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MIS_api WhatsApp Console</title>
    <style>
      ${baseStyles()}
      main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 24px 16px 44px;
      }
      header {
        align-items: flex-start;
        display: flex;
        gap: 16px;
        justify-content: space-between;
        margin-bottom: 18px;
      }
      h1 {
        font-size: 26px;
        line-height: 1.15;
        margin: 0 0 6px;
      }
      h2 {
        font-size: 16px;
        margin: 0;
      }
      p {
        color: var(--muted);
        line-height: 1.45;
        margin: 0;
      }
      button,
      .button {
        background: var(--ink);
        border: 0;
        border-radius: 7px;
        color: #fff;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        min-height: 38px;
        padding: 0 14px;
        text-decoration: none;
      }
      button.secondary,
      .button.secondary {
        background: #e8eeea;
        color: var(--ink);
      }
      button.danger {
        background: var(--danger);
      }
      button.success {
        background: var(--accent);
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: flex-end;
      }
      .grid {
        display: grid;
        gap: 14px;
        grid-template-columns: minmax(320px, 430px) 1fr;
      }
      section {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 8px;
        box-shadow: 0 12px 30px rgba(17, 25, 21, .05);
        min-width: 0;
      }
      .panel-head {
        align-items: center;
        border-bottom: 1px solid var(--line);
        display: flex;
        justify-content: space-between;
        padding: 14px 16px;
      }
      .panel-body {
        padding: 16px;
      }
      .status-bar {
        align-items: center;
        background: var(--soft);
        border-radius: 7px;
        display: flex;
        font-weight: 700;
        gap: 8px;
        justify-content: space-between;
        padding: 11px 12px;
      }
      .summary {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(3, 1fr);
        margin-bottom: 14px;
      }
      .summary-card {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 14px;
      }
      .summary-card span {
        color: var(--muted);
        display: block;
        font-size: 12px;
        font-weight: 800;
        margin-bottom: 7px;
        text-transform: uppercase;
      }
      .summary-card strong {
        display: block;
        font-size: 20px;
        overflow-wrap: anywhere;
      }
      .lifecycle {
        display: grid;
        gap: 8px;
        grid-template-columns: repeat(4, 1fr);
        margin-bottom: 14px;
      }
      .life-step {
        background: #fff;
        border: 1px solid var(--line);
        border-radius: 8px;
        color: var(--muted);
        padding: 12px;
      }
      .life-step strong {
        color: var(--ink);
        display: block;
        font-size: 14px;
        margin-bottom: 4px;
      }
      .life-step.active {
        background: #eaf8f1;
        border-color: #b8e7d0;
      }
      .life-step.warning {
        background: #fff8df;
        border-color: #f1dda3;
      }
      .life-step.error {
        background: #fff1ef;
        border-color: #f5b8b2;
      }
      .pill {
        background: #d9f2e7;
        border-radius: 999px;
        color: #08784f;
        display: inline-block;
        font-size: 12px;
        font-weight: 700;
        line-height: 1;
        padding: 7px 9px;
        text-transform: uppercase;
      }
      .pill.error,
      .pill.failed {
        background: #fde9e7;
        color: var(--danger);
      }
      .pill.queued,
      .pill.sending,
      .pill.starting,
      .pill.qr,
      .pill.authenticated {
        background: #fff4ce;
        color: #8a6100;
      }
      .qr-wrap {
        align-items: center;
        background: #fbfcfb;
        border: 1px dashed #aab7b1;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        min-height: 340px;
        margin-top: 14px;
        overflow: hidden;
      }
      .qr {
        display: block;
        max-width: 320px;
        width: 100%;
      }
      .empty {
        display: grid;
        gap: 8px;
        color: var(--muted);
        padding: 28px;
        text-align: center;
      }
      .empty strong {
        color: var(--ink);
        display: block;
        font-size: 22px;
      }
      .empty span {
        display: block;
        line-height: 1.45;
      }
      .tables {
        display: grid;
        gap: 14px;
      }
      table {
        border-collapse: collapse;
        font-size: 13px;
        width: 100%;
      }
      th,
      td {
        border-bottom: 1px solid var(--line);
        padding: 10px 8px;
        text-align: left;
        vertical-align: top;
      }
      th {
        color: var(--muted);
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
      }
      td.message {
        max-width: 300px;
        overflow-wrap: anywhere;
      }
      .small {
        color: var(--muted);
        font-size: 12px;
      }
      .script-box {
        display: grid;
        gap: 10px;
        margin-top: 14px;
      }
      .script-box textarea {
        background: #0d1814;
        border: 0;
        border-radius: 8px;
        color: #d9eee5;
        font-family: Consolas, monospace;
        font-size: 12px;
        line-height: 1.45;
        min-height: 280px;
        padding: 14px;
        resize: vertical;
        width: 100%;
      }
      @media (max-width: 820px) {
        header,
        .actions {
          display: block;
        }
        .actions button {
          margin-top: 8px;
          width: 100%;
        }
        .grid {
          grid-template-columns: 1fr;
        }
        .summary {
          grid-template-columns: 1fr;
        }
        .lifecycle {
          grid-template-columns: 1fr;
        }
      }
      ${professionalStyles()}
    </style>
  </head>
  <body>
    <main>
      <header>
        <div>
          <h1>MIS_api WhatsApp Console</h1>
          <p>Scan, connect, monitor queue, and review logs for ${escapeHtml(phone.label)}.</p>
        </div>
        <div class="actions">
          <button class="success" id="linkBtn">Link a device</button>
          <button class="secondary" id="refreshBtn">Refresh</button>
          <a class="button secondary" href="/#pricing">Pay</a>
          <button class="danger" id="restartBtn">Redeploy</button>
        </div>
      </header>

      <div class="summary">
        <div class="summary-card"><span>Phone</span><strong>${escapeHtml(phone.label)}</strong></div>
        <div class="summary-card"><span>Session</span><strong id="sessionSummary">${status.ready ? 'Connected' : 'Scan needed'}</strong></div>
        <div class="summary-card"><span>Queue</span><strong id="queueSummary">0 waiting</strong></div>
        <div class="summary-card"><span>Logs</span><strong id="logSummary">0 sends</strong></div>
        <div class="summary-card"><span>Phone ID</span><strong>${escapeHtml(phone.id)}</strong></div>
      </div>

      <div class="lifecycle">
        <div class="life-step" id="lifeStart"><strong>Starting</strong><span>Session boot</span></div>
        <div class="life-step" id="lifeQr"><strong>Link device</strong><span>Scan QR</span></div>
        <div class="life-step" id="lifeReady"><strong>Connected</strong><span>API ready</span></div>
        <div class="life-step" id="lifeError"><strong>Attention</strong><span>Error / reconnect</span></div>
      </div>

      <div class="grid">
        <section>
          <div class="panel-head">
            <h2>Scan Screen</h2>
            <span class="pill ${escapeHtml(status.status)}" id="statusPill">${escapeHtml(status.status)}</span>
          </div>
          <div class="panel-body">
            <div class="status-bar">
              <span>Status</span>
              <span id="readyText">${status.ready ? 'Ready' : 'Not ready'}</span>
            </div>
            <div class="qr-wrap" id="qr">${initialQr}</div>
            <p class="small" id="errorText"></p>
            <div class="script-box">
              <div class="panel-head">
                <h2>WhatsApp.gs</h2>
                <button class="secondary" id="copyScriptBtn" type="button">Copy</button>
              </div>
              <textarea readonly id="whatsappScript"></textarea>
            </div>
          </div>
        </section>

        <div class="tables">
          <section>
            <div class="panel-head">
              <h2>Message Queue</h2>
              <span class="small" id="queueCount">0 items</span>
            </div>
            <div class="panel-body">
              <table>
                <thead>
                  <tr><th>Status</th><th>To</th><th>Message</th><th>Time</th></tr>
                </thead>
                <tbody id="queueRows"><tr><td colspan="4" class="small">Loading...</td></tr></tbody>
              </table>
            </div>
          </section>

          <section>
            <div class="panel-head">
              <h2>Send Logs</h2>
              <span class="small" id="logCount">0 items</span>
            </div>
            <div class="panel-body">
              <table>
                <thead>
                  <tr><th>Status</th><th>To</th><th>Message</th><th>Time</th></tr>
                </thead>
                <tbody id="logRows"><tr><td colspan="4" class="small">Loading...</td></tr></tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
    <script>
      const phoneId = ${JSON.stringify(phone.id)};
      const token = ${JSON.stringify(token)};
      const tokenQuery = 'token=' + encodeURIComponent(token);
      const apiBaseUrl = ${JSON.stringify(config.baseUrl)};
      const customerApiKey = ${JSON.stringify(apiKey || '')};

      document.getElementById('refreshBtn').addEventListener('click', refreshAll);
      document.getElementById('copyScriptBtn').addEventListener('click', async () => {
        await copyText(document.getElementById('whatsappScript').value);
        document.getElementById('copyScriptBtn').textContent = 'Copied';
        setTimeout(() => {
          document.getElementById('copyScriptBtn').textContent = 'Copy';
        }, 1200);
      });
      document.getElementById('linkBtn').addEventListener('click', async () => {
        await restartSession();
        document.getElementById('qr').scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      document.getElementById('restartBtn').addEventListener('click', async () => {
        if (!confirm('Redeploy this WhatsApp session? You may need to scan QR again.')) return;
        await restartSession();
      });

      async function restartSession() {
        await fetch('/v1/phones/' + phoneId + '/restart?' + tokenQuery, { method: 'POST' });
        await refreshAll();
      }

      async function refreshAll() {
        await Promise.all([refreshStatus(), refreshQueue(), refreshLogs()]);
      }

      async function refreshStatus() {
        const result = await fetch('/v1/phones/' + phoneId + '/status?' + tokenQuery);
        const data = await result.json();
        const pill = document.getElementById('statusPill');
        pill.textContent = data.status;
        pill.className = 'pill ' + data.status;
        document.getElementById('readyText').textContent = data.ready ? 'Ready' : 'Not ready';
        document.getElementById('sessionSummary').textContent = data.ready ? 'Connected' : 'Scan needed';
        updateLifecycle(data.status, data.ready);
        document.getElementById('errorText').textContent = data.error || '';
        document.getElementById('qr').innerHTML = data.qrImage
          ? '<img class="qr" src="' + data.qrImage + '" alt="WhatsApp QR code">'
          : '<div class="empty"><strong>' + (data.ready ? 'Connected' : 'Scan Required') + '</strong><span>' + (data.ready ? 'WhatsApp is ready for queued API sends.' : 'Waiting for a WhatsApp QR code.') + '</span></div>';
      }

      async function refreshQueue() {
        const result = await fetch('/v1/phones/' + phoneId + '/queue?' + tokenQuery + '&limit=20');
        const data = await result.json();
        const rows = data.queue || [];
        const waiting = rows.filter(row => row.status === 'queued' || row.status === 'sending').length;
        document.getElementById('queueCount').textContent = rows.length + ' items';
        document.getElementById('queueSummary').textContent = waiting + ' waiting';
        document.getElementById('queueRows').innerHTML = rows.length
          ? rows.map(renderRow).join('')
          : '<tr><td colspan="4" class="empty-row"><strong>No queued messages</strong><span>Messages waiting to be sent will appear here.</span></td></tr>';
      }

      async function refreshLogs() {
        const result = await fetch('/v1/phones/' + phoneId + '/messages?' + tokenQuery + '&limit=20');
        const data = await result.json();
        const rows = data.messages || [];
        document.getElementById('logCount').textContent = rows.length + ' items';
        document.getElementById('logSummary').textContent = rows.length + ' sends';
        document.getElementById('logRows').innerHTML = rows.length
          ? rows.map(renderRow).join('')
          : '<tr><td colspan="4" class="empty-row"><strong>No message activity</strong><span>Sent, failed, and received messages will appear here.</span></td></tr>';
      }

      function renderRow(row) {
        const content = row.message || row.error || row.file?.filename || '';
        const recipient = row.direction === 'inbound' ? (row.from || '-') : (row.to || '-');
        const status = row.status || '';
        return '<tr>' +
          '<td><span class="pill ' + escapeHtml(status) + '">' + escapeHtml(statusLabel(status)) + '</span></td>' +
          '<td>' + escapeHtml(recipient) + '</td>' +
          '<td class="message" title="' + escapeHtml(content) + '">' + escapeHtml(content || '-') + '</td>' +
          '<td class="small">' + escapeHtml(formatDate(row.updatedAt || row.createdAt)) + '</td>' +
          '</tr>';
      }

      function statusLabel(status) {
        const labels = {
          queued: 'Queued',
          sending: 'Sending',
          sent: 'Sent',
          failed: 'Failed',
          received: 'Received'
        };
        return labels[status] || status || '-';
      }

      function updateLifecycle(status, ready) {
        const steps = ['lifeStart', 'lifeQr', 'lifeReady', 'lifeError'];
        steps.forEach(id => document.getElementById(id).className = 'life-step');
        if (ready) {
          document.getElementById('lifeReady').className = 'life-step active';
          return;
        }
        if (status === 'qr' || status === 'authenticated') {
          document.getElementById('lifeQr').className = 'life-step warning';
          return;
        }
        if (status === 'error' || status === 'auth_failure' || status === 'disconnected') {
          document.getElementById('lifeError').className = 'life-step error';
          return;
        }
        document.getElementById('lifeStart').className = 'life-step warning';
      }

      function formatDate(value) {
        if (!value) return '';
        return new Date(value).toLocaleString();
      }

      function escapeHtml(value) {
        return String(value)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      }

      function refreshScriptBox() {
        document.getElementById('whatsappScript').value = whatsappGsCode(phoneId, customerApiKey || 'CUSTOMER_API_KEY');
      }

      function whatsappGsCode(phoneId, apiKey) {
        return [
          "const MISAPI_BASE_URL = '" + jsString(apiBaseUrl) + "';",
          "const MISAPI_API_KEY = '" + jsString(apiKey) + "';",
          "const MISAPI_PHONE_ID = '" + jsString(phoneId) + "';",
          '',
          'function whatsapp(contact, msg, file) {',
          '  if (arguments.length === 2 && isWhatsAppFile_(msg)) {',
          '    file = msg;',
          '    msg = "";',
          '  }',
          '',
          '  const payload = {',
          '    phoneId: MISAPI_PHONE_ID,',
          '    to: contact,',
          '    message: msg || ""',
          '  };',
          '',
          '  const blob = whatsappBlob_(file);',
          '  if (blob) {',
          '    payload.file = {',
          '      data: Utilities.base64Encode(blob.getBytes()),',
          '      mimetype: blob.getContentType() || "application/octet-stream",',
          '      filename: blob.getName() || "file"',
          '    };',
          '  }',
          '',
          '  const response = UrlFetchApp.fetch(MISAPI_BASE_URL + "/v1/messages/send", {',
          "    method: 'post',",
          "    contentType: 'application/json',",
          '    headers: {',
          '      Authorization: "Bearer " + MISAPI_API_KEY',
          '    },',
          '    payload: JSON.stringify(payload),',
          '    muteHttpExceptions: true',
          '  });',
          '',
          '  const code = response.getResponseCode();',
          '  const text = response.getContentText();',
          '',
          '  try {',
          '    const data = JSON.parse(text);',
          '    return {',
          '      ok: code >= 200 && code < 300 && data.ok === true,',
          '      code: code,',
          '      status: data.status || "",',
          '      queueId: data.queueId || "",',
          '      data: data',
          '    };',
          '  } catch (error) {',
          '    return {',
          '      ok: code >= 200 && code < 300,',
          '      code: code,',
          '      data: text',
          '    };',
          '  }',
          '}',
          '',
          'function isWhatsAppFile_(value) {',
          '  return value && (typeof value.getBlob === "function" || typeof value.getBytes === "function");',
          '}',
          '',
          'function whatsappBlob_(file) {',
          '  if (!file) return null;',
          '  if (typeof file.getBlob === "function") return file.getBlob();',
          '  return file;',
          '}'
        ].join('\\n');
      }

      async function copyText(value) {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value);
          return;
        }
        const helper = document.createElement('textarea');
        helper.value = value;
        helper.style.position = 'fixed';
        helper.style.left = '-9999px';
        document.body.appendChild(helper);
        helper.focus();
        helper.select();
        document.execCommand('copy');
        helper.remove();
      }

      function jsString(value) {
        return String(value || '').replace(/\\\\/g, '\\\\\\\\').replace(/'/g, "\\\\'");
      }

      refreshScriptBox();
      refreshAll();
      setInterval(refreshAll, 3000);
    </script>
  </body>
</html>`;
}

function baseStyles() {
  return `
      :root {
        --bg: #f6f7f4;
        --panel: #ffffff;
        --ink: #17211d;
        --muted: #5d6b65;
        --line: #dce3dd;
        --soft: #edf6f1;
        --accent: #0d8b5f;
        --danger: #b42318;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: var(--bg);
        color: var(--ink);
        font-family: Arial, sans-serif;
      }
      .button {
        background: var(--ink);
        border-radius: 7px;
        color: #fff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        min-height: 42px;
        padding: 0 16px;
        text-decoration: none;
      }
      .button.secondary {
        background: #e8eeea;
        color: var(--ink);
      }`;
}

function consoleStyles() {
  return `
      header {
        align-items: flex-start;
        display: flex;
        gap: 16px;
        justify-content: space-between;
        margin-bottom: 18px;
      }
      h1 {
        font-size: 28px;
        line-height: 1.15;
        margin: 0 0 6px;
      }
      h2 {
        font-size: 16px;
        margin: 0;
      }
      p {
        color: var(--muted);
        line-height: 1.45;
        margin: 0;
      }
      button,
      .button {
        background: var(--ink);
        border: 0;
        border-radius: 7px;
        color: #fff;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        min-height: 40px;
        padding: 0 14px;
        text-decoration: none;
      }
      .button.secondary,
      button.secondary {
        background: #e8eeea;
        color: var(--ink);
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: flex-end;
      }
      section {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 8px;
        box-shadow: 0 12px 30px rgba(17, 25, 21, .05);
        min-width: 0;
      }
      .panel-head {
        align-items: center;
        border-bottom: 1px solid var(--line);
        display: flex;
        justify-content: space-between;
        padding: 14px 16px;
      }
      .panel-body {
        padding: 16px;
      }
      .pill {
        background: #d9f2e7;
        border-radius: 999px;
        color: #08784f;
        display: inline-block;
        font-size: 12px;
        font-weight: 800;
        line-height: 1;
        padding: 7px 9px;
        text-transform: uppercase;
      }
      .summary {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(3, 1fr);
        margin-bottom: 14px;
      }
      .summary-card {
        background: #fbfcfb;
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 14px;
      }
      .summary-card span {
        color: var(--muted);
        display: block;
        font-size: 12px;
        font-weight: 800;
        margin-bottom: 7px;
        text-transform: uppercase;
      }
      .summary-card strong {
        display: block;
        font-size: 20px;
        overflow-wrap: anywhere;
      }
      .secret-box {
        background: #f0f4f2;
        border: 1px solid var(--line);
        border-radius: 8px;
        padding: 12px;
        overflow-wrap: anywhere;
      }
      .small {
        color: var(--muted);
        font-size: 12px;
      }
      @media (max-width: 780px) {
        header,
        .actions {
          display: block;
        }
        .actions .button,
        .actions button {
          margin-top: 8px;
          width: 100%;
        }
        .summary {
          grid-template-columns: 1fr;
        }
      }`;
}

function iconSvg(name) {
  const icons = {
    qr: '<svg class="feature-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v6H4z"/><path d="M14 4h6v6h-6z"/><path d="M4 14h6v6H4z"/><path d="M14 14h2v2h-2z"/><path d="M18 14h2v6h-6v-2h4z"/><path d="M14 18h2v2h-2z"/></svg>',
    queue: '<svg class="feature-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7v5l3 2"/><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v6h-6"/></svg>',
    logs: '<svg class="feature-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10"/><path d="M7 8h10"/><path d="M7 12h6"/><path d="M5 20h14a2 2 0 0 0 2-2V6"/><path d="M3 6v12a2 2 0 0 0 2 2"/></svg>'
  };
  return icons[name] || '';
}

function professionalStyles() {
  return `
      :root {
        --bg: #f5f7fb;
        --panel: #ffffff;
        --ink: #172033;
        --muted: #647085;
        --line: #dce3ec;
        --soft: #eef4f8;
        --accent: #0f766e;
        --accent-strong: #115e59;
        --accent-soft: #dff7f1;
        --info: #2563eb;
        --warning: #b7791f;
        --warning-soft: #fff7dc;
        --danger: #b42318;
        --danger-soft: #fff1f0;
        --shadow: 0 14px 36px rgba(28, 39, 60, .08);
      }
      html {
        min-height: 100%;
      }
      body {
        background:
          linear-gradient(180deg, #f9fbfd 0, #f4f7fb 360px, #eef3f8 100%);
        color: var(--ink);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
        letter-spacing: 0;
      }
      a {
        color: inherit;
      }
      main,
      .site-shell {
        width: min(1240px, calc(100% - 32px));
      }
      button,
      .button {
        border: 1px solid transparent;
        border-radius: 8px;
        box-shadow: 0 8px 18px rgba(15, 118, 110, .14);
        font-size: 14px;
        min-height: 40px;
        transition: background .18s ease, border-color .18s ease, box-shadow .18s ease, color .18s ease, transform .18s ease;
      }
      button:hover,
      .button:hover {
        box-shadow: 0 12px 24px rgba(15, 118, 110, .18);
        transform: translateY(-1px);
      }
      button:focus-visible,
      .button:focus-visible,
      input:focus-visible,
      textarea:focus-visible {
        outline: 3px solid rgba(37, 99, 235, .18);
        outline-offset: 2px;
      }
      button,
      .button,
      .public-actions .button,
      .login-card button,
      .device-form .button,
      button.success {
        background: var(--accent);
        color: #fff;
      }
      .button.secondary,
      button.secondary,
      .public-actions .button.secondary {
        background: #fff;
        border-color: var(--line);
        box-shadow: none;
        color: var(--ink);
      }
      button.danger {
        background: var(--danger);
        color: #fff;
      }
      input,
      textarea {
        border: 1px solid #cfd8e5;
        border-radius: 8px;
        box-shadow: inset 0 1px 2px rgba(17, 24, 39, .04);
      }
      input:focus,
      textarea:focus {
        border-color: var(--info);
      }
      label {
        color: #526070;
        letter-spacing: 0;
      }
      section,
      .login-card,
      .detail-card,
      .api-panel,
      .price-card,
      .summary-card,
      .phone-card,
      .secret-box {
        border-color: var(--line);
        border-radius: 8px;
        box-shadow: var(--shadow);
      }
      section {
        overflow: hidden;
      }
      .panel-head {
        background: #fbfcfe;
        border-color: var(--line);
      }
      .panel-body {
        background: #fff;
      }
      .pill {
        background: var(--accent-soft);
        color: var(--accent-strong);
        font-size: 11px;
        letter-spacing: 0;
      }
      .pill.error,
      .pill.failed,
      .pill.disconnected,
      .pill.unlinked {
        background: var(--danger-soft);
        color: var(--danger);
      }
      .pill.queued,
      .pill.sending,
      .pill.starting,
      .pill.qr,
      .pill.authenticated {
        background: var(--warning-soft);
        color: var(--warning);
      }
      .portal-top,
      .nav {
        backdrop-filter: blur(14px);
        background: rgba(249, 251, 253, .9);
        border-bottom: 1px solid var(--line);
        box-shadow: 0 8px 24px rgba(31, 42, 68, .05);
      }
      .portal-title h1,
      .brand {
        color: var(--ink);
        font-size: 24px;
        font-weight: 850;
      }
      .portal-title h1:after,
      .brand:after {
        background: var(--accent);
        border-radius: 999px;
        content: "";
        display: inline-block;
        height: 8px;
        margin-left: 8px;
        width: 8px;
      }
      .login-grid {
        gap: 22px;
        grid-template-columns: minmax(0, 1fr) 360px;
      }
      .login-card {
        box-shadow: 0 18px 50px rgba(28, 39, 60, .14);
        top: 92px;
      }
      .login-card .panel-head {
        background: #172033;
        border-color: #172033;
        color: #fff;
      }
      .login-card .panel-head .pill {
        background: rgba(255, 255, 255, .12);
        color: #dbeafe;
      }
      .login-note {
        border-color: var(--line);
      }
      .public-hero,
      .hero-visual,
      .device-access,
      .contact-band {
        background: #172033;
        border: 1px solid #24314a;
        box-shadow: 0 18px 48px rgba(23, 32, 51, .18);
      }
      .public-hero {
        min-height: 390px;
      }
      .public-hero h2,
      .hero h1 {
        font-size: 42px;
        letter-spacing: 0;
      }
      .public-hero p,
      .hero p {
        color: #c7d2e5;
      }
      .hero-console,
      .api-box,
      .script-box textarea {
        background: #111827;
        border: 1px solid #263347;
        color: #dbeafe;
      }
      .console-muted {
        color: #93a4bd;
      }
      .dot {
        background: #14b8a6;
      }
      .detail-grid,
      .bands,
      .pricing,
      .wide-feature,
      .dash-grid {
        gap: 16px;
      }
      .detail-card,
      .feature,
      .price-card {
        background: #fff;
        border-color: var(--line);
      }
      .price-card-main {
        background: #ecfdf5;
        border-color: #a7f3d0;
      }
      .summary {
        gap: 12px;
      }
      .summary-card {
        background: #fff;
        padding: 16px;
      }
      .summary-card span {
        color: var(--muted);
        letter-spacing: 0;
      }
      .summary-card strong {
        color: var(--ink);
        font-size: 22px;
        font-weight: 850;
      }
      .customer-hero,
      .admin-stack section,
      .admin-dashboard section,
      .tables section {
        box-shadow: var(--shadow);
      }
      .phone-card {
        background: #fbfcfe;
      }
      .phone-card code,
      .secret-box {
        background: #eef4f8;
        color: #263347;
      }
      .phone-qr,
      .qr-wrap,
      .scan-preview {
        background: #f8fafc;
        border-color: #b8c4d4;
      }
      .qr {
        border-radius: 8px;
        box-shadow: 0 12px 30px rgba(28, 39, 60, .12);
      }
      .status-bar {
        background: #eef6ff;
        color: #1d4ed8;
      }
      .life-step {
        background: #fff;
        border-color: var(--line);
      }
      .life-step.active {
        background: #ecfdf5;
        border-color: #a7f3d0;
      }
      .life-step.warning {
        background: var(--warning-soft);
        border-color: #f3d27b;
      }
      .life-step.error {
        background: var(--danger-soft);
        border-color: #f4b3ad;
      }
      table {
        border-collapse: separate;
        border-spacing: 0;
      }
      th {
        background: #f8fafc;
        color: #526070;
        letter-spacing: 0;
      }
      td,
      th {
        border-bottom-color: var(--line);
      }
      tbody tr:hover td {
        background: #fbfdff;
      }
      .nav-links a {
        color: #526070;
      }
      .nav-links a:hover {
        color: var(--accent);
      }
      .section-title h2,
      h1,
      h2,
      h3 {
        letter-spacing: 0;
      }
      .small {
        color: var(--muted);
      }
      @media (max-width: 860px) {
        main,
        .site-shell {
          width: min(100% - 24px, 1240px);
          padding-left: 0;
          padding-right: 0;
        }
        .public-hero,
        .hero {
          min-height: auto;
        }
        .public-hero h2,
        .hero h1 {
          font-size: 34px;
        }
        .login-grid {
          grid-template-columns: 1fr;
        }
      }`;
}

function premiumSaaSStyles() {
  return `
      :root {
        --bg: #f8fafc;
        --surface: #ffffff;
        --surface-muted: #f1f5f9;
        --text: #0f172a;
        --text-muted: #64748b;
        --border: #e2e8f0;
        --primary: #0f8a78;
        --primary-hover: #0b7466;
        --success: #16a34a;
        --warning: #d97706;
        --danger: #dc2626;
        --radius-sm: 8px;
        --radius-md: 12px;
        --radius-lg: 16px;
        --mono: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
        --shadow-soft: 0 1px 2px rgba(15, 23, 42, .04), 0 12px 30px rgba(15, 23, 42, .06);
      }
      * {
        min-width: 0;
      }
      html {
        scroll-behavior: smooth;
      }
      body {
        background: radial-gradient(circle at top left, rgba(15, 138, 120, .07), transparent 380px), var(--bg);
        color: var(--text);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      main {
        max-width: 1180px;
        padding: 18px 16px 56px;
      }
      .portal-top {
        align-items: center;
        background: rgba(255, 255, 255, .88);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        box-shadow: 0 1px 2px rgba(15, 23, 42, .04);
        display: grid;
        gap: 16px;
        grid-template-columns: auto 1fr auto;
        margin: 0 0 18px;
        padding: 12px 14px;
        position: sticky;
        top: 12px;
        z-index: 10;
        backdrop-filter: blur(18px);
      }
      .portal-title h1 {
        align-items: center;
        display: inline-flex;
        font-size: 21px;
        font-weight: 850;
        gap: 9px;
      }
      .portal-title h1:before {
        background: linear-gradient(135deg, #0f8a78, #22c55e);
        border-radius: 9px;
        content: "";
        height: 28px;
        width: 28px;
      }
      .portal-title h1:after {
        display: none;
      }
      .portal-nav {
        align-items: center;
        display: flex;
        gap: 6px;
        justify-content: flex-end;
      }
      .ghost,
      .ghost-link {
        align-items: center;
        background: transparent;
        border: 0;
        border-radius: var(--radius-sm);
        box-shadow: none;
        color: var(--text-muted);
        cursor: pointer;
        display: inline-flex;
        font-size: 14px;
        font-weight: 700;
        min-height: 36px;
        padding: 0 10px;
        text-decoration: none;
      }
      .ghost:hover,
      .ghost-link:hover {
        background: var(--surface-muted);
        box-shadow: none;
        color: var(--text);
        transform: none;
      }
      button,
      .button {
        border-radius: 10px;
        font-weight: 750;
        transition: background .18s ease, border-color .18s ease, color .18s ease, box-shadow .18s ease, transform .18s ease;
      }
      button:hover,
      .button:hover {
        transform: translateY(-1px);
      }
      button:focus-visible,
      .button:focus-visible,
      input:focus-visible,
      textarea:focus-visible {
        outline: 3px solid rgba(15, 138, 120, .18);
        outline-offset: 2px;
      }
      button[disabled] {
        cursor: not-allowed;
        opacity: .64;
        transform: none;
      }
      .login-grid {
        align-items: start;
        display: grid;
        gap: 18px;
        grid-template-columns: minmax(0, 1.15fr) minmax(340px, .85fr);
      }
      .public-stack {
        display: grid;
        gap: 16px;
      }
      .public-hero {
        background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-soft);
        color: var(--text);
        display: grid;
        gap: 28px;
        grid-template-columns: minmax(0, 1fr) minmax(300px, .8fr);
        min-height: auto;
        padding: 34px;
      }
      .product-kicker {
        color: var(--primary);
        font-size: 12px;
        font-weight: 850;
        margin-bottom: 14px;
        text-transform: uppercase;
      }
      .public-hero h2 {
        color: var(--text);
        font-size: 42px;
        font-weight: 850;
        letter-spacing: 0;
        line-height: 1.04;
        margin: 0 0 14px;
        max-width: 720px;
      }
      .public-hero p {
        color: var(--text-muted);
        font-size: 16px;
        line-height: 1.7;
        max-width: 690px;
      }
      .public-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 24px;
      }
      .public-actions button,
      .price-card button,
      .login-card button[type="submit"] {
        background: var(--primary);
        box-shadow: 0 10px 24px rgba(15, 138, 120, .18);
        color: #fff;
        min-height: 44px;
      }
      .public-actions button:hover,
      .price-card button:hover,
      .login-card button[type="submit"]:hover {
        background: var(--primary-hover);
      }
      .public-actions button.secondary,
      .button.secondary,
      button.secondary {
        background: var(--surface);
        border: 1px solid var(--border);
        box-shadow: none;
        color: var(--text);
      }
      .trust-line {
        color: var(--text-muted);
        font-size: 13px;
        font-weight: 650;
        margin-top: 18px;
      }
      .hero-console {
        align-self: stretch;
        background: #0b1220;
        border: 1px solid #1e293b;
        border-radius: var(--radius-md);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08), 0 18px 42px rgba(15, 23, 42, .14);
        color: #e2e8f0;
        overflow: hidden;
      }
      .console-top {
        align-items: center;
        background: #111827;
        border-bottom: 1px solid #1e293b;
        display: flex;
        justify-content: space-between;
        padding: 14px 16px;
      }
      .console-top strong {
        color: #e2e8f0;
        font-family: var(--mono);
        font-size: 13px;
      }
      .console-body {
        display: grid;
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        padding: 4px 0;
      }
      .console-body div {
        align-items: center;
        border-bottom: 1px solid rgba(148, 163, 184, .13);
        display: flex;
        justify-content: space-between;
        padding: 14px 16px;
      }
      .console-body div:last-child {
        border-bottom: 0;
      }
      .console-body span {
        align-items: center;
        color: #94a3b8;
        display: inline-flex;
        gap: 9px;
      }
      .console-body strong {
        color: #f8fafc;
        font-size: 14px;
      }
      .status-dot {
        border-radius: 999px;
        display: inline-block;
        height: 8px;
        width: 8px;
      }
      .status-dot.connected {
        background: var(--success);
      }
      .status-dot.warning {
        background: var(--warning);
      }
      .status-dot.neutral {
        background: #38bdf8;
      }
      .pill {
        border-radius: 999px;
        font-size: 11px;
        font-weight: 850;
        padding: 7px 9px;
      }
      .pill,
      .pill.ready,
      .pill.active,
      .pill.sent {
        background: #dcfce7;
        color: #166534;
      }
      .pill.queued,
      .pill.sending,
      .pill.starting,
      .pill.qr {
        background: #fef3c7;
        color: #92400e;
      }
      .pill.failed,
      .pill.error,
      .pill.disconnected,
      .pill.unlinked {
        background: #fee2e2;
        color: #991b1b;
      }
      .login-card {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-soft);
        grid-column: 2;
        overflow: hidden;
        position: sticky;
        top: 88px;
      }
      .login-card .panel-head {
        background: var(--surface);
        border-bottom: 1px solid var(--border);
        color: var(--text);
        padding: 20px 22px;
      }
      .login-card .panel-head h2 {
        font-size: 20px;
        font-weight: 850;
        margin-bottom: 4px;
      }
      .login-card .panel-head p {
        color: var(--text-muted);
        font-size: 13px;
      }
      .login-card .panel-body {
        padding: 22px;
      }
      .auth-tabs {
        background: var(--surface-muted);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        display: grid;
        gap: 4px;
        grid-template-columns: 1fr 1fr;
        margin-bottom: 20px;
        padding: 4px;
      }
      .login-card .auth-tabs button {
        background: transparent;
        border: 0;
        box-shadow: none;
        color: var(--text-muted);
        font-size: 13px;
        min-height: 36px;
      }
      .login-card .auth-tabs button.active {
        background: var(--surface);
        border: 1px solid var(--border);
        box-shadow: 0 8px 18px rgba(15, 23, 42, .07);
        color: var(--text);
      }
      .login-card label {
        color: #334155;
        font-size: 12px;
        font-weight: 800;
        gap: 8px;
        letter-spacing: 0;
        margin-bottom: 14px;
        text-transform: none;
      }
      .login-card input,
      input {
        background: var(--surface);
        border: 1px solid #cbd5e1;
        border-radius: 10px;
        color: var(--text);
        font-size: 15px;
        min-height: 46px;
      }
      .login-card input:focus,
      input:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(15, 138, 120, .14);
        outline: 0;
      }
      .auth-error:not(:empty) {
        background: #fee2e2;
        border: 1px solid #fecaca;
        border-radius: var(--radius-sm);
        color: #991b1b;
        margin-top: 14px;
        padding: 10px 12px;
      }
      .login-note {
        border-top: 1px solid var(--border);
        color: var(--text-muted);
        font-size: 13px;
        line-height: 1.5;
        margin-top: 16px;
        padding-top: 14px;
      }
      .detail-grid {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(3, 1fr);
      }
      .detail-card,
      .api-panel,
      .price-card,
      section,
      .summary-card,
      .phone-card,
      .secret-box {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        box-shadow: 0 1px 2px rgba(15, 23, 42, .04);
      }
      .detail-card {
        display: grid;
        gap: 10px;
        padding: 18px;
        transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease;
      }
      .detail-card:hover {
        border-color: #b6c4d7;
        box-shadow: var(--shadow-soft);
        transform: translateY(-2px);
      }
      .feature-icon {
        background: #ecfdf5;
        border: 1px solid #bbf7d0;
        border-radius: 12px;
        fill: none;
        height: 38px;
        padding: 8px;
        stroke: var(--primary);
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 1.9;
        width: 38px;
      }
      .detail-card strong {
        color: var(--text);
        font-size: 16px;
        font-weight: 850;
      }
      .detail-card span,
      .detail-card p {
        color: var(--text-muted);
        font-size: 14px;
        line-height: 1.6;
      }
      .api-panel {
        display: block;
        padding: 0;
        scroll-margin-top: 96px;
      }
      .section-head {
        align-items: start;
        border-bottom: 1px solid var(--border);
        display: flex;
        gap: 14px;
        justify-content: space-between;
        padding: 18px 20px;
      }
      .section-head h2 {
        color: var(--text);
        font-size: 18px;
        font-weight: 850;
        margin-bottom: 5px;
      }
      .section-head p {
        color: var(--text-muted);
        font-size: 14px;
      }
      .api-box,
      .script-box textarea {
        background: #0b1220;
        border: 0;
        border-radius: 0 0 var(--radius-md) var(--radius-md);
        color: #dbeafe;
        display: block;
        font-family: var(--mono);
        font-size: 13px;
        line-height: 1.7;
        margin: 0;
        overflow-x: auto;
        padding: 20px;
        white-space: pre;
      }
      .pricing-row {
        display: grid;
        gap: 16px;
        grid-template-columns: .95fr 1.05fr;
        scroll-margin-top: 96px;
      }
      .price-card {
        display: grid;
        gap: 12px;
        padding: 20px;
        position: relative;
      }
      .price-label {
        color: var(--text);
        font-size: 16px;
        font-weight: 850;
      }
      .recommended {
        background: #ecfdf5;
        border: 1px solid #bbf7d0;
        border-radius: 999px;
        color: #166534;
        font-size: 11px;
        font-weight: 850;
        justify-self: start;
        padding: 6px 9px;
        text-transform: uppercase;
      }
      .price-big {
        color: var(--text);
        font-size: 36px;
        font-weight: 850;
        line-height: 1;
      }
      .price-card p,
      .price-card li {
        color: var(--text-muted);
        font-size: 14px;
        line-height: 1.55;
      }
      .price-card ul {
        display: grid;
        gap: 8px;
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .price-card li:before {
        color: var(--success);
        content: "\\2713";
        font-weight: 900;
        margin-right: 8px;
      }
      .price-card-main {
        border-color: rgba(15, 138, 120, .34);
        box-shadow: 0 16px 38px rgba(15, 138, 120, .09);
      }
      .customer-stack,
      .admin-dashboard {
        grid-column: 1 / -1;
      }
      .is-authenticated .public-stack,
      .is-authenticated .login-card {
        display: none !important;
      }
      .is-authenticated .login-grid {
        display: block;
      }
      .trial-banner {
        align-items: center;
        background: #f8fafc;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        display: grid;
        gap: 5px;
        margin-bottom: 14px;
        padding: 14px 16px;
      }
      .trial-banner strong {
        color: var(--text);
        font-size: 15px;
      }
      .trial-banner span {
        color: var(--text-muted);
        font-size: 13px;
      }
      .trial-progress {
        background: #e2e8f0;
        border-radius: 999px;
        height: 7px;
        margin-top: 6px;
        overflow: hidden;
      }
      .trial-progress i {
        background: var(--primary);
        border-radius: inherit;
        display: block;
        height: 100%;
      }
      .dashboard-notice {
        color: var(--text-muted);
        font-size: 13px;
        margin: -4px 0 12px;
      }
      .dashboard-notice:not(:empty) {
        background: #f8fafc;
        border: 1px solid var(--border);
        border-radius: var(--radius-sm);
        padding: 10px 12px;
      }
      .webhook-card {
        align-items: start;
        background: #fbfdff;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        display: grid;
        gap: 12px;
        grid-template-columns: 1fr minmax(280px, .9fr);
        margin: 14px 0;
        padding: 16px;
      }
      .webhook-card strong {
        color: var(--text);
        display: block;
        margin-bottom: 4px;
      }
      .webhook-form {
        display: grid;
        gap: 8px;
        grid-template-columns: minmax(0, 1fr) auto;
      }
      .success-text {
        color: var(--success);
      }
      .error-text {
        color: var(--danger);
      }
      .customer-hero .panel-head,
      .admin-dashboard .panel-head {
        background: var(--surface);
      }
      .customer-hero .panel-head h2 {
        font-size: 22px;
      }
      .summary {
        gap: 14px;
      }
      .summary-card {
        box-shadow: none;
        padding: 18px;
      }
      .summary-card span {
        color: var(--text-muted);
        font-size: 12px;
        letter-spacing: 0;
      }
      .summary-card strong {
        color: var(--text);
        font-size: 28px;
      }
      .phone-card {
        box-shadow: none;
        margin-top: 14px;
        transition: border-color .18s ease, box-shadow .18s ease;
      }
      .phone-card.phone-failed {
        background: #fff7f7;
        border-color: #fecaca;
        box-shadow: 0 1px 2px rgba(220, 38, 38, .08), 0 12px 28px rgba(220, 38, 38, .08);
      }
      .phone-card.phone-queued {
        background: #fffbeb;
        border-color: #fde68a;
      }
      .phone-help {
        color: var(--text-muted);
        display: block;
        font-size: 13px;
        margin: 4px 0 8px;
      }
      .phone-card code {
        background: var(--surface-muted);
        border: 1px solid var(--border);
        border-radius: 8px;
        color: var(--text);
        font-family: var(--mono);
      }
      table {
        border-collapse: separate;
        border-spacing: 0;
        width: 100%;
      }
      th {
        background: var(--surface-muted);
        color: var(--text-muted);
        font-size: 12px;
        letter-spacing: 0;
      }
      th,
      td {
        border-bottom: 1px solid var(--border);
      }
      tbody tr:hover td {
        background: #fbfdff;
      }
      td.message {
        max-width: 360px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .empty-row,
      .empty-state {
        color: var(--text-muted);
        padding: 24px !important;
        text-align: center;
      }
      .empty-row strong,
      .empty-state strong {
        color: var(--text);
        display: block;
        margin-bottom: 4px;
      }
      .empty-row span,
      .empty-state span {
        display: block;
        font-size: 13px;
      }
      .panel-body {
        overflow-x: auto;
      }
      @media (max-width: 1023px) {
        .login-grid,
        .public-hero,
        .pricing-row {
          grid-template-columns: 1fr;
        }
        .login-card {
          grid-column: auto;
          position: static;
        }
      }
      @media (max-width: 767px) {
        main {
          padding: 12px;
        }
        .portal-top {
          grid-template-columns: 1fr;
          position: static;
        }
        .portal-nav {
          justify-content: flex-start;
          overflow-x: auto;
        }
        .public-hero {
          padding: 22px;
        }
        .public-hero h2 {
          font-size: 31px;
        }
        .detail-grid,
        .summary,
        .dash-grid,
        .admin-grid,
        .form-grid,
        .result-grid {
          grid-template-columns: 1fr;
        }
        .section-head {
          display: grid;
        }
        .webhook-card,
        .webhook-form {
          grid-template-columns: 1fr;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        *,
        *:before,
        *:after {
          scroll-behavior: auto !important;
          transition: none !important;
        }
      }`;
}

function appLoginStyles() {
  return `
      body {
        background: #f3f6fa;
        color: #172033;
        font-family: "Segoe UI", Roboto, Arial, sans-serif;
      }
      main {
        max-width: 1180px;
        padding: 20px 0 42px;
      }
      .portal-top {
        background: #ffffff;
        border: 1px solid #dbe4ee;
        border-radius: 8px;
        box-shadow: 0 10px 28px rgba(23, 32, 51, .06);
        margin: 0 0 22px;
        padding: 14px 18px;
        position: static;
      }
      .portal-title h1 {
        font-size: 24px;
        font-weight: 800;
      }
      .portal-title h1:after {
        height: 7px;
        width: 7px;
      }
      .login-grid {
        align-items: stretch;
        display: grid;
        gap: 18px;
        grid-template-columns: minmax(0, 1fr) 380px;
      }
      .public-stack {
        gap: 14px;
      }
      .public-hero {
        align-items: start;
        background: #ffffff;
        border: 1px solid #dbe4ee;
        box-shadow: 0 14px 34px rgba(23, 32, 51, .07);
        color: #172033;
        display: grid;
        gap: 20px;
        grid-template-columns: minmax(0, .95fr) minmax(300px, .75fr);
        min-height: auto;
        padding: 28px;
      }
      .product-kicker {
        color: #0f766e;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0;
        margin-bottom: 12px;
        text-transform: uppercase;
      }
      .public-hero h2 {
        color: #111827;
        font-size: 34px;
        font-weight: 800;
        letter-spacing: 0;
        line-height: 1.08;
        margin: 0 0 12px;
        max-width: 560px;
      }
      .public-hero p {
        color: #526070;
        font-size: 15px;
        line-height: 1.6;
        max-width: 600px;
      }
      .public-actions {
        margin-top: 20px;
      }
      .public-actions button,
      .public-actions .button {
        min-height: 40px;
        padding: 0 16px;
      }
      .hero-console {
        align-self: stretch;
        background: #f8fafc;
        border: 1px solid #dbe4ee;
        box-shadow: none;
        color: #172033;
      }
      .console-top {
        background: #ffffff;
        border-bottom: 1px solid #dbe4ee;
        color: #172033;
        display: flex;
        justify-content: space-between;
      }
      .console-top strong {
        font-size: 13px;
        font-weight: 800;
      }
      .console-body {
        color: #172033;
        display: grid;
        font-family: "Segoe UI", Roboto, Arial, sans-serif;
        font-size: 14px;
        gap: 0;
        line-height: 1.4;
        padding: 0;
      }
      .console-body div {
        align-items: center;
        border-bottom: 1px solid #e8edf4;
        display: flex;
        justify-content: space-between;
        padding: 14px 16px;
      }
      .console-body div:last-child {
        border-bottom: 0;
      }
      .console-body span {
        color: #647085;
      }
      .console-body strong {
        color: #172033;
        font-size: 14px;
      }
      .login-card {
        align-self: start;
        background: #ffffff;
        border: 1px solid #dbe4ee;
        box-shadow: 0 14px 34px rgba(23, 32, 51, .09);
        grid-column: 2;
        position: sticky;
        top: 20px;
      }
      .login-card .panel-head {
        background: #ffffff;
        border-bottom: 1px solid #dbe4ee;
        color: #172033;
      }
      .login-card .panel-head h2 {
        font-size: 18px;
        font-weight: 800;
      }
      .login-card .panel-head .pill {
        background: #e8f7f3;
        color: #0f766e;
      }
      .login-card .panel-body {
        padding: 22px 24px 24px;
      }
      .auth-tabs {
        background: #f3f6fa;
        border: 1px solid #dbe4ee;
        border-radius: 8px;
        display: grid;
        gap: 4px;
        grid-template-columns: 1fr 1fr;
        margin-bottom: 18px;
        padding: 4px;
      }
      .auth-tabs button {
        background: transparent;
        border: 0;
        box-shadow: none;
        color: #526070;
        font-size: 13px;
        font-weight: 800;
        min-height: 36px;
        padding: 0 10px;
        width: 100%;
      }
      .auth-tabs button:hover {
        box-shadow: none;
        transform: none;
      }
      .auth-tabs button.active {
        background: #ffffff;
        border: 1px solid #dbe4ee;
        box-shadow: 0 6px 16px rgba(23, 32, 51, .08);
        color: #172033;
      }
      .login-card label {
        color: #526070;
        font-size: 12px;
        font-weight: 800;
        gap: 7px;
        letter-spacing: 0;
        margin-bottom: 14px;
        text-transform: uppercase;
      }
      .login-card input {
        background: #ffffff;
        border: 1px solid #cfd8e5;
        border-radius: 8px;
        color: #172033;
        font-size: 15px;
        min-height: 46px;
      }
      .login-card input:focus {
        border-color: #0f766e;
        box-shadow: 0 0 0 3px rgba(15, 118, 110, .14);
        outline: 0;
      }
      .login-card button {
        background: #0f766e;
        color: #ffffff;
        font-size: 15px;
        font-weight: 800;
        margin-top: 2px;
        min-height: 46px;
        width: 100%;
      }
      .login-card .auth-tabs button {
        background: transparent;
        border: 0;
        box-shadow: none;
        color: #526070;
        font-size: 13px;
        margin-top: 0;
        min-height: 36px;
      }
      .login-card .auth-tabs button.active {
        background: #ffffff;
        border: 1px solid #dbe4ee;
        box-shadow: 0 6px 16px rgba(23, 32, 51, .08);
        color: #172033;
      }
      .login-note {
        border-color: #e8edf4;
        color: #647085;
        font-size: 13px;
      }
      .detail-grid {
        display: grid;
        gap: 14px;
        grid-template-columns: repeat(3, 1fr);
      }
      .detail-card {
        background: #ffffff;
        border: 1px solid #dbe4ee;
        box-shadow: 0 10px 24px rgba(23, 32, 51, .05);
        padding: 18px;
      }
      .detail-card strong {
        color: #172033;
        font-size: 16px;
        font-weight: 800;
      }
      .detail-card span,
      .detail-card p {
        color: #647085;
        font-size: 14px;
        line-height: 1.5;
      }
      .api-panel,
      .pricing-row {
        display: none;
      }
      .customer-stack,
      .admin-dashboard {
        grid-column: 1 / -1;
      }
      .dashboard,
      .customer-hero {
        box-shadow: 0 12px 30px rgba(23, 32, 51, .06);
      }
      @media (max-width: 900px) {
        .login-grid,
        .public-hero,
        .detail-grid {
          grid-template-columns: 1fr;
        }
        .login-card {
          grid-column: auto;
          position: static;
        }
        .public-hero h2 {
          font-size: 30px;
        }
      }`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = {
  adminPage,
  connectPage,
  homePage,
  loginPage
};
