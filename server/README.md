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
