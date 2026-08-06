# Production Deployment

## Architecture

The site ships as **two independently deployed pieces**:

| Piece | What it is | Where it runs |
|---|---|---|
| **Front-end** | Next.js 14 App Router, statically exported (`output: 'export'`) to `dist/` | Any static host — production served from cPanel/Apache |
| **Contact API** | Standalone Express service in [`server/`](server/) | Render |

**Why they are separate:** `next.config.js` sets `output: 'export'`, which emits a fully static
site. Next.js API routes are **not** included in a static export, so form handling cannot live in
`app/api/`. All submissions are posted to the Express service instead.

> `app/api/contact/route.ts` is an empty placeholder left over from an earlier approach.
> It is not built, not served, and not used. The live handler is `server/server.js`.

---

## Front-end

### Build

```bash
npm install
npm run build     # Linux/WSL (default) → dist/
```

On Windows PowerShell, use the Windows-specific build command:

```powershell
npm run build:windows
```

### Deploy

Upload the contents of `dist/` to the web root. The export is plain HTML/CSS/JS —
no Node runtime is required on the web host.

`trailingSlash: true` is set so directory-style URLs (`/termos/`) resolve correctly on
Apache and other static servers.

### Environment

```bash
# .env.local — baked in at build time, so rebuild after changing it
NEXT_PUBLIC_API_URL=https://api-site-space.onrender.com
```

If unset, the client falls back to the hard-coded Render URL in
`components/sections/Contact.tsx`.

---

## Contact API

Deployed from [`server/`](server/) as its own Render Web Service.

| Setting | Value |
|---|---|
| Root directory | `server` |
| Build command | `npm install` |
| Start command | `npm start` |
| Node | ≥ 18 |

### Environment

```bash
# Google Sheets (service account — see GOOGLE_SHEETS_SETUP.md)
GOOGLE_SHEETS_CLIENT_EMAIL=<service-account>@<project>.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
GOOGLE_SHEETS_MAIN_ID=<spreadsheet id>
GOOGLE_SHEETS_BACKUP_ID=<spreadsheet id>

# Mailgun notifications
EMAIL_NOTIFICATIONS_ENABLED=true
MAILGUN_API_KEY=<key>
MAILGUN_DOMAIN=<domain>                     # must match the From: domain
MAILGUN_BASE_URL=https://api.mailgun.net    # optional; api.eu.mailgun.net for EU
EMAIL_TO=a@example.com,b@example.com        # comma-separated

PORT=10000
```

Each submission is written to **both** spreadsheets. The writes are independent — if one
spreadsheet fails, the other still succeeds and the response reports per-sheet status.
Missing sheet tabs and header rows are created automatically on first write.

### Endpoints

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/contact` | Capture a lead — requires `whatsapp` and `preferredTime` |
| `POST` | `/email-test` | Send a test notification |
| `GET` | `/health` | Report status and whether Mailgun / Sheets are configured |

### Verify a deploy

```bash
curl https://api-site-space.onrender.com/health
# {"status":"ok","services":{"mailgun":"configured","googleSheets":"configured"}}
```

> On Render's free tier the service sleeps after ~15 minutes idle, so the first request
> after a quiet period can take several seconds to respond.
