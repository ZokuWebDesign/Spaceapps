const express = require('express');
const cors = require('cors');
require('dotenv').config();
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT;

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

// Email notification setup (global, optional)
let transporter = null;
if (process.env.EMAIL_NOTIFICATIONS_ENABLED === 'true') {
  try {
    // Validar se temos as credenciais necessárias
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error('Credenciais de email não configuradas');
    }

    // Criar o transporter com as configurações corretas do Titan (Hostgator)
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.titan.email',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true para 465, false para 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
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
          maskMiddle(process.env.SMTP_USER));
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
    console.log('De:', process.env.SMTP_USER);
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
      from: process.env.SMTP_USER, // Usar apenas o email autorizado como remetente
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
    if (!transporter) {
      return res.status(400).json({ error: 'Email transporter not initialized' });
    }
    
    const to = process.env.EMAIL_TO || process.env.SMTP_USER;
    if (!to) {
      return res.status(400).json({ error: 'EMAIL_TO or SMTP_USER missing' });
    }

    console.log('Enviando email de teste...');
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'SpaceApps - Teste de Email',
      text: 'Este é um email de teste do sistema SpaceApps. Se você recebeu esta mensagem, o sistema de email está funcionando corretamente.',
      html: '<h2>SpaceApps - Teste de Email</h2><p>Este é um email de teste do sistema SpaceApps.</p><p>Se você recebeu esta mensagem, o sistema de email está funcionando corretamente.</p>'
    });
    
    console.log('Email de teste enviado com sucesso:', info.messageId);
    res.json({ success: true, messageId: info.messageId });
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
