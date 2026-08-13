# MIS_api QR WhatsApp API MVP

This is the free-first MIS_api prototype.

It lets a company:

1. Start a 7-day trial.
2. Add a WhatsApp phone.
3. Open a QR connect page.
4. Scan WhatsApp Web QR.
5. Send WhatsApp messages through your API.

## Important

This uses Baileys-based WhatsApp Web protocol automation. It is not the official Meta WhatsApp Cloud API. It can work well for the first MIS_api MVP, but sessions can disconnect and numbers can be limited or banned if customers spam.

## Free Setup

Install dependencies:

```bash
npm install
```

Create `.env`:

```bash
copy .env.example .env
```

Start server:

```bash
npm start
```

Create a trial company:

```bash
npm run create-customer -- "Demo Company"
```

The script prints:

- company ID
- API key
- connect token

Add a phone:

```bash
curl -X POST "http://localhost:4000/v1/phones" ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer CUSTOMER_API_KEY" ^
  -d "{\"label\":\"Main WhatsApp\"}"
```

Open the returned `connectUrl` in your browser and scan the QR.

Send message:

```bash
curl -X POST "http://localhost:4000/v1/messages/send" ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer CUSTOMER_API_KEY" ^
  -d "{\"phoneId\":\"PHONE_ID\",\"to\":\"91XXXXXXXXXX\",\"message\":\"Hello from my QR API\"}"
```

Messages sent through this endpoint are queued first and released one by one. The default release delay is 2 seconds. Change it with:

```env
QUEUE_INTERVAL_MS=2000
```

## Give To First User

Follow:

```text
../docs/FIRST_USER_ONBOARDING.md
```

## API

## Admin UI

Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env`, restart the app, then open the login screen:

```text
http://YOUR_SERVER:4000/
```

The same login screen sends the owner to the admin UI and customers to their own dashboard. The admin UI creates a customer login, API key, phone ID, connect token, and link-device URL.

### `GET /health`

Checks server status.

### `POST /v1/phones`

Creates a WhatsApp phone session.

```json
{
  "label": "Main WhatsApp"
}
```

### `GET /connect/:phoneId?token=CONNECT_TOKEN`

Shows the QR page for that phone.

### `GET /v1/phones/:phoneId/status`

Returns phone status and QR image data URL when available.

### `POST /v1/messages/send`

Queues a text or file message for sending.

```json
{
  "phoneId": "PHONE_ID",
  "to": "91XXXXXXXXXX",
  "message": "Hello"
}
```

File message:

```json
{
  "phoneId": "PHONE_ID",
  "to": "91XXXXXXXXXX",
  "message": "Optional caption",
  "file": {
    "data": "BASE64_FILE_DATA",
    "mimetype": "application/pdf",
    "filename": "invoice.pdf"
  }
}
```

Response:

```json
{
  "ok": true,
  "queued": true,
  "queueId": "que_xxxxx",
  "status": "queued"
}
```

## Free Hosting Reality

Run locally first. Later, use a cheap VPS because WhatsApp Web needs persistent browser session files. Free serverless hosting is usually bad for this because sessions disappear.
