# SpaceApps API Server

Standalone Express.js API server for the SpaceApps contact form, designed to be deployed to Render.com (or similar platforms).

## 🚀 Quick Deploy to Render

1. **Push this folder to a GitHub repository**
2. **Connect to Render**: Sign up at [render.com](https://render.com) and connect your GitHub
3. **Create Web Service**: 
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node.js
4. **Set Environment Variables** in Render dashboard (from `.env.example`)
5. **Deploy**: Your API will be available at `https://your-app-name.onrender.com`

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your Google Sheets credentials

# Start server
npm start

# Server will run on http://localhost:10000
```

## 📋 API Endpoints

- `GET /` - API status and information
- `GET /health` - Health check
- `POST /api/contact` - Submit contact form data

### POST /api/contact

**Request Body:**
```json
{
  "whatsapp": "11 99999-9999",
  "preferredTime": "14h"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Contato salvo com sucesso! Nossa equipe entrará em contato em breve.",
  "data": {
    "timestamp": "24/08/2025 14:30:45",
    "mainSheet": 1,
    "backupSheet": 1
  }
}
```

## 🔧 Environment Variables

Required environment variables:

- `GOOGLE_SHEETS_CLIENT_EMAIL` - Service account email
- `GOOGLE_SHEETS_PRIVATE_KEY` - Service account private key
- `GOOGLE_SHEETS_MAIN_ID` - Main spreadsheet ID
- `GOOGLE_SHEETS_BACKUP_ID` - Backup spreadsheet ID
- `PORT` - Server port (default: 10000)

## 🌐 CORS Configuration

The server is configured to accept requests from:
- `http://localhost:3000` (development)
- Your production static site URLs

Update the CORS configuration in `server.js` with your actual domain names.

## 📊 Google Sheets Setup

This API requires the same Google Sheets setup as described in the main project's `GOOGLE_SHEETS_SETUP.md` file.

## 🎯 Production Use

Once deployed to Render, update your static site's environment variable:

```bash
NEXT_PUBLIC_API_URL=https://your-api-name.onrender.com
```

## 💰 Cost

- **Render Free Tier**: 750 hours/month (sleeps after 15 minutes of inactivity)
- **Wake-up time**: ~30 seconds for first request after sleep
- **Perfect for**: Contact forms, low-traffic APIs

## 🔗 Integration

This API is designed to work with the SpaceApps static site. The frontend will make requests to `/api/contact` endpoint.

---

Step‑by‑step guide to set up .env.production.

1. Duplicate example  
   Copy .env.production to `server/.env` (the runtime file normally loaded by `dotenv`). Keep .env.production as a template if you wish.

2. Create (or choose) a Google Cloud project  
   In Google Cloud Console: create a project (or reuse an existing one).

3. Enable Google Sheets API  
   APIs & Services > Library > search “Google Sheets API” > Enable.

4. Create a Service Account  
   IAM & Admin > Service Accounts > Create.  
   Name it (e.g., sheets-writer). Role: you can skip broad roles (not strictly needed for Sheets) or give a minimal role like “Editor” if required for other resources (Sheets access itself is controlled by sharing).

5. Create and download JSON key  
   Inside the service account > Keys > Add Key > Create new key (JSON). Download the file.

6. Extract needed fields from JSON  
   From the downloaded JSON:  
   - client_email → use as `GOOGLE_SHEETS_CLIENT_EMAIL`  
   - private_key → use as `GOOGLE_SHEETS_PRIVATE_KEY`

7. Create (or identify) your spreadsheets  
   In Google Sheets create two sheets: main and backup (or reuse existing). Add (or rename) a worksheet/tab named exactly `Contatos` (case must match).  
   Open each sheet in the browser; the URL looks like:  
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit#...  
   Copy the ID part for each:  
   - main → `GOOGLE_SHEETS_MAIN_ID`  
   - backup → `GOOGLE_SHEETS_BACKUP_ID`

8. Share both spreadsheets with the service account  
   In each sheet: Share > add the service account email (`client_email`) with Editor permission.

9. Format the private key for the `.env` file  
   Option A (recommended): Keep original multiline form without wrapping quotes:  
   GOOGLE_SHEETS_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n... (Not recommended—parsing can break if raw newlines)  
   Option B (safer for `.env` single line): Replace real newlines with literal \n and wrap in double quotes (matches your template):  
   GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nABCDEF...\n-----END PRIVATE KEY-----\n"  
   Make sure every original newline is replaced by \n. Keep the surrounding quotes.

10. Fill the `.env` values (example skeleton)  
   GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com  
   GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...escaped...\n-----END PRIVATE KEY-----\n"  
   GOOGLE_SHEETS_MAIN_ID=your_main_sheet_id  
   GOOGLE_SHEETS_BACKUP_ID=your_backup_sheet_id  
   PORT=10000  
   NODE_ENV=production

11. Security  
   - Do NOT commit `.env` (ensure `server/.gitignore` contains `.env`).  
   - Never paste the raw private key in logs.  
   - Rotate the key if accidentally exposed.

12. Local production test (Windows PowerShell)  
   From server folder (after `npm install` if needed):  
   $env:NODE_ENV="production"; node server.js  
   Or rely on `.env` with `dotenv` (already in code). Check console output shows the expected environment.

13. Health check  
   In a second PowerShell:  
   curl http://localhost:10000/health  
   Should return JSON with status healthy.

14. Test contact endpoint  
   curl -X POST http://localhost:10000/api/contact -H "Content-Type: application/json" -d "{`"whatsapp`":`"(55) 1199999-8888`",`"preferredTime`":`"Manhã`"}"  
   Expect success JSON. Verify the new row appears in both sheets under tab `Contatos`. Headers auto-create if missing.

15. Deploy considerations (Render / other)  
   - In your hosting dashboard, add each variable exactly as in `.env` (do not include quotes around the whole key unless you used the escaped \n version).  
   - If host UI supports multiline secrets, you can paste the raw private key (no quotes, keep actual newlines) and in code remove the `.replace(/\\n/g, '\n')` (optional optimization). Otherwise keep escaped form.

16. Common pitfalls  
   - 403 / PERMISSION_DENIED: You forgot to share sheet with service account email.  
   - Invalid private key error: Missing quotes or lost \n escapes.  
   - Empty rows only: Wrong sheet tab name (must match `Contatos`).  
   - Headers not appearing: Different sheet/tab or insufficient privileges.

17. Final verification checklist  
   - Service account email present and shared.  
   - Two sheet IDs correct.  
   - Private key escaped properly.  
   - Endpoint POST returns success.  
   - Rows appear in both main and backup.