# 📊 Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for your contact form with both main and backup spreadsheets.

## 🔑 Step 1: Create Google Service Account

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create/Select Project**
   - Create a new project or select existing one
   - Name it something like "SpaceApps Contact Form"

3. **Enable Google Sheets API**
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"

4. **Create Service Account**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Name: `spaceapps-contact-service`
   - Description: `Service account for contact form integration`
   - Click "Create and Continue"

5. **Download Service Account Key**
   - In the service account list, click on your newly created account
   - Go to "Keys" tab
   - Click "Add Key" > "Create New Key"
   - Choose "JSON" format
   - Download the file (keep it secure!)

## 📈 Step 2: Create Google Spreadsheets

1. **Create Main Spreadsheet**
   - Go to: https://sheets.google.com/
   - Create a new spreadsheet
   - Name it: "SpaceApps Contacts - Main"
   - Copy the spreadsheet ID from URL (the long string between `/d/` and `/edit`)
   - Example URL: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
   - ID would be: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

2. **Create Backup Spreadsheet**
   - Create another spreadsheet
   - Name it: "SpaceApps Contacts - Backup"
   - Copy its ID as well

3. **Share Spreadsheets with Service Account**
   - Open each spreadsheet
   - Click "Share" button (top right)
   - Add the service account email (from your JSON file)
   - Give "Editor" permissions
   - **Important**: The service account email looks like: `spaceapps-contact-service@your-project-name.iam.gserviceaccount.com`

## ⚙️ Step 3: Configure Environment Variables

1. **Create `.env.local` file** in your project root:

```bash
# Copy from .env.example and fill in your values
cp .env.example .env.local
```

2. **Fill in the environment variables**:

```env
# From your service account JSON file
GOOGLE_SHEETS_CLIENT_EMAIL=spaceapps-contact-service@your-project.iam.gserviceaccount.com

# From your service account JSON file (keep the quotes!)
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
-----END PRIVATE KEY-----"

# Your main spreadsheet ID
GOOGLE_SHEETS_MAIN_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms

# Your backup spreadsheet ID  
GOOGLE_SHEETS_BACKUP_ID=1234567890abcdefghijklmnopqrstuvwxyz1234567890

# For development
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🧪 Step 4: Test the Integration

1. **Start your development server**:
```bash
npm run dev
```

2. **Test the API endpoint**:
   - Visit: http://localhost:3000/api/contact
   - You should see: `{"message":"Contact API is working"}`

3. **Test the form**:
   - Go to your contact form
   - Fill in a test WhatsApp number: `11 99999-9999`
   - Fill in a test time: `14h`
   - Click "ENVIAR"
   - Check your Google Sheets - you should see the data appear!

## 📋 Expected Google Sheets Structure

Your sheets will automatically get these columns:
- **A**: Data/Hora (Timestamp)
- **B**: WhatsApp (Phone number)
- **C**: Horário Preferido (Preferred time)
- **D**: Status (Default: "Novo")

## 🔍 Troubleshooting

### Common Issues:

1. **"Configuração do Google Sheets não encontrada"**
   - Check your `.env.local` file exists
   - Verify all environment variables are set
   - Restart your development server

2. **"403 Forbidden" or "Permission denied"**
   - Make sure you shared both spreadsheets with the service account email
   - Verify the service account has "Editor" permissions

3. **"Invalid private key"**
   - Check that your private key includes the full header and footer
   - Make sure there are no extra spaces or line breaks
   - Keep the quotes around the private key

4. **"Spreadsheet not found"**
   - Verify the spreadsheet IDs are correct
   - Make sure the spreadsheets are not deleted

### Getting Help:

If you encounter issues:
1. Check the browser console for error messages
2. Check the terminal/console where your Next.js app is running
3. Verify your Google Cloud Console setup
4. Test with the API endpoint directly first

## 🚀 Production Deployment

When deploying to production:
1. Add the same environment variables to your hosting platform
2. Update `NEXT_PUBLIC_API_URL` to your production domain
3. Keep your service account JSON file secure (never commit it to Git)

## 🎉 Success!

Once everything is set up, your contact form will:
- ✅ Validate user input
- ✅ Save to both main and backup Google Sheets
- ✅ Show success/error messages
- ✅ Include timestamps in Brazilian timezone
- ✅ Handle errors gracefully
