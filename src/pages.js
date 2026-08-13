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
      .brand { align-items: center; color: var(--ink); display: inline-flex; font-size: 22px; font-weight: 900; gap: 9px; letter-spacing: 0; text-decoration: none; }
      .brand:before { align-items: center; background: linear-gradient(135deg, #0f8a78, #22c55e); border-radius: 10px; color: #052e16; content: "AR"; display: grid; font-size: 12px; font-weight: 950; height: 30px; place-items: center; width: 30px; }
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
      body { background: #f4f7fb; }
      main { max-width: 1480px; margin: 0 auto; padding: 22px 18px 44px; }
      header { background: #0f172a; border-radius: 18px; color: #fff; padding: 22px; }
      header p { color: #cbd5e1; }
      .form-grid { display: grid; gap: 12px; grid-template-columns: 1fr 1fr; }
      .result-grid { display: grid; gap: 10px; grid-template-columns: 1fr 1fr; margin-top: 14px; }
      .secret-box { background: #f8fafc; border: 1px solid #dbe4ee; border-radius: 12px; padding: 12px; overflow-wrap: anywhere; }
      .admin-stack { display: grid; gap: 16px; }
      section { border-radius: 18px; }
      .admin-table-wrap { overflow-x: auto; }
      table { border-collapse: collapse; font-size: 13px; width: 100%; }
      th, td { border-bottom: 1px solid var(--line); padding: 12px 10px; text-align: left; vertical-align: top; }
      th { color: var(--muted); font-size: 12px; font-weight: 800; text-transform: uppercase; }
      .credential { background: #f8fafc; border: 1px solid #dbe4ee; border-radius: 10px; color: #0f172a; display: block; font-family: Consolas, monospace; max-width: 320px; overflow-wrap: anywhere; padding: 8px; }
      .status-badge { border-radius: 999px; display: inline-block; font-size: 11px; font-weight: 900; padding: 6px 9px; text-transform: uppercase; }
      .status-badge.enabled { background: #dcfce7; color: #166534; }
      .status-badge.disabled { background: #fee2e2; color: #991b1b; }
      button.danger { background: #dc2626; color: #fff; }
      button.success { background: #16a34a; color: #fff; }
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
          <h1>Admin Control Center</h1>
          <p>Manage customers, credentials, API keys, trials, and account access.</p>
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
          <h2>User Credentials & Access</h2>
          <button class="secondary" id="refreshCustomersBtn">Refresh</button>
        </div>
        <div class="panel-body">
          <div class="summary">
            <div class="summary-card"><span>Total Users</span><strong id="totalUsers">0</strong></div>
            <div class="summary-card"><span>Active Trials</span><strong id="activeTrials">0</strong></div>
            <div class="summary-card"><span>Queued</span><strong id="adminQueued">0</strong></div>
          </div>
          <p class="small">Passwords are shown only when they were saved at account creation. Older hashed passwords cannot be recovered.</p>
          <div class="admin-table-wrap"><table>
            <thead>
              <tr><th>Status</th><th>User</th><th>Username</th><th>Password</th><th>API Key</th><th>Trial</th><th>Usage</th><th>Action</th></tr>
            </thead>
            <tbody id="customerRows"><tr><td colspan="8" class="small">Loading...</td></tr></tbody>
          </table></div>
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
      document.addEventListener('click', async event => {
        const deleteButton = event.target.closest('[data-delete-customer]');
        if (deleteButton) {
          const customerId = deleteButton.getAttribute('data-delete-customer');
          const customerName = deleteButton.getAttribute('data-customer-name') || customerId;
          if (!confirm('Delete user "' + customerName + '"? This removes their phones, sessions, queue, and logs.')) {
            return;
          }
          deleteButton.disabled = true;
          deleteButton.textContent = 'Deleting...';
          const response = await fetch('/v1/admin/customers/' + encodeURIComponent(customerId), {
            method: 'DELETE',
            headers: { 'x-admin-session-token': adminToken }
          });
          const data = await response.json();
          if (!data.ok) {
            alert(data.error || 'Could not delete user.');
          }
          await loadCustomers();
          return;
        }

        const button = event.target.closest('[data-toggle-customer]');
        if (!button) return;
        const customerId = button.getAttribute('data-toggle-customer');
        const disabled = button.getAttribute('data-disabled') === 'true';
        const subscriptionStatus = button.getAttribute('data-subscription-status') || '';
        button.disabled = true;
        button.textContent = subscriptionStatus
          ? 'Updating...'
          : (disabled ? 'Enabling...' : 'Disabling...');
        const response = await fetch('/v1/admin/customers/' + encodeURIComponent(customerId) + '/status', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-admin-session-token': adminToken
          },
          body: JSON.stringify(subscriptionStatus ? { disabled, subscriptionStatus } : { disabled: !disabled })
        });
        const data = await response.json();
        if (!data.ok) {
          alert(data.error || 'Could not update user.');
        }
        await loadCustomers();
      });
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
          document.getElementById('customerRows').innerHTML = '<tr><td colspan="8" class="small">' + escapeHtml(data.error || 'Admin login required.') + '</td></tr>';
          return;
        }
        const customers = data.customers || [];
        document.getElementById('totalUsers').textContent = customers.length;
        document.getElementById('activeTrials').textContent = customers.filter(customer => daysLeft(customer.trialEndsAt) >= 0).length;
        document.getElementById('adminQueued').textContent = customers.reduce((sum, customer) => sum + Number(customer.pendingQueueCount || 0), 0);
        document.getElementById('customerRows').innerHTML = customers.length
          ? customers.map(customerRow).join('')
          : '<tr><td colspan="8" class="small">No customers yet.</td></tr>';
      }

      function customerRow(customer) {
        const disabled = customer.disabled || customer.status === 'blocked';
        const password = customer.plainPassword || 'Not saved';
        const actionText = disabled ? 'Enable user' : 'Disable user';
        const actionClass = disabled ? 'success' : 'danger';
        const paid = customer.subscriptionStatus === 'active';
        const billingText = paid ? 'Mark trial' : 'Activate paid';
        const billingStatus = paid ? 'trialing' : 'active';
        return '<tr>' +
          '<td><span class="status-badge ' + (disabled ? 'disabled' : 'enabled') + '">' + (disabled ? 'Disabled' : 'Enabled') + '</span></td>' +
          '<td><strong>' + escapeHtml(customer.name) + '</strong><br><span class="small">' + escapeHtml(customer.id) + '</span></td>' +
          '<td><code class="credential">' + escapeHtml(customer.username || '-') + '</code></td>' +
          '<td><code class="credential">' + escapeHtml(password) + '</code></td>' +
          '<td><code class="credential">' + escapeHtml(customer.apiKey || '-') + '</code></td>' +
          '<td>' + escapeHtml(customer.subscriptionStatus || '-') + '<br>' + escapeHtml(formatDate(customer.trialEndsAt)) + '<br><span class="small">' + daysLeft(customer.trialEndsAt) + ' days left</span></td>' +
          '<td><strong>' + customer.phoneCount + '</strong> phones<br><span class="small">' + customer.pendingQueueCount + ' active queue / ' + customer.messageCount + ' logs</span></td>' +
          '<td><div class="actions" style="justify-content:flex-start;gap:6px;"><button class="' + actionClass + '" type="button" data-toggle-customer="' + escapeHtml(customer.id) + '" data-disabled="' + String(disabled) + '">' + actionText + '</button>' +
          '<button class="secondary" type="button" data-toggle-customer="' + escapeHtml(customer.id) + '" data-disabled="' + String(disabled) + '" data-subscription-status="' + billingStatus + '">' + billingText + '</button>' +
          '<button class="danger" type="button" data-delete-customer="' + escapeHtml(customer.id) + '" data-customer-name="' + escapeHtml(customer.name || customer.username || customer.id) + '">Delete</button></div></td>' +
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
      .desktop-required { display: none; }
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
        main { display: none; }
        .desktop-required {
          align-items: center;
          background:
            radial-gradient(circle at top left, rgba(34,197,94,.22), transparent 260px),
            linear-gradient(135deg, #08111f, #0f2f2a);
          color: #fff;
          display: flex;
          min-height: 100vh;
          padding: 22px;
        }
        .desktop-required-card {
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.16);
          border-radius: 24px;
          box-shadow: 0 28px 80px rgba(0,0,0,.25);
          margin: 0 auto;
          max-width: 420px;
          padding: 26px;
          text-align: center;
        }
        .desktop-required-icon {
          align-items: center;
          background: #22c55e;
          border-radius: 18px;
          box-shadow: 0 18px 42px rgba(34,197,94,.28);
          color: #052e16;
          display: grid;
          font-size: 30px;
          font-weight: 900;
          height: 64px;
          margin: 0 auto 18px;
          place-items: center;
          width: 64px;
        }
        .desktop-required-card h1 {
          font-size: 28px;
          margin-bottom: 10px;
        }
        .desktop-required-card p,
        .desktop-required-steps span {
          color: rgba(255,255,255,.74);
          line-height: 1.6;
        }
        .desktop-required-steps {
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 16px;
          display: grid;
          gap: 6px;
          margin-top: 18px;
          padding: 14px;
        }
        .desktop-required-steps strong {
          color: #dcfce7;
        }
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
    <div class="desktop-required">
      <div class="desktop-required-card">
        <div class="desktop-required-icon">↔</div>
        <h1>Desktop mode required</h1>
        <p>MIS_api dashboard works best on a wider screen because QR scanning, logs, groups, and scripts need space.</p>
        <div class="desktop-required-steps">
          <strong>On mobile browser:</strong>
          <span>Open browser menu and enable “Desktop site”, or use a laptop/desktop.</span>
        </div>
      </div>
    </div>
    <main>
      <div class="portal-top">
        <div class="portal-title">
          <h1>MIS_api</h1>
        </div>
        <nav class="portal-nav" aria-label="Primary">
          <button class="ghost" type="button" data-scroll-target="sheetApiMain">API Docs</button>
          <button class="ghost" type="button" data-scroll-target="subscriptionMain">Pricing</button>
          <a class="ghost-link" href="mailto:${escapeHtml(payment.salesEmail)}">Support</a>
        </nav>
        <div class="actions"><button class="secondary top-logout hidden" id="topLogoutBtn">Logout</button></div>
      </div>
      <div class="login-grid">
        <section class="login-card" id="loginCard">
          <div class="panel-head"><div><h2 id="authTitle">Sign in</h2><p id="authSubtitle">Access your WhatsApp API workspace.</p></div><span class="pill">Secure</span></div>
          <div class="panel-body">
            <div class="auth-tabs">
              <button class="active" id="showLoginBtn" type="button">Sign in</button>
              <button class="secondary" id="showSignupBtn" type="button">Create account</button>
            </div>
            <form id="loginForm">
              <label>User ID<input id="username" autocomplete="username"></label>
              <label>Password<div class="password-field"><input id="password" type="password" autocomplete="current-password"><button class="password-eye" type="button" data-toggle-password="password" aria-label="Show password">👁</button></div></label>
              <button id="loginBtn" type="submit">Sign in</button>
            </form>
            <form class="hidden" id="signupForm">
              <label>Company name<input id="signupName" autocomplete="organization"></label>
              <label>User ID<input id="signupUsername" autocomplete="username"></label>
              <label>Password<div class="password-field"><input id="signupPassword" type="password" autocomplete="new-password"><button class="password-eye" type="button" data-toggle-password="signupPassword" aria-label="Show password">👁</button></div></label>
              <button id="signupBtn" type="submit">Start free trial</button>
            </form>
            <p class="small auth-error" id="loginError"></p>
            <div class="login-note" id="authNote">Admin and customer workspaces are protected. Use logout after managing shared devices.</div>
          </div>
        </section>
        <div id="publicDetails" class="public-stack">
          <section class="public-hero">
            <div>
              <div class="product-kicker">MIS_api WhatsApp Console</div>
              <h2>Let's Get Started</h2>
              <p>Launch a premium WhatsApp API workspace with QR linking, queued sending, clear logs, group IDs and Sheet-ready code in one secure dashboard.</p>
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
        </div>
        <div id="dashboard" class="customer-dashboard hidden">
          <aside class="side-panel" aria-label="Customer tools">
            <div class="side-profile">
              <div class="side-avatar">AR</div>
              <div class="side-reveal">
                <strong id="sideCustomerName">Workspace</strong>
                <span id="sideCustomerMeta">WhatsApp API console</span>
              </div>
            </div>
            <nav class="side-nav" aria-label="Dashboard sections">
              <button class="active" type="button" data-scroll-target="overview"><span class="nav-icon">⌂</span><span class="nav-text">Overview</span></button>
              <button type="button" data-scroll-target="phoneCards"><span class="nav-icon">◉</span><span class="nav-text">WhatsApp QR</span></button>
              <button type="button" data-scroll-target="subscriptionMain"><span class="nav-icon">◆</span><span class="nav-text">Subscription</span></button>
              <button type="button" data-scroll-target="groupsMain"><span class="nav-icon">☷</span><span class="nav-text">Groups</span></button>
              <button type="button" data-scroll-target="queueMain"><span class="nav-icon">◷</span><span class="nav-text">Queue</span></button>
              <button type="button" data-scroll-target="logsMain"><span class="nav-icon">↻</span><span class="nav-text">Logs</span></button>
              <button type="button" data-scroll-target="sheetApiMain"><span class="nav-icon">⌘</span><span class="nav-text">Sheet API</span></button>
              <button type="button" data-scroll-target="testMessageMain"><span class="nav-icon">✦</span><span class="nav-text">Test message</span></button>
            </nav>
          </aside>
          <div class="customer-stack">
          <section class="customer-hero dashboard-panel" id="overview">
            <div class="panel-head">
              <div><h2>Overview</h2><p id="customerName">Monitor your WhatsApp API activity and connected sessions.</p></div>
              <div class="actions"><span class="pill" id="customerStatus">trial</span><button class="secondary" id="customerRefreshBtn">Refresh</button></div>
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
          <section id="subscriptionMain" class="main-card dashboard-panel hidden">
            <div class="panel-head">
              <div><h2>Subscription Details</h2><p>Your current trial, plan, and upgrade details.</p></div>
              <span class="pill" id="subPlanStatus">Free trial</span>
            </div>
            <div class="panel-body">
              <div class="subscription-detail-grid">
                <div class="subscription-detail-card"><span>Status</span><strong id="subStatusText">Free trial</strong><p id="subTrialText">Loading subscription...</p></div>
                <div class="subscription-detail-card"><span>Plan</span><strong>${escapeHtml(payment.planName)}</strong><p>${escapeHtml(payment.monthlyPrice)} / month</p></div>
                <div class="subscription-detail-card"><span>Trial ends</span><strong id="subTrialEnds">-</strong><p>Upgrade before expiry to keep sending active.</p></div>
                <div class="subscription-detail-card"><span>Support</span><strong>${escapeHtml(payment.salesEmail)}</strong><p>Contact for payment or activation.</p></div>
              </div>
              <div class="subscription-actions">
                <a class="button" href="mailto:${escapeHtml(payment.salesEmail)}">Upgrade / support</a>
                <button class="secondary" type="button" data-scroll-target="sheetApiMain">Open Sheet API code</button>
              </div>
            </div>
          </section>
          <section id="groupsMain" class="main-card dashboard-panel hidden">
              <div class="panel-head">
                <div><h2>WhatsApp Groups</h2><p>Copy group IDs and use them as the API or sheet recipient.</p></div>
                <div class="actions"><span class="pill" id="mainGroupCount">0 groups</span><button class="secondary" type="button" id="refreshGroupsBtn">Refresh</button></div>
              </div>
              <div class="panel-body">
                <p class="small" id="mainGroupsState">Connect WhatsApp to load groups.</p>
                <div class="main-group-list" id="mainGroupsList"></div>
              </div>
            </section>
            <section id="sheetApiMain" class="main-card dashboard-panel hidden">
              <div class="panel-head">
                <div><h2>Sheet API Code</h2><p>Copy this into Google Apps Script as <code>WhatsApp.gs</code>.</p></div>
                <button class="secondary" type="button" id="copySheetApiBtn">Copy code</button>
              </div>
              <div class="panel-body">
                <textarea class="sheet-code-box" id="sheetApiCode" readonly></textarea>
              </div>
            </section>
            <section id="testMessageMain" class="main-card dashboard-panel hidden">
              <div class="panel-head">
                <div><h2>Test Message</h2><p>Send one test message to a phone number or group ID.</p></div>
                <span class="pill queued" id="testMessageState">Ready</span>
              </div>
              <div class="panel-body">
                <div class="test-message-grid">
                  <label>To / Group ID<input id="testMessageTo" placeholder="91876543210 or 1203630xxxxx@g.us"></label>
                  <label>Message<input id="testMessageText" placeholder="Hello from MIS_api"></label>
                  <button id="sendTestMessageBtn" type="button">Send test</button>
                </div>
                <p class="small" id="testMessageResult"></p>
              </div>
            </section>
            <section id="queueMain" class="main-card dashboard-panel hidden">
              <div class="panel-head"><h2>Current Queue</h2><span class="pill queued" id="queueLabel">0 queued</span></div>
              <div class="panel-body">
                <table>
                  <thead><tr><th>Status</th><th>To</th><th>Message</th><th>Time</th></tr></thead>
                  <tbody id="queueRows"><tr><td colspan="4" class="empty-row"><strong>Restricted</strong><span>Sign in to load queued messages.</span></td></tr></tbody>
                </table>
              </div>
            </section>
            <section id="logsMain" class="main-card dashboard-panel hidden">
              <div class="panel-head"><h2>Message Logs</h2><span class="pill" id="logLabel">0 logs</span></div>
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
      const dashboardPanelTargets = new Set(['overview', 'phoneCards', 'subscriptionMain', 'groupsMain', 'queueMain', 'logsMain', 'sheetApiMain', 'testMessageMain']);
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
      document.querySelectorAll('[data-toggle-password]').forEach(button => {
        button.addEventListener('click', () => togglePassword(button));
      });
      document.getElementById('customerRefreshBtn').addEventListener('click', loadDashboard);
      document.getElementById('saveWebhookBtn').addEventListener('click', saveWebhook);
      document.getElementById('refreshGroupsBtn').addEventListener('click', loadGroupsPanel);
      document.getElementById('copySheetApiBtn').addEventListener('click', copySheetApiCode);
      document.getElementById('sendTestMessageBtn').addEventListener('click', sendTestMessage);
      document.getElementById('topLogoutBtn').addEventListener('click', logout);
      document.getElementById('adminRefreshBtn').addEventListener('click', loadAdminDashboard);
      document.getElementById('adminCreateBtn').addEventListener('click', createAdminCustomer);
      const phonePollers = new Map();
      const apiBaseUrl = ${JSON.stringify(config.baseUrl)};
      let customerApiKey = '';

      function setAuthMode(mode) {
        const signup = mode === 'signup';
        document.getElementById('authTitle').textContent = signup ? 'Sign up' : 'Sign in';
        document.getElementById('authSubtitle').textContent = signup
          ? 'Create your workspace and start your free trial.'
          : 'Access your WhatsApp API workspace.';
        document.getElementById('loginForm').classList.toggle('hidden', signup);
        document.getElementById('signupForm').classList.toggle('hidden', !signup);
        document.getElementById('showLoginBtn').className = signup ? 'secondary' : 'active';
        document.getElementById('showSignupBtn').className = signup ? 'active' : 'secondary';
        document.getElementById('authNote').textContent = signup
          ? '${Number(config.trialDays || 7)}-day free trial. One trial is allowed for each user ID.'
          : 'Admin and customer workspaces are protected. Use logout after managing shared devices.';
        document.getElementById('loginError').textContent = '';
      }

      function togglePassword(button) {
        const input = document.getElementById(button.getAttribute('data-toggle-password'));
        if (!input) return;
        const showing = input.type === 'text';
        input.type = showing ? 'password' : 'text';
        button.textContent = showing ? '👁' : '🙈';
        button.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
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
          window.location.href = '/admin';
          return;
        }
        sessionToken = data.sessionToken;
        sessionStorage.removeItem('mis_api_admin_session');
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
        sessionStorage.removeItem('mis_api_admin_session');
        document.getElementById('loginError').textContent = '';
        showCustomerShell();
        await loadDashboard();
      }

      function logout() {
        sessionToken = '';
        document.body.classList.remove('is-authenticated');
        document.body.classList.remove('is-customer');
        sessionStorage.removeItem('mis_api_admin_session');
        localStorage.removeItem('mis_api_session');
        fetch('/v1/auth/logout', { method: 'POST' }).catch(() => {});
        document.getElementById('loginCard').classList.remove('hidden');
        document.getElementById('topLogoutBtn').classList.add('hidden');
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('adminDashboard').classList.add('hidden');
        document.getElementById('publicDetails').classList.remove('hidden');
        stopPhonePollers();
        showDashboardPanel('overview', { scroll: false });
        document.getElementById('password').value = '';
        document.getElementById('username').focus();
      }

      function showCustomerShell() {
        document.body.classList.add('is-authenticated');
        document.body.classList.add('is-customer');
        document.getElementById('loginCard').classList.add('hidden');
        document.getElementById('topLogoutBtn').classList.remove('hidden');
        document.getElementById('publicDetails').classList.add('hidden');
        document.getElementById('adminDashboard').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        if (!document.querySelector('.dashboard-panel:not(.hidden)')) {
          showDashboardPanel('overview', { scroll: false });
        }
      }

      function showDashboardPanel(targetId, options = {}) {
        const panelId = targetId === 'phoneCards' ? 'overview' : targetId;
        document.querySelectorAll('.dashboard-panel').forEach(panel => {
          panel.classList.toggle('hidden', panel.id !== panelId);
        });
        document.querySelectorAll('.side-nav [data-scroll-target]').forEach(button => {
          button.classList.toggle('active', button.getAttribute('data-scroll-target') === targetId);
        });
        if (targetId === 'groupsMain') {
          loadGroupsPanel();
        }
        if (targetId === 'sheetApiMain') {
          refreshSheetApiPanel();
        }
        if (options.scroll === false) {
          return;
        }
        const target = document.getElementById(targetId === 'phoneCards' ? 'phoneCards' : panelId);
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      async function showAdminDashboard() {
        document.body.classList.add('is-authenticated');
        document.body.classList.remove('is-customer');
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
        const activeQueueRows = queueRows.filter(item => item.status === 'queued' || item.status === 'sending');
        const logRows = logs.messages || [];
        const failedRows = logRows.filter(item => item.status === 'failed');
        document.getElementById('customerName').textContent = me.customer.name + ' workspace';
        document.getElementById('customerStatus').textContent = customerStatusLabel(me.customer);
        document.getElementById('customerStatus').className = 'pill ' + customerStatusClass(me.customer);
        document.getElementById('trialBanner').innerHTML = trialBanner(me.customer);
        document.getElementById('webhookUrl').value = me.customer.webhookUrl || '';
        document.getElementById('dashboardNotice').textContent = me.removedDuplicatePhones
          ? 'Removed ' + me.removedDuplicatePhones + ' duplicate WhatsApp phone record' + (me.removedDuplicatePhones === 1 ? '.' : 's.')
          : '';
        document.getElementById('dashboardNotice').className = 'dashboard-notice';
        customerApiKey = me.customer.apiKey || '';
        renderSidePanel(me.customer, me.phones || [], activeQueueRows, logRows);
        renderSubscriptionPanel(me.customer);
        document.getElementById('phoneCount').textContent = me.phones.length;
        document.getElementById('queueCount').textContent = activeQueueRows.length;
        document.getElementById('logCount').textContent = logRows.length;
        document.getElementById('failedCount').textContent = failedRows.length;
        document.getElementById('queueLabel').textContent = activeQueueRows.length + ' active';
        document.getElementById('logLabel').textContent = logRows.length + ' logs';
        document.getElementById('phoneCards').innerHTML = me.phones.length
          ? me.phones.map(phoneCard).join('')
          : '<div class="empty-state"><strong>Preparing WhatsApp number</strong><span>Refresh once. Your WhatsApp card is created automatically.</span></div>';
        refreshScriptBoxes();
        refreshSheetApiPanel();
        hydratePhoneCards(me.phones || []);
        document.getElementById('queueRows').innerHTML = activeQueueRows.length
          ? activeQueueRows.map(row).join('')
          : '<tr><td colspan="4" class="empty-row"><strong>No active queue</strong><span>Only messages still queued or sending appear here.</span></td></tr>';
        document.getElementById('logRows').innerHTML = logRows.length
          ? logRows.map(row).join('')
          : '<tr><td colspan="4" class="empty-row"><strong>No message activity</strong><span>Sent, failed, and received messages will appear here.</span></td></tr>';
        loadGroupsPanel();
      }

      async function fetchJson(url) {
        const headers = sessionToken ? { 'x-session-token': sessionToken } : {};
        const response = await fetch(url, { headers });
        return response.json();
      }

      function renderSidePanel(customer, phones, queueRows, logRows) {
        const phoneText = phones.length + ' WhatsApp phone' + (phones.length === 1 ? '' : 's');
        const failedRows = logRows.filter(item => item.status === 'failed');
        document.getElementById('sideCustomerName').textContent = customer.name || 'Workspace';
        document.getElementById('sideCustomerMeta').textContent = phoneText + ' • ' + queueRows.length + ' queued';
        if (failedRows.length) {
          document.getElementById('sideCustomerMeta').textContent += ' • ' + failedRows.length + ' failed';
        }
      }

      function subscriptionSummary(customer) {
        if (customer.subscriptionStatus === 'active') {
          return 'Your plan is active. API sending remains enabled.';
        }
        const left = daysLeft(customer.trialEndsAt);
        if (left < 0) {
          return 'Trial expired. Activate subscription to continue sending.';
        }
        return left + ' day' + (left === 1 ? '' : 's') + ' left in your free trial.';
      }

      function renderSubscriptionPanel(customer) {
        document.getElementById('subPlanStatus').textContent = customerStatusLabel(customer);
        document.getElementById('subPlanStatus').className = 'pill ' + customerStatusClass(customer);
        document.getElementById('subStatusText').textContent = customerStatusLabel(customer);
        document.getElementById('subTrialText').textContent = subscriptionSummary(customer);
        document.getElementById('subTrialEnds').textContent = formatDate(customer.trialEndsAt);
      }

      async function loadGroupsPanel() {
        const button = document.getElementById('refreshGroupsBtn');
        if (button) {
          button.disabled = true;
          button.textContent = 'Loading';
        }
        document.getElementById('mainGroupsState').textContent = 'Reading groups from connected WhatsApp...';
        document.getElementById('mainGroupsList').innerHTML = '<div class="empty-state"><strong>Loading groups</strong><span>Please wait while MIS_api reads your WhatsApp groups.</span></div>';

        try {
          const data = await fetchJson('/v1/customer/groups');
          renderGroups(data);
        } catch (err) {
          renderGroups({ ok: true, groups: [], error: err.message || 'Could not load groups.' });
        } finally {
          if (button) {
            button.disabled = false;
            button.textContent = 'Refresh';
          }
        }
      }

      function renderGroups(data) {
        const groups = data.groups || [];
        document.getElementById('mainGroupCount').textContent = groups.length + ' group' + (groups.length === 1 ? '' : 's');
        document.getElementById('mainGroupsState').textContent = groups.length
          ? 'Use these group IDs in column A of your Sheet or in the API "to" field.'
          : (data.error || 'No groups found yet. Make sure WhatsApp is connected.');
        document.getElementById('mainGroupsList').innerHTML = groups.length
          ? groups.map(mainGroupItem).join('')
          : '<div class="empty-state"><strong>No groups loaded</strong><span>Connect WhatsApp, then click Refresh in the sidebar groups card.</span></div>';
      }

      function mainGroupItem(group) {
        const meta = [
          group.participants ? group.participants + ' members' : '',
          group.announce ? 'admin-only' : '',
          group.restrict ? 'restricted' : '',
          group.phoneId ? 'Phone ' + group.phoneId : ''
        ].filter(Boolean).join(' • ');
        return '<div class="main-group-item">' +
          '<div><strong>' + escapeHtml(group.subject || 'Unnamed group') + '</strong>' +
          '<span>' + escapeHtml(meta || 'WhatsApp group') + '</span>' +
          '<code>' + escapeHtml(group.id) + '</code></div>' +
          '<button class="secondary" type="button" data-copy-group="' + escapeHtml(group.id) + '">Copy group ID</button>' +
          '</div>';
      }

      function refreshSheetApiPanel() {
        const firstPhone = document.querySelector('[data-whatsapp-script]');
        const codeBox = document.getElementById('sheetApiCode');
        if (!codeBox) {
          return;
        }
        codeBox.value = firstPhone
          ? whatsappGsCode(firstPhone.getAttribute('data-whatsapp-script'), customerApiKey || 'CUSTOMER_API_KEY')
          : whatsappGsCode('PHONE_ID', customerApiKey || 'CUSTOMER_API_KEY');
      }

      async function copySheetApiCode() {
        refreshSheetApiPanel();
        await copyText(document.getElementById('sheetApiCode').value);
        const button = document.getElementById('copySheetApiBtn');
        button.textContent = 'Copied';
        setTimeout(() => {
          button.textContent = 'Copy code';
        }, 1200);
      }

      async function sendTestMessage() {
        const state = document.getElementById('testMessageState');
        const resultBox = document.getElementById('testMessageResult');
        const phone = document.querySelector('[data-whatsapp-script]');
        const to = document.getElementById('testMessageTo').value.trim();
        const message = document.getElementById('testMessageText').value.trim() || 'Hello from MIS_api';
        if (!phone) {
          resultBox.textContent = 'No WhatsApp phone found. Connect WhatsApp first.';
          resultBox.className = 'small error-text';
          return;
        }
        if (!to) {
          resultBox.textContent = 'Enter a phone number or group ID.';
          resultBox.className = 'small error-text';
          return;
        }

        state.textContent = 'Sending';
        resultBox.textContent = '';
        try {
          const response = await fetch('/v1/messages/send', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: 'Bearer ' + customerApiKey
            },
            body: JSON.stringify({
              phoneId: phone.getAttribute('data-whatsapp-script'),
              to,
              message
            })
          });
          const data = await response.json();
          state.textContent = data.ok ? 'Queued' : 'Failed';
          resultBox.textContent = data.ok
            ? 'Test message queued. Queue ID: ' + (data.queueId || '-')
            : (data.error || 'Could not queue test message.');
          resultBox.className = 'small ' + (data.ok ? 'success-text' : 'error-text');
          if (data.ok) {
            setTimeout(loadDashboard, 700);
          }
        } catch (err) {
          state.textContent = 'Failed';
          resultBox.textContent = err.message || 'Could not send test message.';
          resultBox.className = 'small error-text';
        }
      }

      function phoneCard(phone) {
        const status = String(phone.status || 'created').toLowerCase();
        const connected = status === 'ready';
        const label = connected ? 'connected' : friendlyPhoneStatus(status);
        const severity = phoneSeverity(status, connected);
        const qrAction = '<button class="phone-link" type="button" data-link-phone="' + escapeHtml(phone.id) + '">' + escapeHtml(connected ? 'Show status' : 'Show QR / Reconnect') + '</button>';
        const disconnectAction = connected
          ? '<button class="danger" type="button" data-unlink-phone="' + escapeHtml(phone.id) + '">Disconnect</button>'
          : '';
        return '<div class="phone-card phone-' + escapeHtml(severity) + '" id="phoneCard-' + escapeHtml(phone.id) + '">' +
          '<div class="phone-main"><div><strong>' + escapeHtml(phone.label) + '</strong>' +
          '<span class="phone-help">' + escapeHtml(phoneStatusHelp(status, connected)) + '</span>' +
          '<code>' + escapeHtml(phone.id) + '</code></div><div class="phone-actions"><span class="pill ' + escapeHtml(severity) + '" id="phoneStatus-' + escapeHtml(phone.id) + '">' + escapeHtml(label) + '</span>' +
          qrAction + disconnectAction + '</div></div>' +
          '<div class="phone-qr" id="phoneQr-' + escapeHtml(phone.id) + '"><div id="phoneQrImage-' + escapeHtml(phone.id) + '"></div><div><strong id="phoneQrTitle-' + escapeHtml(phone.id) + '">Waiting for QR</strong><p class="small" id="phoneQrText-' + escapeHtml(phone.id) + '">Open WhatsApp Linked Devices and scan this QR when it appears.</p></div></div>' +
          '<div class="script-box"><div class="panel-head"><h2>WhatsApp.gs</h2><span class="small">Copy from Sheet API tab</span></div>' +
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
          sessionStorage.removeItem('mis_api_admin_session');
          showCustomerShell();
          await loadDashboard();
          return;
        }
        const admin = await fetchJson('/v1/admin/customers');
        if (admin.ok) {
          window.location.href = '/admin';
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
        const progress = Math.max(0, Math.min(100, Math.round((left / ${Number(config.trialDays || 7)}) * 100)));
        return '<strong>Free trial</strong><span>' + left + ' day' + (left === 1 ? '' : 's') + ' remaining. Trial ends ' + escapeHtml(formatDate(customer.trialEndsAt)) + '.</span><div class="trial-progress"><i style="width:' + progress + '%"></i></div>';
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

      document.addEventListener('click', async event => {
        const scrollButton = event.target.closest('[data-scroll-target]');
        if (scrollButton) {
          const targetId = scrollButton.getAttribute('data-scroll-target');
          if (document.body.classList.contains('is-authenticated') && dashboardPanelTargets.has(targetId)) {
            showDashboardPanel(targetId);
            return;
          }
          const target = document.getElementById(targetId);
          target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }

        const authButton = event.target.closest('[data-auth-mode]');
        if (authButton) {
          setAuthMode(authButton.getAttribute('data-auth-mode'));
          document.getElementById('loginCard')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }

        const groupCopyButton = event.target.closest('[data-copy-group]');
        if (groupCopyButton) {
          await copyText(groupCopyButton.getAttribute('data-copy-group'));
          groupCopyButton.textContent = 'Copied';
          setTimeout(() => {
            groupCopyButton.textContent = 'Copy';
          }, 1200);
          return;
        }

        const linkButton = event.target.closest('[data-link-phone]');
        if (linkButton) {
          const phoneId = linkButton.getAttribute('data-link-phone');
          const originalText = linkButton.textContent;
          linkButton.disabled = true;
          linkButton.textContent = 'Opening...';
          try {
            await linkPhone(phoneId);
          } finally {
            linkButton.disabled = false;
            linkButton.textContent = originalText;
          }
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
        setPhoneQrState(phoneId, null, 'Opening WhatsApp session', 'Checking current status and loading QR if needed.');
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

      function hydratePhoneCards(phones) {
        stopPhonePollers();
        phones.forEach(phone => {
          if (!phone || !phone.id) {
            return;
          }
          const status = String(phone.status || 'created').toLowerCase();
          if (status === 'ready') {
            refreshPhoneStatus(phone.id, false);
            return;
          }
          startPhonePoller(phone.id);
        });
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

      async function refreshPhoneStatus(phoneId, reloadOnReady = true) {
        const data = await fetchJson('/v1/customer/phones/' + encodeURIComponent(phoneId) + '/status');
        if (!data.ok) {
          stopPhonePoller(phoneId);
          return;
        }
        updatePhoneStatus(phoneId, data.status, data.ready, data.qrImage, data.error);
        if (data.ready) {
          stopPhonePoller(phoneId);
          if (reloadOnReady) {
            setTimeout(loadDashboard, 600);
          }
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
          setPhoneConnectedState(phoneId);
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
        panel.classList.remove('connected');
        image.innerHTML = qrImage ? '<img src="' + qrImage + '" alt="WhatsApp QR code">' : '';
        heading.textContent = title;
        body.textContent = text;
      }

      function setPhoneConnectedState(phoneId) {
        const panel = document.getElementById('phoneQr-' + phoneId);
        const image = document.getElementById('phoneQrImage-' + phoneId);
        const heading = document.getElementById('phoneQrTitle-' + phoneId);
        const body = document.getElementById('phoneQrText-' + phoneId);
        if (!panel || !image || !heading || !body) {
          return;
        }
        panel.classList.add('active');
        panel.classList.add('connected');
        image.innerHTML = '<div class="wa-session-icon">WA</div>';
        heading.textContent = 'WhatsApp Web active';
        body.innerHTML = 'This device is linked and ready. API messages will send through this WhatsApp session.<br><span class="wa-session-status">Connected now</span>';
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
        align-items: center;
        background: linear-gradient(135deg, #0f8a78, #22c55e);
        border-radius: 9px;
        color: #052e16;
        content: "AR";
        display: grid;
        font-size: 11px;
        font-weight: 950;
        height: 28px;
        place-items: center;
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
      .customer-dashboard,
      .customer-stack,
      .admin-dashboard {
        grid-column: 1 / -1;
      }
      .customer-dashboard {
        align-items: start;
        display: grid;
        gap: 18px;
        grid-template-columns: 320px minmax(0, 1fr);
      }
      .side-panel {
        display: grid;
        gap: 14px;
        position: sticky;
        top: 92px;
      }
      .side-profile,
      .side-card {
        background: rgba(255, 255, 255, .92);
        border: 1px solid var(--border);
        border-radius: 22px;
        box-shadow: 0 18px 44px rgba(15, 23, 42, .07);
      }
      .side-profile {
        align-items: center;
        background:
          radial-gradient(circle at top right, rgba(16, 185, 129, .24), transparent 170px),
          linear-gradient(135deg, #0f172a, #12352c);
        color: #fff;
        display: grid;
        gap: 12px;
        grid-template-columns: auto 1fr;
        padding: 16px;
      }
      .side-avatar {
        align-items: center;
        background: #22c55e;
        border-radius: 16px;
        box-shadow: 0 12px 28px rgba(34, 197, 94, .3);
        color: #052e16;
        display: grid;
        font-weight: 950;
        height: 48px;
        place-items: center;
        width: 48px;
      }
      .side-profile strong {
        display: block;
        font-size: 16px;
        margin-bottom: 3px;
      }
      .side-profile span {
        color: rgba(255,255,255,.72);
        display: block;
        font-size: 12px;
        line-height: 1.45;
      }
      .side-nav {
        background: #fff;
        border: 1px solid var(--border);
        border-radius: 18px;
        display: grid;
        gap: 6px;
        padding: 8px;
      }
      .side-nav button {
        background: transparent;
        border: 0;
        border-radius: 12px;
        color: var(--text-muted);
        justify-content: flex-start;
        min-height: 38px;
        padding: 0 12px;
        text-align: left;
      }
      .side-nav button:hover {
        background: #ecfdf5;
        color: #047857;
      }
      .side-card {
        display: grid;
        gap: 10px;
        overflow: hidden;
        padding: 16px;
      }
      .side-card-head {
        align-items: start;
        display: flex;
        gap: 10px;
        justify-content: space-between;
      }
      .side-label {
        color: var(--text-muted);
        display: block;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: .08em;
        margin-bottom: 3px;
        text-transform: uppercase;
      }
      .side-card strong {
        color: var(--text);
        font-size: 16px;
      }
      .side-card p,
      .side-muted,
      .side-empty {
        color: var(--text-muted);
        font-size: 13px;
        line-height: 1.55;
      }
      .side-subscription {
        background: linear-gradient(180deg, #ffffff, #f8fbff);
      }
      .side-subscription.active {
        border-color: rgba(16, 185, 129, .34);
      }
      .side-subscription.failed {
        border-color: rgba(220, 38, 38, .28);
      }
      .side-price {
        align-items: center;
        background: #f8fafc;
        border: 1px solid var(--border);
        border-radius: 14px;
        display: flex;
        justify-content: space-between;
        padding: 11px 12px;
      }
      .side-price span {
        color: var(--text-muted);
        font-size: 12px;
      }
      .side-price b {
        color: var(--text);
        font-size: 16px;
      }
      .side-link {
        align-items: center;
        background: #0f8a78;
        border-radius: 12px;
        color: #fff;
        display: inline-flex;
        font-size: 13px;
        font-weight: 850;
        justify-content: center;
        min-height: 38px;
        text-decoration: none;
      }
      .mini-button {
        background: #f8fafc;
        border: 1px solid var(--border);
        border-radius: 10px;
        color: var(--text);
        font-size: 12px;
        font-weight: 850;
        min-height: 32px;
        padding: 0 10px;
      }
      .group-list,
      .side-log-list {
        display: grid;
        gap: 8px;
        max-height: 330px;
        overflow: auto;
        padding-right: 2px;
      }
      .group-item {
        align-items: center;
        background: #fbfdff;
        border: 1px solid var(--border);
        border-radius: 14px;
        display: grid;
        gap: 10px;
        grid-template-columns: minmax(0, 1fr) auto;
        padding: 10px;
      }
      .group-item strong,
      .group-item span,
      .group-item code {
        display: block;
      }
      .group-item strong {
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .group-item code {
        background: #eef6f3;
        border: 1px solid #d8e8e2;
        border-radius: 8px;
        color: #0f766e;
        font-family: var(--mono);
        font-size: 11px;
        margin: 5px 0;
        overflow-wrap: anywhere;
        padding: 5px 6px;
      }
      .group-item span {
        color: var(--text-muted);
        font-size: 11px;
      }
      .side-log-item {
        align-items: start;
        background: #fbfdff;
        border: 1px solid var(--border);
        border-radius: 14px;
        display: grid;
        gap: 9px;
        grid-template-columns: auto 1fr;
        padding: 10px;
      }
      .side-status {
        background: #94a3b8;
        border-radius: 999px;
        height: 9px;
        margin-top: 5px;
        width: 9px;
      }
      .side-status.sent,
      .side-status.received {
        background: var(--success);
      }
      .side-status.queued,
      .side-status.sending {
        background: #f59e0b;
      }
      .side-status.failed {
        background: var(--danger);
      }
      .side-log-item strong,
      .side-log-item span,
      .side-log-item small {
        display: block;
      }
      .side-log-item strong {
        font-size: 12px;
      }
      .side-log-item span {
        color: var(--text-muted);
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .side-log-item small {
        color: #94a3b8;
        font-size: 11px;
        margin-top: 2px;
      }
      .side-tip code {
        background: #eef6f3;
        border-radius: 6px;
        color: #0f766e;
        font-family: var(--mono);
        padding: 2px 5px;
      }
      .dashboard-insights {
        align-items: stretch;
      }
      .main-card {
        scroll-margin-top: 96px;
      }
      .main-group-list,
      .main-recent-list {
        display: grid;
        gap: 10px;
      }
      .main-group-item,
      .main-recent-item {
        align-items: center;
        background:
          radial-gradient(circle at top right, rgba(20,184,166,.09), transparent 180px),
          #fbfdff;
        border: 1px solid var(--border);
        border-radius: 16px;
        display: grid;
        gap: 12px;
        padding: 14px;
      }
      .main-group-item {
        grid-template-columns: minmax(0, 1fr) auto;
      }
      .main-group-item strong,
      .main-group-item span,
      .main-group-item code {
        display: block;
      }
      .main-group-item strong {
        color: var(--text);
        font-size: 15px;
        margin-bottom: 4px;
      }
      .main-group-item span {
        color: var(--text-muted);
        font-size: 12px;
        margin-bottom: 8px;
      }
      .main-group-item code {
        background: #ecfdf5;
        border: 1px solid #bbf7d0;
        border-radius: 10px;
        color: #047857;
        font-family: var(--mono);
        font-size: 12px;
        overflow-wrap: anywhere;
        padding: 8px 10px;
      }
      .main-recent-item {
        grid-template-columns: auto minmax(0, 1fr) auto;
      }
      .main-recent-item strong,
      .main-recent-item p,
      .main-recent-item time {
        display: block;
      }
      .main-recent-item strong {
        color: var(--text);
        font-size: 13px;
      }
      .main-recent-item p {
        color: var(--text-muted);
        font-size: 13px;
        margin: 3px 0 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .main-recent-item time {
        color: #94a3b8;
        font-size: 12px;
        white-space: nowrap;
      }
      .sheet-code-box {
        background: #0b1220;
        border: 0;
        border-radius: 16px;
        color: #dbeafe;
        font-family: var(--mono);
        font-size: 13px;
        line-height: 1.65;
        min-height: 520px;
        padding: 18px;
        resize: vertical;
        width: 100%;
      }
      .test-message-grid {
        align-items: end;
        display: grid;
        gap: 12px;
        grid-template-columns: minmax(220px, .9fr) minmax(260px, 1.2fr) auto;
      }
      .subscription-detail-grid {
        display: grid;
        gap: 14px;
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
      .subscription-detail-card {
        background:
          radial-gradient(circle at top right, rgba(34, 197, 94, .12), transparent 160px),
          #fbfdff;
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 16px;
      }
      .subscription-detail-card span,
      .subscription-detail-card p {
        color: var(--text-muted);
        display: block;
        font-size: 13px;
      }
      .subscription-detail-card strong {
        color: var(--text);
        display: block;
        font-size: 17px;
        margin: 6px 0;
        overflow-wrap: anywhere;
      }
      .subscription-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 16px;
      }
      .customer-dashboard {
        gap: 18px;
        grid-template-columns: 78px minmax(0, 1fr);
      }
      .side-panel {
        background: linear-gradient(180deg, rgba(255,255,255,.96), rgba(248,250,252,.94));
        border: 1px solid rgba(203, 213, 225, .8);
        border-radius: 24px;
        box-shadow: 0 24px 60px rgba(15, 23, 42, .14);
        overflow: hidden;
        padding: 10px;
        transition: width .22s ease, box-shadow .22s ease, transform .22s ease;
        width: 78px;
        z-index: 5;
      }
      .side-panel:hover,
      .side-panel:focus-within {
        box-shadow: 0 30px 80px rgba(15, 23, 42, .2);
        transform: translateY(-1px);
        width: 336px;
      }
      .side-reveal,
      .nav-text {
        opacity: 0;
        pointer-events: none;
        transition: opacity .16s ease .06s;
        white-space: nowrap;
      }
      .side-panel:hover .side-reveal,
      .side-panel:focus-within .side-reveal,
      .side-panel:hover .nav-text,
      .side-panel:focus-within .nav-text {
        opacity: 1;
        pointer-events: auto;
      }
      .side-profile,
      .side-card {
        border-radius: 18px;
        box-shadow: none;
        display: grid;
        gap: 12px;
        grid-template-columns: 42px 1fr;
        min-height: 58px;
        padding: 8px;
      }
      .side-profile {
        background:
          radial-gradient(circle at 32px 24px, rgba(45, 212, 191, .48), transparent 74px),
          linear-gradient(135deg, #0f172a, #115e59);
      }
      .side-avatar,
      .side-card-icon,
      .nav-icon {
        align-items: center;
        border-radius: 14px;
        display: grid;
        flex: 0 0 auto;
        font-weight: 950;
        height: 42px;
        place-items: center;
        width: 42px;
      }
      .side-avatar {
        height: 42px;
        width: 42px;
      }
      .side-card-icon,
      .nav-icon {
        background: linear-gradient(135deg, #ecfdf5, #dff8ff);
        border: 1px solid rgba(20, 184, 166, .2);
        color: #0f766e;
      }
      .side-card {
        background: rgba(255, 255, 255, .9);
        border-color: rgba(226, 232, 240, .92);
      }
      .side-card:hover {
        background: #ffffff;
        border-color: rgba(20, 184, 166, .25);
      }
      .side-nav {
        background: transparent;
        border: 0;
        padding: 0;
      }
      .side-nav button {
        align-items: center;
        display: flex;
        gap: 11px;
        min-height: 54px;
        overflow: hidden;
        padding: 6px;
      }
      .side-nav button:hover {
        background: linear-gradient(135deg, #ecfdf5, #eff6ff);
      }
      .side-nav button.active {
        background: linear-gradient(135deg, #ecfdf5, #f0fdfa);
        color: #0f766e;
      }
      .side-nav button:hover .nav-icon {
        background: linear-gradient(135deg, #14b8a6, #22c55e);
        color: #fff;
      }
      .side-nav button.active .nav-icon {
        background: linear-gradient(135deg, #14b8a6, #22c55e);
        box-shadow: 0 12px 28px rgba(20, 184, 166, .18);
        color: #fff;
      }
      .side-panel:not(:hover):not(:focus-within) .side-reveal {
        height: 0;
        overflow: hidden;
        width: 0;
      }
      .side-panel:not(:hover):not(:focus-within) .side-card,
      .side-panel:not(:hover):not(:focus-within) .side-profile {
        grid-template-columns: 42px;
        justify-content: center;
        min-height: 54px;
        padding: 6px;
      }
      .side-panel:not(:hover):not(:focus-within) .side-nav button {
        justify-content: center;
      }
      .side-panel:hover .side-card,
      .side-panel:focus-within .side-card,
      .side-panel:hover .side-profile,
      .side-panel:focus-within .side-profile {
        padding: 12px;
      }
      .side-panel:hover .side-subscription,
      .side-panel:focus-within .side-subscription {
        background:
          radial-gradient(circle at top right, rgba(34, 197, 94, .16), transparent 160px),
          #ffffff;
      }
      .dashboard-panel.hidden {
        display: none !important;
      }
      .is-customer main {
        max-width: none;
        margin: 0;
        padding: 10px 12px 34px 94px;
        width: 100%;
      }
      .is-customer .login-grid,
      .is-customer .portal-top,
      .is-customer .customer-stack,
      .is-customer .customer-dashboard {
        max-width: none;
        width: 100%;
      }
      .is-customer .portal-top {
        display: none;
      }
      .is-customer .customer-dashboard {
        display: block;
      }
      .is-customer .side-panel {
        bottom: 14px;
        left: 14px;
        overflow-x: hidden;
        overflow-y: auto;
        position: fixed;
        top: 14px;
        width: 72px;
      }
      .is-customer .side-panel:hover,
      .is-customer .side-panel:focus-within {
        width: 336px;
      }
      .is-customer .customer-stack {
        display: grid;
        gap: 14px;
      }
      .wa-session-card {
        align-items: center;
        background:
          radial-gradient(circle at top right, rgba(34, 197, 94, .16), transparent 240px),
          linear-gradient(135deg, #0b141a, #123f35);
        border-radius: 18px;
        color: #fff;
        display: grid;
        gap: 18px;
        grid-template-columns: auto 1fr;
        padding: 22px;
        text-align: left;
      }
      .wa-session-icon {
        align-items: center;
        background: #25d366;
        border-radius: 22px;
        box-shadow: 0 18px 42px rgba(37, 211, 102, .28);
        color: #052e16;
        display: grid;
        font-size: 22px;
        font-weight: 950;
        height: 72px;
        place-items: center;
        width: 72px;
      }
      .wa-session-card strong {
        color: #fff;
        font-size: 22px;
        margin: 0 0 6px;
      }
      .wa-session-card p {
        color: rgba(255,255,255,.72);
        margin: 0;
      }
      .wa-session-status {
        align-items: center;
        color: #bbf7d0;
        display: inline-flex;
        font-size: 13px;
        font-weight: 850;
        gap: 7px;
        margin-top: 12px;
      }
      .wa-session-status:before {
        background: #25d366;
        border-radius: 999px;
        content: "";
        height: 9px;
        width: 9px;
      }
      .phone-qr.connected {
        background:
          radial-gradient(circle at top right, rgba(34, 197, 94, .14), transparent 260px),
          linear-gradient(135deg, #0b141a, #123f35);
        border: 0;
        color: #fff;
      }
      .phone-qr.connected strong {
        color: #fff;
        font-size: 22px;
      }
      .phone-qr.connected p {
        color: rgba(255,255,255,.72);
      }
      body:not(.is-authenticated) {
        background:
          radial-gradient(circle at 12% 10%, rgba(38, 180, 95, .28), transparent 250px),
          radial-gradient(circle at 88% 18%, rgba(9, 116, 74, .26), transparent 290px),
          linear-gradient(135deg, #03110b 0%, #071b12 45%, #0f321f 100%);
        min-height: 100vh;
      }
      body:not(.is-authenticated) main {
        max-width: 1280px;
        padding: 22px 18px 56px;
      }
      body:not(.is-authenticated) .portal-top {
        display: none;
      }
      body:not(.is-authenticated) .portal-title h1 {
        color: #f0fdf4;
      }
      body:not(.is-authenticated) .ghost,
      body:not(.is-authenticated) .ghost-link {
        color: rgba(240, 253, 244, .74);
      }
      body:not(.is-authenticated) .ghost:hover,
      body:not(.is-authenticated) .ghost-link:hover {
        background: rgba(255, 255, 255, .08);
        color: #fff;
      }
      body:not(.is-authenticated) .login-grid {
        background:
          radial-gradient(ellipse at 8% 8%, rgba(60, 255, 140, .34), transparent 180px),
          radial-gradient(ellipse at 20% 40%, rgba(18, 95, 43, .72), transparent 210px),
          radial-gradient(ellipse at 78% 12%, rgba(24, 120, 70, .46), transparent 240px),
          linear-gradient(135deg, rgba(9, 36, 23, .98), rgba(1, 9, 6, .98));
        border: 1px solid rgba(145, 255, 190, .24);
        border-radius: 34px;
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, .08),
          0 42px 120px rgba(0, 0, 0, .48);
        display: grid;
        gap: 0;
        grid-template-columns: minmax(0, 1.08fr) minmax(420px, .92fr);
        overflow: hidden;
        padding: 24px;
        position: relative;
      }
      body:not(.is-authenticated) .login-grid:before,
      body:not(.is-authenticated) .login-grid:after {
        content: "";
        filter: blur(1px);
        opacity: .62;
        pointer-events: none;
        position: absolute;
        z-index: 0;
      }
      body:not(.is-authenticated) .login-grid:before {
        background:
          radial-gradient(ellipse at 34% 30%, rgba(112, 255, 173, .38), transparent 32%),
          radial-gradient(ellipse at 68% 28%, rgba(28, 142, 76, .34), transparent 34%);
        border-radius: 999px;
        height: 250px;
        left: 16px;
        top: -80px;
        transform: rotate(-10deg);
        width: 560px;
      }
      body:not(.is-authenticated) .login-grid:after {
        background:
          radial-gradient(ellipse at center, rgba(31, 185, 103, .34), transparent 35%),
          radial-gradient(ellipse at 70% 72%, rgba(4, 54, 31, .68), transparent 42%);
        border-radius: 999px;
        bottom: -90px;
        height: 260px;
        right: -50px;
        transform: rotate(18deg);
        width: 480px;
      }
      body:not(.is-authenticated) .public-stack {
        display: contents;
      }
      body:not(.is-authenticated) .public-hero,
      body:not(.is-authenticated) .login-card {
        min-height: 620px;
        position: relative;
        z-index: 1;
      }
      body:not(.is-authenticated) .public-hero {
        align-items: end;
        background:
          linear-gradient(90deg, rgba(5, 18, 11, .46), rgba(5, 18, 11, .14)),
          radial-gradient(circle at 18% 24%, rgba(67, 255, 142, .16), transparent 170px),
          radial-gradient(circle at 60% 10%, rgba(37, 132, 71, .18), transparent 220px);
        border: 1px solid rgba(255, 255, 255, .08);
        border-radius: 24px 0 0 24px;
        box-shadow: none;
        color: #fff;
        display: flex;
        overflow: hidden;
        padding: clamp(34px, 6vw, 66px);
      }
      body:not(.is-authenticated) .public-hero:before,
      body:not(.is-authenticated) .public-hero:after {
        border-radius: 42% 58% 46% 54%;
        content: "";
        pointer-events: none;
        position: absolute;
      }
      body:not(.is-authenticated) .public-hero:before {
        background: rgba(80, 255, 150, .16);
        box-shadow:
          0 0 55px rgba(80, 255, 150, .18),
          140px 45px 0 rgba(16, 112, 56, .18),
          270px -12px 0 rgba(59, 208, 112, .1);
        filter: blur(18px);
        height: 190px;
        left: 18px;
        top: 42px;
        transform: rotate(18deg);
        width: 150px;
      }
      body:not(.is-authenticated) .public-hero:after {
        background:
          linear-gradient(115deg, transparent 0 46%, rgba(118, 255, 180, .28) 47% 50%, transparent 51%),
          radial-gradient(ellipse at center, rgba(94, 255, 155, .14), transparent 62%);
        filter: blur(.3px);
        height: 360px;
        opacity: .68;
        right: -120px;
        top: -64px;
        transform: rotate(-22deg);
        width: 360px;
      }
      body:not(.is-authenticated) .public-hero > div:first-child {
        max-width: 560px;
        position: relative;
        z-index: 1;
      }
      body:not(.is-authenticated) .product-kicker {
        color: #86efac;
        letter-spacing: .16em;
      }
      body:not(.is-authenticated) .public-hero h2 {
        color: #fff;
        font-size: clamp(46px, 6.4vw, 72px);
        font-weight: 950;
        letter-spacing: -.055em;
        line-height: .92;
        margin-bottom: 22px;
      }
      body:not(.is-authenticated) .public-hero p {
        color: rgba(236, 253, 245, .78);
        font-size: 18px;
        font-weight: 650;
        line-height: 1.5;
        max-width: 540px;
      }
      body:not(.is-authenticated) .public-actions button {
        background: #0fa968;
        border: 1px solid rgba(134, 239, 172, .22);
        border-radius: 0;
        box-shadow: 0 18px 36px rgba(3, 105, 62, .34);
        color: #fff;
        min-height: 50px;
        padding: 0 24px;
      }
      body:not(.is-authenticated) .public-actions button.secondary {
        background: rgba(255, 255, 255, .08);
        color: #eafff2;
      }
      body:not(.is-authenticated) .trust-line {
        color: rgba(236, 253, 245, .62);
      }
      body:not(.is-authenticated) .hero-console {
        display: none;
      }
      body:not(.is-authenticated) .login-card {
        align-self: stretch;
        background:
          linear-gradient(90deg, rgba(0, 0, 0, .06), transparent 22%),
          rgba(0, 11, 7, .72);
        backdrop-filter: blur(18px);
        border: 1px solid rgba(255, 255, 255, .08);
        border-left: 1px solid rgba(134, 239, 172, .22);
        border-radius: 0 24px 24px 0;
        box-shadow: none;
        color: #fff;
        display: flex;
        flex-direction: column;
        grid-column: 2;
        grid-row: 1;
        justify-content: center;
        overflow: hidden;
        padding: clamp(34px, 5vw, 58px);
        position: relative;
        top: auto;
      }
      body:not(.is-authenticated) .login-card:before,
      body:not(.is-authenticated) .login-card:after {
        background: linear-gradient(180deg, transparent, rgba(211, 255, 226, .52), transparent);
        content: "";
        height: 160px;
        opacity: .5;
        position: absolute;
        right: 98px;
        width: 1px;
      }
      body:not(.is-authenticated) .login-card:before {
        top: 82px;
      }
      body:not(.is-authenticated) .login-card:after {
        bottom: 82px;
      }
      body:not(.is-authenticated) .login-card .panel-head {
        background: transparent;
        border: 0;
        color: #fff;
        padding: 0 0 28px;
      }
      body:not(.is-authenticated) .login-card .panel-head h2 {
        color: #fff;
        font-size: 34px;
        font-weight: 950;
        letter-spacing: -.04em;
      }
      body:not(.is-authenticated) .login-card .panel-head p {
        color: rgba(236, 253, 245, .64);
        font-size: 14px;
      }
      body:not(.is-authenticated) .login-card .panel-head .pill {
        background: rgba(255, 255, 255, .1);
        border: 1px solid rgba(255, 255, 255, .12);
        color: #bbf7d0;
      }
      body:not(.is-authenticated) .login-card .panel-body {
        padding: 0;
      }
      body:not(.is-authenticated) .auth-tabs {
        background: rgba(255, 255, 255, .06);
        border: 1px solid rgba(255, 255, 255, .08);
        border-radius: 999px;
        max-width: 330px;
        padding: 5px;
      }
      body:not(.is-authenticated) .login-card .auth-tabs button {
        border-radius: 999px;
        color: rgba(236, 253, 245, .72);
        min-height: 40px;
      }
      body:not(.is-authenticated) .login-card .auth-tabs button.active {
        background: rgba(15, 169, 104, .94);
        border: 0;
        box-shadow: 0 12px 28px rgba(3, 105, 62, .34);
        color: #fff;
      }
      body:not(.is-authenticated) .login-card label {
        color: rgba(236, 253, 245, .74);
        font-size: 13px;
        font-weight: 850;
        letter-spacing: 0;
        margin-bottom: 24px;
        text-transform: none;
      }
      body:not(.is-authenticated) .login-card input {
        background: transparent;
        border: 0;
        border-bottom: 1px solid rgba(236, 253, 245, .42);
        border-radius: 0;
        color: #fff;
        min-height: 44px;
        padding: 0 2px;
      }
      body:not(.is-authenticated) .login-card input:focus {
        border-color: #22c55e;
        box-shadow: 0 8px 24px -24px rgba(34, 197, 94, .8);
      }
      body:not(.is-authenticated) .login-card input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px #06150d inset;
        -webkit-text-fill-color: #fff;
      }
      body:not(.is-authenticated) .login-card button[type="submit"] {
        background: linear-gradient(135deg, #10a363, #07894f);
        border-radius: 0;
        box-shadow: 0 18px 42px rgba(3, 105, 62, .34);
        color: #fff;
        font-size: 16px;
        margin-top: 8px;
        min-height: 54px;
      }
      body:not(.is-authenticated) .login-card button[type="submit"]:hover {
        background: linear-gradient(135deg, #15b873, #099459);
      }
      body:not(.is-authenticated) .login-note {
        border-color: rgba(236, 253, 245, .14);
        color: rgba(236, 253, 245, .62);
      }
      body:not(.is-authenticated) .detail-grid,
      body:not(.is-authenticated) .api-panel,
      body:not(.is-authenticated) .pricing-row {
        grid-column: 1 / -1;
        position: relative;
        z-index: 1;
      }
      body:not(.is-authenticated) .detail-card,
      body:not(.is-authenticated) .api-panel,
      body:not(.is-authenticated) .price-card {
        background: rgba(255, 255, 255, .92);
        border-color: rgba(255, 255, 255, .72);
        box-shadow: 0 24px 70px rgba(0, 0, 0, .16);
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
        .customer-dashboard,
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
      body:not(.is-authenticated) section.login-card,
      body:not(.is-authenticated) .login-card,
      body:not(.is-authenticated) .login-card .panel-head,
      body:not(.is-authenticated) .login-card .panel-body,
      body:not(.is-authenticated) .login-card form {
        background: transparent !important;
        color: #f7fff9 !important;
      }
      body:not(.is-authenticated) section.login-card {
        background:
          radial-gradient(circle at 15% 0%, rgba(34, 197, 94, .14), transparent 220px),
          linear-gradient(135deg, rgba(2, 13, 8, .92), rgba(1, 8, 5, .78)) !important;
        border-color: rgba(134, 239, 172, .22) !important;
      }
      body:not(.is-authenticated) .login-card h2,
      body:not(.is-authenticated) .login-card p,
      body:not(.is-authenticated) .login-card label,
      body:not(.is-authenticated) .login-card .small {
        color: rgba(247, 255, 249, .88) !important;
        opacity: 1 !important;
      }
      body:not(.is-authenticated) .login-card .panel-head p,
      body:not(.is-authenticated) .login-note {
        color: rgba(236, 253, 245, .68) !important;
      }
      body:not(.is-authenticated) .login-card .auth-tabs {
        background: rgba(255, 255, 255, .06) !important;
        border-color: rgba(255, 255, 255, .12) !important;
      }
      body:not(.is-authenticated) .login-card .auth-tabs button,
      body:not(.is-authenticated) .login-card .auth-tabs button.secondary {
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        color: rgba(236, 253, 245, .78) !important;
      }
      body:not(.is-authenticated) .login-card .auth-tabs button.active {
        background: linear-gradient(135deg, #24bd76, #0da060) !important;
        color: #ffffff !important;
      }
      body:not(.is-authenticated) .login-card input {
        appearance: none !important;
        background: #071810 !important;
        background-clip: padding-box !important;
        border: 0 !important;
        border-bottom: 1px solid rgba(236, 253, 245, .46) !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        caret-color: #22c55e !important;
        color: #ffffff !important;
        min-height: 50px !important;
        padding: 0 46px 0 10px !important;
        -webkit-text-fill-color: #ffffff !important;
      }
      body:not(.is-authenticated) .login-card input::placeholder {
        color: rgba(236, 253, 245, .36) !important;
      }
      body:not(.is-authenticated) .login-card input:focus {
        border-bottom-color: #22c55e !important;
        box-shadow: 0 10px 26px -28px rgba(34, 197, 94, .9) !important;
      }
      body:not(.is-authenticated) .login-card input:-webkit-autofill,
      body:not(.is-authenticated) .login-card input:-webkit-autofill:hover,
      body:not(.is-authenticated) .login-card input:-webkit-autofill:focus,
      body:not(.is-authenticated) .login-card input:-webkit-autofill:active {
        border-bottom: 1px solid rgba(34, 197, 94, .72) !important;
        box-shadow: 0 0 0 1000px #071810 inset !important;
        caret-color: #22c55e !important;
        transition: background-color 999999s ease-in-out 0s !important;
        -webkit-box-shadow: 0 0 0 1000px #071810 inset !important;
        -webkit-text-fill-color: #ffffff !important;
      }
      body:not(.is-authenticated) .login-card button[type="submit"] {
        background: linear-gradient(135deg, #12ad69, #079253) !important;
        color: #ffffff !important;
      }
      body:not(.is-authenticated) .password-field {
        position: relative !important;
      }
      body:not(.is-authenticated) .password-field input {
        width: 100% !important;
      }
      body:not(.is-authenticated) .login-card .password-eye {
        align-items: center !important;
        background: rgba(255, 255, 255, .08) !important;
        border: 1px solid rgba(236, 253, 245, .16) !important;
        border-radius: 999px !important;
        box-shadow: none !important;
        color: #dcfce7 !important;
        cursor: pointer !important;
        display: grid !important;
        font-size: 15px !important;
        height: 34px !important;
        margin: 0 !important;
        min-height: 34px !important;
        padding: 0 !important;
        place-items: center !important;
        position: absolute !important;
        right: 8px !important;
        top: 8px !important;
        transform: none !important;
        width: 34px !important;
        z-index: 2 !important;
      }
      body:not(.is-authenticated) .login-card .password-eye:hover {
        background: rgba(34, 197, 94, .18) !important;
      }
      body:not(.is-authenticated) #dashboard,
      body:not(.is-authenticated) #adminDashboard {
        display: none !important;
      }
      body:not(.is-authenticated) #features,
      body:not(.is-authenticated) #api,
      body:not(.is-authenticated) #pricing,
      body:not(.is-authenticated) .detail-grid,
      body:not(.is-authenticated) .api-panel,
      body:not(.is-authenticated) .pricing-row,
      body:not(.is-authenticated) .public-actions {
        display: none !important;
      }
      body:not(.is-authenticated) .login-grid {
        min-height: clamp(520px, calc(100vh - 44px), 620px) !important;
      }
      body:not(.is-authenticated) .public-hero,
      body:not(.is-authenticated) .login-card {
        min-height: clamp(472px, calc(100vh - 92px), 572px) !important;
      }
      .hidden,
      #dashboard.hidden,
      #adminDashboard.hidden,
      #loginCard.hidden,
      #publicDetails.hidden {
        display: none !important;
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
