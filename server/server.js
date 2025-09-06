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
let cleanedSMTPUser = null; // Store cleaned user globally
let cleanedSMTPPass = null; // Store cleaned pass globally

if (process.env.EMAIL_NOTIFICATIONS_ENABLED === 'true') {
  try {
    // Validar se temos as credenciais necessárias
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error('Credenciais de email não configuradas');
    }

    // Clean and validate credentials globally
    cleanedSMTPUser = process.env.SMTP_USER?.trim().replace(/['"]/g, '');
    cleanedSMTPPass = process.env.SMTP_PASS?.trim().replace(/['"]/g, '');
    
    // Log credentials for debugging (mask password properly)
    console.log('🔧 SMTP Debug Info:', {
      host: process.env.SMTP_HOST || 'smtp.titan.email',
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      user: cleanedSMTPUser,
      userLength: cleanedSMTPUser?.length,
      passLength: cleanedSMTPPass?.length,
      passFirst3: cleanedSMTPPass?.slice(0, 3),
      passLast3: cleanedSMTPPass?.slice(-3),
      passHex: Buffer.from(cleanedSMTPPass || '').toString('hex').slice(0, 12) + '...',
      rawPassLength: process.env.SMTP_PASS?.length,
      rawPassFirst5: process.env.SMTP_PASS?.slice(0, 5)
    });

    // Validate password doesn't contain comment patterns
    if (cleanedSMTPPass?.includes('/*') || cleanedSMTPPass?.includes('*/') || cleanedSMTPPass?.includes('secret')) {
      throw new Error('Password appears to contain placeholder text. Check SMTP_PASS environment variable.');
    }

    // Log the actual values being used for auth (debugging)
    console.log('🔧 Auth values:', {
      userForAuth: cleanedSMTPUser,
      passForAuth: cleanedSMTPPass?.slice(0, 3) + '***' + cleanedSMTPPass?.slice(-2),
      passBase64Preview: Buffer.from(cleanedSMTPPass || '').toString('base64').slice(0, 8) + '...'
    });

    // Criar o transporter com TLS estável (evitar opções conflitantes)
    const secure = process.env.SMTP_SECURE === 'true';
    const port = parseInt(process.env.SMTP_PORT, 10) || (secure ? 465 : 587);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.titan.email',
      port,
      secure, // true para 465 (SSL), false para 587 (STARTTLS)
      requireTLS: !secure, // apenas exigir STARTTLS quando não for SSL direto
      tls: {
        rejectUnauthorized: false,
        // Não defina secureProtocol/ciphers junto com minVersion para evitar conflitos
        minVersion: 'TLSv1.2'
      },
      auth: {
        user: cleanedSMTPUser,
        pass: cleanedSMTPPass,
        method: 'LOGIN'
      },
      // Connection timeouts
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
      debug: process.env.SMTP_DEBUG === 'true', // Ativa logs detalhados
      logger: process.env.SMTP_DEBUG === 'true'
    });

    // Verificar a conexão antes de iniciar o servidor
    transporter.verify(function(error, success) {
      if (error) {
        console.log('❌ Erro na verificação do servidor de email:', error.message);
      } else {
        console.log('✅ Servidor de email pronto para enviar emails via Titan');
        console.log('📧 Email transporter configured - Host: %s, Port: %s, User: %s',
          process.env.SMTP_HOST || 'smtp.titan.email',
          process.env.SMTP_PORT || 587,
          maskMiddle(cleanedSMTPUser));
      }
    });
  } catch (err) {
    console.error('❌ Failed to initialize mail transporter:', err.message);
  }
}

function maskMiddle(str) {
  if (!str) return str;
  if (str.length <= 5) return '***';
  return str.slice(0,2) + '***' + str.slice(-2);
}

async function sendLeadEmail(data) {
  try {
    if (!transporter) {
      console.warn('Email notification skipped: transporter not initialized');
      return { skipped: true };
    }
    
    // Validar se temos as configurações necessárias
    if (!process.env.EMAIL_TO || !process.env.SMTP_USER) {
      console.warn('Email notification skipped: EMAIL_TO or SMTP_USER missing');
      return { skipped: true };
    }

    console.log('Iniciando tentativa de envio de email...');
    console.log('De:', cleanedSMTPUser || process.env.SMTP_USER);
    console.log('Para:', process.env.EMAIL_TO);
    console.log('Dados do lead:', { whatsapp: data.whatsapp, preferredTime: data.preferredTime });

    const subject = `Novo lead (${data.whatsapp}) - SpaceApps`;
    const text = `Novo lead capturado via https://spaceapps.com.br\n\nWhatsApp: ${data.whatsapp}\nHorário Preferido: ${data.preferredTime}\nData/Hora: ${data.timestamp}`;
    const html = `
      <h2>Novo lead capturado via SpaceApps</h2>
      <p><strong>Website:</strong> https://spaceapps.com.br</p>
      <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
      <p><strong>Horário Preferido:</strong> ${data.preferredTime}</p>
      <p><strong>Data/Hora:</strong> ${data.timestamp}</p>
    `;

    const info = await transporter.sendMail({
      from: cleanedSMTPUser || process.env.SMTP_USER, // Use cleaned credentials
      to: process.env.EMAIL_TO,
      subject,
      text,
      html,
    });

    console.log('Email enviado com sucesso:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erro detalhado no envio de email:', {
      message: error.message,
      name: error.name,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
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
    
    const to = process.env.EMAIL_TO || process.env.SMTP_USER;
    if (!to) {
      return res.status(400).json({ error: 'EMAIL_TO or SMTP_USER missing' });
    }

    console.log('Enviando email de teste...');
    
    // Test current transporter first
    if (transporter) {
      try {
        const info = await transporter.sendMail({
          from: cleanedSMTPUser || process.env.SMTP_USER,
          to,
          subject: 'SpaceApps - Teste de Email',
          text: 'Este é um email de teste do sistema SpaceApps. Se você recebeu esta mensagem, o sistema de email está funcionando corretamente.',
          html: '<h2>SpaceApps - Teste de Email</h2><p>Este é um email de teste do sistema SpaceApps.</p><p>Se você recebeu esta mensagem, o sistema de email está funcionando corretamente.</p>'
        });
        
        console.log('Email de teste enviado com sucesso:', info.messageId);
        return res.json({ success: true, messageId: info.messageId, method: 'current' });
      } catch (error) {
        console.error('Current transporter failed:', error.message);
      }
    }

    // Try alternative configurations
    const configs = [
      {
        name: 'Titan 587 STARTTLS v1.2',
        host: 'smtp.titan.email',
        port: 587,
        secure: false,
        requireTLS: true,
  tls: { rejectUnauthorized: false, minVersion: 'TLSv1.2' }
      },
      {
        name: 'Titan 465 SSL Legacy',
        host: 'smtp.titan.email',
        port: 465,
        secure: true,
  tls: { rejectUnauthorized: false, minVersion: 'TLSv1.2' }
      },
      {
        name: 'HostGator Direct 587',
        host: 'mail.spaceapps.com.br',
        port: 587,
        secure: false,
        requireTLS: true,
  tls: { rejectUnauthorized: false, minVersion: 'TLSv1.2' }
      },
      {
        name: 'HostGator Direct 465',
        host: 'mail.spaceapps.com.br',
        port: 465,
        secure: true,
  tls: { rejectUnauthorized: false, minVersion: 'TLSv1.2' }
      },
      {
        name: 'HostGator Server Direct',
        host: 'gator4171.hostgator.com',
        port: 587,
        secure: false,
        requireTLS: true,
  tls: { rejectUnauthorized: false, minVersion: 'TLSv1.2' }
      },
      {
        name: 'Titan No TLS (Insecure)',
        host: 'smtp.titan.email',
        port: 587,
        secure: false,
        requireTLS: false,
        ignoreTLS: true
      }
    ];

    // Preparar credenciais limpas localmente
    const user = (process.env.SMTP_USER || '').trim().replace(/['"]/g, '');
    const pass = (process.env.SMTP_PASS || '').trim().replace(/['"]/g, '');

    for (const config of configs) {
      try {
        console.log(`Testando configuração: ${config.name}`);
        const testTransporter = nodemailer.createTransport({
          ...config,
          auth: { user, pass, method: 'LOGIN' },
          connectionTimeout: 30000,
          greetingTimeout: 15000,
          socketTimeout: 30000,
          debug: process.env.SMTP_DEBUG === 'true',
          logger: process.env.SMTP_DEBUG === 'true'
        });

        await testTransporter.verify();
        console.log(`✅ Configuração ${config.name} verificada com sucesso`);
        
        const info = await testTransporter.sendMail({
          from: user,
          to,
          subject: `SpaceApps - Teste ${config.name}`,
          text: `Email de teste usando configuração: ${config.name}`,
        });
        
        console.log(`Email enviado com ${config.name}:`, info.messageId);
        return res.json({ 
          success: true, 
          messageId: info.messageId, 
          method: config.name,
          config: { ...config, auth: 'hidden' }
        });
      } catch (error) {
        console.error(`❌ Configuração ${config.name} falhou:`, error.message);
      }
    }

    return res.status(500).json({ error: 'Todas as configurações falharam', details: 'Verifique credenciais e configurações DNS' });
  } catch (e) {
    console.error('Falha no teste de email:', e);
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
