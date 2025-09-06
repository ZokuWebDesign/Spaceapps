const express = require('express');
const cors = require('cors');
const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

// Express setup
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Mailgun setup
let mg = null;
if (process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
  const mailgun = new Mailgun(formData);
  mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
    url: process.env.MAILGUN_BASE_URL || 'https://api.mailgun.net'
  });
  console.log('✅ Mailgun client initialized');
} else {
  console.log('⚠️ Mailgun not configured (missing MAILGUN_API_KEY or MAILGUN_DOMAIN)');
}

// --- Google Sheets Configuration -----------------------------------------------
// This matches your working Google Sheets setup
const SHEET_NAME = 'Contatos Site Space';
const auth = new GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

function quoteSheetName(name) {
  if (name.includes(' ') || name.includes('!') || name.includes("'")) {
    return `'${name.replace(/'/g, "''")}'`;
  }
  return name;
}

async function ensureSheetExists(spreadsheetId, sheetName) {
  try {
    const metadata = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetExists = metadata.data.sheets?.some(sheet => sheet.properties?.title === sheetName);
    
    if (!sheetExists) {
      console.log(`Creating sheet: ${sheetName}`);
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            addSheet: {
              properties: { title: sheetName }
            }
          }]
        }
      });
      console.log(`✅ Sheet '${sheetName}' created`);
    }
  } catch (err) {
    console.error(`Failed ensuring sheet '${sheetName}' exists in ${spreadsheetId}:`, err?.response?.data || err.message);
    throw err;
  }
}

async function createHeadersIfNeeded(spreadsheetId) {
  try {
    const range = `${quoteSheetName(SHEET_NAME)}!A1:D1`;
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    
    const values = response.data.values;
    if (!values || values.length === 0 || values[0].length === 0) {
      console.log('Creating headers in spreadsheet:', spreadsheetId);
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        requestBody: {
          values: [['Timestamp', 'WhatsApp', 'Horário Preferido', 'Source']]
        }
      });
      console.log('✅ Headers created');
    }
  } catch (err) {
    console.error('Failed to create headers:', err?.response?.data || err.message);
    throw err;
  }
}

async function appendToSheet(spreadsheetId, data) {
  try {
    await ensureSheetExists(spreadsheetId, SHEET_NAME);
    await createHeadersIfNeeded(spreadsheetId);
    
    const range = `${quoteSheetName(SHEET_NAME)}!A:D`;
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[data.timestamp, data.whatsapp, data.preferredTime, data.source]]
      }
    });
    console.log('✅ Data appended to Google Sheets');
  } catch (err) {
    console.error('Failed to append to sheet:', err?.response?.data || err.message);
    throw err;
  }
}

// --- Email (Mailgun) ---------------------------------------------------------
// Env required for email notifications:
// - EMAIL_NOTIFICATIONS_ENABLED = 'true' | 'false'
// - EMAIL_TO (comma-separated allowed)
// - MAILGUN_API_KEY
// - MAILGUN_DOMAIN (must match the From: domain)
// Optional:
// - MAILGUN_BASE_URL (e.g., https://api.eu.mailgun.net)

async function sendLeadEmail(data) {
  if (process.env.EMAIL_NOTIFICATIONS_ENABLED !== 'true') {
    return { skipped: true, reason: 'disabled' };
  }
  if (!mg) return { success: false, error: 'Mailgun not configured' };
  if (!process.env.MAILGUN_DOMAIN) return { success: false, error: 'MAILGUN_DOMAIN missing' };
  if (!process.env.EMAIL_TO) return { success: false, error: 'EMAIL_TO missing' };

  const recipients = String(process.env.EMAIL_TO)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const subject = `Novo lead (${data.whatsapp}) - SpaceApps`;
  const text = `Novo lead capturado via https://spaceapps.com.br\n\n` +
               `WhatsApp: ${data.whatsapp}\n` +
               `Horário Preferido: ${data.preferredTime}\n` +
               `Data/Hora: ${data.timestamp}`;
  const html = `
    <h2>Novo lead capturado via SpaceApps</h2>
    <p><strong>Website:</strong> https://spaceapps.com.br</p>
    <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
    <p><strong>Horário Preferido:</strong> ${data.preferredTime}</p>
    <p><strong>Data/Hora:</strong> ${data.timestamp}</p>
  `;

  const from = `no-reply@${process.env.MAILGUN_DOMAIN}`;

  try {
    const resp = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from,
      to: recipients,
      subject,
      text,
      html,
    });
    // Mailgun returns e.g. { id: '<...@domain>', message: 'Queued. Thank you.' }
    return { success: true, id: resp.id, message: resp.message };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// --- Routes -----------------------------------------------------------------

app.post('/contact', async (req, res) => {
  try {
    const { whatsapp, preferredTime } = req.body;
    
    if (!whatsapp || !preferredTime) {
      return res.status(400).json({ 
        success: false, 
        error: 'WhatsApp and preferred time are required' 
      });
    }

    const data = {
      timestamp: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      whatsapp,
      preferredTime,
      source: 'spaceapps.com.br'
    };

    // Save to Google Sheets
    const spreadsheetResults = [];
    const spreadsheetIds = [
      process.env.GOOGLE_SHEETS_MAIN_ID,
      process.env.GOOGLE_SHEETS_BACKUP_ID
    ].filter(Boolean);

    for (const spreadsheetId of spreadsheetIds) {
      try {
        await appendToSheet(spreadsheetId, data);
        spreadsheetResults.push({ spreadsheetId, success: true });
      } catch (err) {
        console.error(`Failed to save to spreadsheet ${spreadsheetId}:`, err.message);
        spreadsheetResults.push({ 
          spreadsheetId, 
          success: false, 
          error: err.message 
        });
      }
    }

    // Send email notification
    const emailResult = await sendLeadEmail(data);

    res.json({
      success: true,
      message: 'Lead captured successfully',
      data: {
        timestamp: data.timestamp,
        whatsapp: data.whatsapp,
        preferredTime: data.preferredTime
      },
      spreadsheets: spreadsheetResults,
      email: emailResult
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Test endpoint for email
app.post('/email-test', async (req, res) => {
  try {
    if (process.env.EMAIL_NOTIFICATIONS_ENABLED !== 'true') {
      return res.json({ 
        success: false, 
        error: 'Email notifications disabled',
        config: { EMAIL_NOTIFICATIONS_ENABLED: process.env.EMAIL_NOTIFICATIONS_ENABLED }
      });
    }

    const testData = {
      whatsapp: '+55 11 99999-9999',
      preferredTime: 'Manhã (08:00 - 12:00)',
      timestamp: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    };

    const result = await sendLeadEmail(testData);
    
    res.json({
      success: result.success,
      method: 'mailgun',
      result,
      config: {
        MAILGUN_API_KEY: process.env.MAILGUN_API_KEY ? '***configured***' : 'missing',
        MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN || 'missing',
        EMAIL_TO: process.env.EMAIL_TO || 'missing'
      }
    });

  } catch (error) {
    console.error('Email test error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    services: {
      mailgun: mg ? 'configured' : 'not configured',
      googleSheets: process.env.GOOGLE_SHEETS_CLIENT_EMAIL ? 'configured' : 'not configured'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email notifications: ${process.env.EMAIL_NOTIFICATIONS_ENABLED === 'true' ? 'enabled' : 'disabled'}`);
  console.log(`📊 Google Sheets: ${process.env.GOOGLE_SHEETS_CLIENT_EMAIL ? 'configured' : 'not configured'}`);
  console.log(`📬 Mailgun: ${mg ? 'configured' : 'not configured'}`);
});
