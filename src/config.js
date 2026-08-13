const fs = require('node:fs');
const path = require('node:path');

function loadEnv(filePath = '.env') {
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    return;
  }

  const lines = fs.readFileSync(absolutePath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) {
      continue;
    }

    const [key, ...parts] = trimmed.split('=');
    if (!process.env[key]) {
      process.env[key] = parts.join('=').replace(/^["']|["']$/g, '');
    }
  }
}

loadEnv();

module.exports = {
  loadEnv,
  config: {
    port: Number(process.env.PORT || 4000),
    baseUrl: process.env.BASE_URL || 'http://localhost:4000',
    adminUsername: process.env.ADMIN_USERNAME || '',
    adminPassword: process.env.ADMIN_PASSWORD || '',
    trialDays: Number(process.env.TRIAL_DAYS || 7),
    queueIntervalMs: Number(process.env.QUEUE_INTERVAL_MS || 2000),
    payment: {
      planName: process.env.PAYMENT_PLAN_NAME || 'Business Plan',
      monthlyPrice: process.env.PAYMENT_MONTHLY_PRICE || 'Rs. 3499',
      upiId: process.env.PAYMENT_UPI_ID || 'your-upi-id@bank',
      salesEmail: process.env.PAYMENT_SALES_EMAIL || 'Aworking822@gmail.com'
    }
  }
};
