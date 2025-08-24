# Production Deployment Guide

## 🚀 Static Site + Render API Deployment

Since you're using `output: 'export'` for static site generation, your Next.js API routes won't work in production. Here's how to deploy properly:

### 📋 **Architecture:**
- **Frontend (Static)**: Netlify/Vercel/GitHub Pages (Free)
- **Backend (API)**: Render.com (Free tier available)

---

## 🎯 **Step 1: Create Separate API Project for Render**

Create a standalone Express.js API that you can deploy to Render:

### File Structure:
```
server/
├── package.json
├── server.js
├── .env
└── README.md
```

---

## 🛠️ **Step 2: Render Deployment**

### 2.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. It's free for the first 750 hours/month

### 2.2 Deploy API to Render
1. Push your API code to a GitHub repo
2. Connect the repo to Render
3. Set environment variables in Render dashboard
4. Your API will be available at: `https://your-app-name.onrender.com`

---

## 🌐 **Step 3: Environment Variables for Production**

### For Static Site (.env.local):
```bash
# Production API URL (will be your Render URL)
NEXT_PUBLIC_API_URL=https://your-api-name.onrender.com

# Development
# NEXT_PUBLIC_API_URL=http://localhost:3000
```

### For Render API (.env in Render dashboard):
```bash
GOOGLE_SHEETS_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----"
GOOGLE_SHEETS_MAIN_ID=your_main_spreadsheet_id_here
GOOGLE_SHEETS_BACKUP_ID=your_backup_spreadsheet_id_here
PORT=10000
```

---

## 🚀 **Step 4: Static Site Deployment Options**

### Option A: Netlify (Recommended)
1. Build: `npm run build`
2. Drag & drop `dist` folder to Netlify
3. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-api.onrender.com`

### Option B: Vercel
1. Connect GitHub repo
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable

### Option C: GitHub Pages
1. Upload `dist` folder contents
2. Use GitHub Actions for auto-deployment

---

## 💰 **Cost Breakdown:**
- **Render API**: Free (750 hours/month, sleeps after 15min inactivity)
- **Static Hosting**: Free on most platforms
- **Total**: $0/month

---

## ⚡ **Alternative: Serverless Functions**

If you want everything in one place:

### Netlify Functions:
- Deploy static site to Netlify
- Convert API route to Netlify Function
- All in one place, still free

### Vercel Functions:
- Deploy to Vercel
- Keep API routes (they become serverless functions)
- Simpler setup, but tied to Vercel

---

## 🔧 **Quick Start Commands:**

```bash
# Build static site
npm run build

# The dist folder contains your static site
# Deploy this folder to any static hosting
```

Choose your preferred deployment method and I'll help you set it up!
