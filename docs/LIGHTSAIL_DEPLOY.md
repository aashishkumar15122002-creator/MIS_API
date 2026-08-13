# Deploy MIS_api On AWS Lightsail

Use this after creating an Ubuntu Lightsail instance.

## 1. Use A Domain With HTTPS

Do not give customers a raw URL like:

```text
http://YOUR_SERVER_IP:4000
```

Browsers show `Not secure` for that URL, and customers should not enter login details there.

Use a real domain or subdomain, for example:

```text
https://app.misapi.com
```

Point the domain DNS `A` record to your Lightsail public IP.

In Lightsail:

```text
mis-api-server > Networking > IPv4 Firewall
```

Open only:

```text
HTTP 80
HTTPS 443
```

Do not expose port `4000` publicly for customers. Nginx will proxy HTTPS traffic to the local Node app on port `4000`.

## 2. Run Installer With Domain

Open browser SSH and run:

```bash
curl -fsSL https://raw.githubusercontent.com/aashishkumar15122002-creator/MIS_API/main/scripts/lightsail-setup.sh | \
DOMAIN_NAME=app.misapi.com LETSENCRYPT_EMAIL=you@example.com bash
```

Replace `app.misapi.com` and `you@example.com`.

## 3. Edit Payment Details

```bash
cd ~/MIS_API
nano .env
pm2 restart mis-api
```

Make sure `BASE_URL` uses HTTPS:

```env
BASE_URL=https://app.misapi.com
```

Make sure admin login credentials exist and are not the placeholder values:

```env
ADMIN_USERNAME=admin@example.com
ADMIN_PASSWORD=change_this_admin_password
```

## 4. Admin UI

Open:

```text
https://app.misapi.com/
```

Login with the admin credentials to create a customer login, API key, phone ID, connect token, and link-device URL. Customers use the same login page but only see their own phones, queue, and logs.

## 5. Create Customer From CLI

```bash
cd ~/MIS_API
npm run create-customer -- "Customer Company"
```

## 6. Create Phone From CLI

```bash
curl -X POST "https://app.misapi.com/v1/phones" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer CUSTOMER_API_KEY" \
  -d '{"label":"Main WhatsApp"}'
```

Open:

```text
https://app.misapi.com/connect/PHONE_ID?token=CONNECT_TOKEN
```

Scan QR from WhatsApp Linked Devices.

## Emergency Test URL

For your own testing only, you can still use:

```text
http://YOUR_SERVER_IP:4000
```

Never send this raw IP URL to customers.
