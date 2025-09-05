const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config();
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://spaceapps.com.br', // Replace with your actual domain
    'https://www.spaceapps.com.br',  // Replace with your actual domain
    // Add more domains as needed
  ],
  credentials: true
}));
app.use(express.json());

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Configuration
const MAIN_SPREADSHEET_ID = process.env.GOOGLE_SHEETS_MAIN_ID;
const BACKUP_SPREADSHEET_ID = process.env.GOOGLE_SHEETS_BACKUP_ID;
const SHEET_NAME = 'Contatos Site Space';

// Quote sheet names for A1 notation when they contain spaces or special characters.
// If the sheet name contains single quotes, escape them by doubling as required by A1 notation.
function quoteSheetName(name) {
  if (!name) return name;
  return `'${String(name).replace(/'/g, "''")}'`;
}

// Cache to avoid repeated metadata lookups per deployment runtime
const sheetExistenceCache = new Map(); // key: `${spreadsheetId}:${SHEET_NAME}` -> true

async function ensureSheetExists(spreadsheetId, sheetName) {
  const cacheKey = `${spreadsheetId}:${sheetName}`;
  if (sheetExistenceCache.has(cacheKey)) return; // already verified
  try {
    const meta = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: 'sheets(properties(title))'
    });
    const exists = meta.data.sheets?.some(s => s.properties?.title === sheetName);
    if (exists) {
      sheetExistenceCache.set(cacheKey, true);
      return;
    }
    // Create sheet if missing
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          { addSheet: { properties: { title: sheetName } } }
        ]
      }
    });
    sheetExistenceCache.set(cacheKey, true);
    console.log(`Created sheet '${sheetName}' in spreadsheet ${spreadsheetId}`);
  } catch (err) {
    console.error(`Failed ensuring sheet '${sheetName}' exists in ${spreadsheetId}:`, err?.response?.data || err.message);
    throw err;
  }
}

// Email notification setup (global, optional)
let transporter = null;
if (process.env.EMAIL_NOTIFICATIONS_ENABLED === 'true') {
  try {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      } : undefined,
    });
    // Light diagnostics (won't expose secrets)
    transporter.verify().then(() => {
      console.log('📧 Email transporter verified (host=%s port=%s secure=%s user=%s)',
        process.env.SMTP_HOST,
        process.env.SMTP_PORT || '587',
        process.env.SMTP_SECURE === 'true',
        process.env.SMTP_USER ? maskMiddle(process.env.SMTP_USER) : 'none');
    }).catch(err => {
      console.warn('⚠️  Email transporter verification failed:', err.message);
    });
  } catch (err) {
    console.error('Failed to initialize mail transporter:', err);
  }
}

function maskMiddle(str) {
  if (!str) return str;
  if (str.length <= 5) return '***';
  return str.slice(0,2) + '***' + str.slice(-2);
}

async function sendLeadEmail(data) {
  if (!transporter) return { skipped: true };
  if (!process.env.EMAIL_TO || !process.env.EMAIL_FROM) {
    console.warn('Email notification skipped: EMAIL_TO or EMAIL_FROM missing');
    return { skipped: true };
  }
  const subject = `Novo lead (${data.whatsapp}) - SpaceApps`;
  const text = `Novo lead capturado\n\nWhatsApp: ${data.whatsapp}\nHorário Preferido: ${data.preferredTime}\nData/Hora: ${data.timestamp}`;
  const html = `<h2>Novo lead capturado</h2>
  <ul>
    <li><strong>WhatsApp:</strong> ${data.whatsapp}</li>
    <li><strong>Horário Preferido:</strong> ${data.preferredTime}</li>
    <li><strong>Data/Hora:</strong> ${data.timestamp}</li>
  </ul>`;
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject,
      text,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending lead email:', error);
    return { success: false, error: error.message };
  }
}

// Helper Functions
async function appendToSheet(spreadsheetId, data) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${quoteSheetName(SHEET_NAME)}!A:D`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [
          [
            data.timestamp,
            data.whatsapp,
            data.preferredTime,
            'Novo'
          ]
        ],
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error appending to sheet:', error);
    throw error;
  }
}

async function createHeadersIfNeeded(spreadsheetId) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${quoteSheetName(SHEET_NAME)}!A1:D1`,
    });

    if (!response.data.values || response.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${SHEET_NAME}!A1:D1`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            ['Data/Hora', 'WhatsApp', 'Horário Preferido', 'Status']
          ],
        },
      });
    }
  } catch (error) {
    console.error('Error creating headers:', error);
  }
}

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'SpaceApps Contact API is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      'GET /': 'API status',
      'POST /api/contact': 'Submit contact form',
      'GET /health': 'Health check'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { whatsapp, preferredTime } = req.body;

    // Validate input
    if (!whatsapp || !preferredTime) {
      return res.status(400).json({
        error: 'WhatsApp e horário preferido são obrigatórios'
      });
    }

    // Validate WhatsApp format (accepts international formats)
    const digitsOnly = whatsapp.trim().replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      return res.status(400).json({
        error: 'Número de WhatsApp inválido. Deve ter entre 10 e 15 dígitos.'
      });
    }

    // Check environment variables
    if (!MAIN_SPREADSHEET_ID || !BACKUP_SPREADSHEET_ID) {
      return res.status(500).json({
        error: 'Configuração do Google Sheets não encontrada'
      });
    }

    // Prepare data
    const contactData = {
      whatsapp: whatsapp.trim(),
      preferredTime: preferredTime.trim(),
      timestamp: new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    // Ensure sheet exists then create headers if needed
    await Promise.all([
      ensureSheetExists(MAIN_SPREADSHEET_ID, SHEET_NAME),
      ensureSheetExists(BACKUP_SPREADSHEET_ID, SHEET_NAME)
    ]);
    await Promise.all([
      createHeadersIfNeeded(MAIN_SPREADSHEET_ID),
      createHeadersIfNeeded(BACKUP_SPREADSHEET_ID)
    ]);

    // Append to both sheets
    const [mainResult, backupResult] = await Promise.all([
      appendToSheet(MAIN_SPREADSHEET_ID, contactData),
      appendToSheet(BACKUP_SPREADSHEET_ID, contactData)
    ]);

    // Optional email notification
    let emailResult = null;
    if (process.env.EMAIL_NOTIFICATIONS_ENABLED === 'true') {
      emailResult = await sendLeadEmail(contactData);
    }

    res.json({
      success: true,
      message: 'Contato salvo com sucesso! Nossa equipe entrará em contato em breve.',
      data: {
        timestamp: contactData.timestamp,
        mainSheet: mainResult.updates?.updatedRows || 1,
        backupSheet: backupResult.updates?.updatedRows || 1,
        email: emailResult ? (emailResult.success ? 'sent' : (emailResult.skipped ? 'skipped' : 'failed')) : 'disabled'
      }
    });

  } catch (error) {
    console.error('Error in contact API:', error);
    
    res.status(500).json({
      error: 'Erro interno do servidor. Tente novamente em alguns minutos.',
      details: process.env.NODE_ENV === 'development' ? 
        (error instanceof Error ? error.message : 'Unknown error') : undefined
    });
  }
});

// Simple protected email test route - requires EMAIL_TEST_KEY env and matching query param key
app.post('/api/email-test', async (req, res) => {
  try {
    if (process.env.EMAIL_TEST_KEY && req.query.key !== process.env.EMAIL_TEST_KEY) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    if (!transporter) return res.status(400).json({ error: 'Email disabled' });
    const to = process.env.EMAIL_TO || process.env.EMAIL_FROM;
    if (!to) return res.status(400).json({ error: 'EMAIL_TO/EMAIL_FROM missing' });
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || to,
      to,
      subject: 'SpaceApps test email',
      text: 'Email test OK',
    });
    res.json({ success: true, id: info.messageId });
  } catch (e) {
    console.error('Email test failed:', e);
    res.status(500).json({ error: e.message });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint não encontrado',
    availableEndpoints: ['/', '/health', '/api/contact']
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Erro interno do servidor',
    details: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SpaceApps API Server running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
