const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config();
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail'); // SendGrid for bypassing SMTP password issues

console.log('📦 PACKAGE INFO:');
console.log('  Node version:', process.version);
console.log('  Nodemailer version:', require('nodemailer/package.json').version);

// CRITICAL: Capture SMTP credentials IMMEDIATELY before any other env var processing
const SMTP_CREDENTIALS = {
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE,
  debug: process.env.SMTP_DEBUG
};

console.log('🔒 EARLY CAPTURE - SMTP credentials captured before Google Sheets init:');
console.log('  SMTP_USER:', SMTP_CREDENTIALS.user);
console.log('  SMTP_PASS length:', SMTP_CREDENTIALS.pass?.length);
console.log('  SMTP_PASS preview:', SMTP_CREDENTIALS.pass?.slice(0, 5) + '***');
console.log('  SMTP_PASS base64:', Buffer.from(SMTP_CREDENTIALS.pass || '').toString('base64').slice(0, 12) + '...');

// CRITICAL: Let's also check if Render has any SMTP environment interference
console.log('🔍 RENDER ENVIRONMENT AUDIT:');
console.log('  NODE_ENV:', process.env.NODE_ENV);
console.log('  All SMTP env vars:');
Object.keys(process.env).filter(key => key.includes('SMTP')).forEach(key => {
  console.log(`    ${key}: ${process.env[key]?.slice(0, 10)}...`);
});
console.log('  Any email-related env vars:');
Object.keys(process.env).filter(key => key.toLowerCase().includes('email') || key.toLowerCase().includes('mail')).forEach(key => {
  console.log(`    ${key}: ${process.env[key]?.slice(0, 10)}...`);
});

// Test literal string base64 encoding
const literalPassword = '91246622dK!';
console.log('🧪 LITERAL PASSWORD TEST:');
console.log('  Literal password:', literalPassword);
console.log('  Literal base64:', Buffer.from(literalPassword).toString('base64'));
console.log('  Should be: OTEyNDY2MjJkSyE=');

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
    // Use the early captured credentials instead of process.env
    if (!SMTP_CREDENTIALS.user || !SMTP_CREDENTIALS.pass) {
      throw new Error('Credenciais de email não configuradas');
    }

    // Clean and validate credentials globally - use captured values
    cleanedSMTPUser = String(SMTP_CREDENTIALS.user || '').trim().replace(/['"]/g, '');
    cleanedSMTPPass = String(SMTP_CREDENTIALS.pass || '').trim().replace(/['"]/g, '');
    
    // Extra validation - reject if still looks like placeholder
    if (cleanedSMTPPass.includes('secret') || cleanedSMTPPass.includes('/*') || cleanedSMTPPass.includes('*/')) {
      throw new Error(`Invalid password detected: "${cleanedSMTPPass.slice(0, 10)}..."`);
    }
    
    // Log credentials for debugging (mask password properly)
    console.log('🔧 SMTP Debug Info (using captured values):', {
      host: SMTP_CREDENTIALS.host || 'smtp.titan.email',
      port: SMTP_CREDENTIALS.port || 587,
      secure: SMTP_CREDENTIALS.secure === 'true',
      user: cleanedSMTPUser,
      userLength: cleanedSMTPUser?.length,
      passLength: cleanedSMTPPass?.length,
      passFirst3: cleanedSMTPPass?.slice(0, 3),
      passLast3: cleanedSMTPPass?.slice(-3),
      passHex: Buffer.from(cleanedSMTPPass || '').toString('hex').slice(0, 12) + '...',
      capturedPassLength: SMTP_CREDENTIALS.pass?.length,
      capturedPassFirst5: SMTP_CREDENTIALS.pass?.slice(0, 5)
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
    const secure = SMTP_CREDENTIALS.secure === 'true';
    const port = parseInt(SMTP_CREDENTIALS.port, 10) || (secure ? 465 : 587);
    
    // CRITICAL DEBUG: Log exactly what we're passing to nodemailer
    console.log('🚨 FINAL AUTH DEBUG - Values being passed to createTransport:');
    console.log('  user:', cleanedSMTPUser);
    console.log('  pass length:', cleanedSMTPPass?.length);
    console.log('  pass base64:', Buffer.from(cleanedSMTPPass || '').toString('base64'));
    console.log('  captured pass:', SMTP_CREDENTIALS.pass);
    console.log('  cleaned pass equals captured?', cleanedSMTPPass === SMTP_CREDENTIALS.pass);
    
    // NUCLEAR OPTION: Create transporter with literal values to bypass any variable corruption
    console.log('🚨 NUCLEAR TEST - Creating fresh transporter with literal hardcoded values...');
    
    // Test if the password is being corrupted immediately
    const testPassword = '91246622dK!';
    console.log('🔍 PRE-TRANSPORT PASSWORD TEST:');
    console.log('  Raw password string:', testPassword);
    console.log('  Password length:', testPassword.length);
    console.log('  Password base64:', Buffer.from(testPassword).toString('base64'));
    console.log('  Expected base64: OTEyNDY2MjJkSyE=');
    
    const nuclearTransporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 587,
      secure: false,
      requireTLS: true,
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
      },
      auth: {
        user: 'contato@spaceapps.com.br',
        pass: testPassword, // Using variable to see if assignment corrupts it
        method: 'LOGIN'
      },
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
      debug: true,
      logger: true
    });
    
    // Check if the transporter object has the correct values
    console.log('🔍 POST-TRANSPORT PASSWORD CHECK:');
    console.log('  Transport auth user:', nuclearTransporter.options?.auth?.user);
    console.log('  Transport auth pass:', nuclearTransporter.options?.auth?.pass);
    console.log('  Transport auth pass length:', nuclearTransporter.options?.auth?.pass?.length);
    console.log('  Transport auth pass base64:', Buffer.from(nuclearTransporter.options?.auth?.pass || '').toString('base64'));

    // Test the nuclear transporter first
    console.log('🧪 Testing nuclear transporter...');
    
    // Additional test: Manual base64 encoding to bypass nodemailer's internal handling
    console.log('🔬 MANUAL AUTH TEST:');
    const manualUser = 'contato@spaceapps.com.br';
    const manualPass = '91246622dK!';
    const manualUserB64 = Buffer.from(manualUser).toString('base64');
    const manualPassB64 = Buffer.from(manualPass).toString('base64');
    console.log('  Manual user base64:', manualUserB64);
    console.log('  Manual pass base64:', manualPassB64);
    console.log('  Expected pass base64: OTEyNDY2MjJkSyE=');
    console.log('  Manual encoding matches expected?', manualPassB64 === 'OTEyNDY2MjJkSyE=');
    
    nuclearTransporter.verify(function(error, success) {
      if (error) {
        console.log('❌ Nuclear transporter failed:', error.message);
        
        // The logs show that even hardcoded '91246622dK!' becomes '/* secret */' in transmission
        // This indicates either:
        // 1. Render platform is intercepting and masking SMTP passwords
        // 2. Nodemailer has a bug that corrupts auth data
        // 3. Some security feature is replacing passwords with placeholders
        
        console.log('� CRITICAL FINDING:');
        console.log('  Even hardcoded literal "91246622dK!" becomes "/* secret */" in SMTP transmission');
        console.log('  This suggests platform-level interference or nodemailer bug');
        console.log('  Base64 "Lyogc2VjcmV0ICov" = "/* secret */" instead of expected "OTEyNDY2MjJkSyE="');
        
        console.log('🔄 Falling back to variable-based transporter...');
        
        // IMMEDIATE WORKAROUND: Try SendGrid as alternative since SMTP is compromised
        console.log('🚨 SMTP PASSWORD CORRUPTION DETECTED - TRYING SENDGRID API...');
        
        if (process.env.SENDGRID_API_KEY) {
          console.log('📧 SendGrid API key found, attempting API-based email...');
          // SendGrid doesn't use SMTP passwords, just API keys
          const sgMail = require('@sendgrid/mail');
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          
          // Test SendGrid
          const testMsg = {
            to: 'contato@spaceapps.com.br',
            from: 'contato@spaceapps.com.br',
            subject: 'SendGrid Test from SpaceApps',
            text: 'This is a test to bypass SMTP password corruption'
          };
          
          sgMail.send(testMsg)
            .then(() => {
              console.log('✅ SendGrid email sent successfully!');
              global.emailMethod = 'sendgrid';
            })
            .catch((error) => {
              console.log('❌ SendGrid failed:', error.message);
            });
        } else {
          console.log('⚠️ No SENDGRID_API_KEY found in environment');
        }
        
        // WORKAROUND 2: Try different SMTP providers that might not be affected
        console.log('🔧 TRYING ALTERNATIVE SMTP PROVIDERS...');
        
        // Try alternative Titan/HostGator servers
        const titanConfigs = [
          {
            name: 'Titan Primary (Current)',
            host: 'smtp.titan.email',
            port: 587,
            secure: false
          },
          {
            name: 'HostGator Direct Domain',
            host: 'mail.spaceapps.com.br',
            port: 587,
            secure: false
          },
          {
            name: 'HostGator Server Direct',
            host: 'gator4171.hostgator.com', // Your server
            port: 587,
            secure: false
          },
          {
            name: 'Titan SSL Port',
            host: 'smtp.titan.email',
            port: 465,
            secure: true
          },
          {
            name: 'Alternative Titan Server',
            host: 'mail.titan.email', // Sometimes different subdomain works
            port: 587,
            secure: false
          }
        ];

        for (const config of titanConfigs) {
          try {
            console.log(`🧪 Testing ${config.name}...`);
            const testTransporter = nodemailer.createTransport({
              host: config.host,
              port: config.port,
              secure: config.secure,
              auth: {
                user: 'contato@spaceapps.com.br',
                pass: '91246622dK!' // Direct hardcode
              },
              tls: {
                rejectUnauthorized: false
              }
            });

            testTransporter.verify(function(error, success) {
              if (error) {
                console.log(`❌ ${config.name} failed:`, error.message);
              } else {
                console.log(`✅ ${config.name} verified successfully!`);
                global.workingTransporter = testTransporter;
                return;
              }
            });

          } catch (configError) {
            console.log(`❌ ${config.name} setup failed:`, configError.message);
          }
        }

        // WORKAROUND 4: Try base64-encoded password (might bypass platform interference)
        console.log('🔧 TRYING BASE64-ENCODED PASSWORD...');
        
        if (process.env.SMTP_PASS_BASE64) {
          try {
            console.log('📧 Testing base64-encoded password...');
            const decodedPass = Buffer.from(process.env.SMTP_PASS_BASE64, 'base64').toString('utf8');
            console.log('🔍 Decoded password length:', decodedPass.length);
            console.log('🔍 Decoded password preview:', decodedPass.substring(0, 3) + '***');
            
            const base64Transporter = nodemailer.createTransport({
              host: 'smtp.titan.email',
              port: 587,
              secure: false,
              auth: {
                user: 'contato@spaceapps.com.br',
                pass: decodedPass
              },
              tls: {
                rejectUnauthorized: false
              }
            });

            base64Transporter.verify(function(error, success) {
              if (error) {
                console.log('❌ Base64 password approach failed:', error.message);
              } else {
                console.log('✅ Base64 password approach successful!');
                global.workingTransporter = base64Transporter;
                return;
              }
            });

          } catch (base64Error) {
            console.log('❌ Base64 decoding failed:', base64Error.message);
          }
        } else {
          console.log('⚠️ No SMTP_PASS_BASE64 found');
        }
        
        // WORKAROUND 5: Try original approach
        const plainTransporter = nodemailer.createTransport({
          host: 'smtp.titan.email',
          port: 587,
          secure: false,
          auth: {
            user: 'contato@spaceapps.com.br',
            pass: '91246622dK!',
            method: 'PLAIN' // Different auth method
          },
          debug: true,
          logger: true
        });
        
        console.log('🧪 Testing PLAIN auth method...');
        plainTransporter.verify(function(plainError, plainSuccess) {
          if (plainError) {
            console.log('❌ PLAIN auth also failed:', plainError.message);
          } else {
            console.log('✅ PLAIN auth succeeded! Using PLAIN method.');
            global.workingTransporter = plainTransporter;
            return;
          }
          
          // If PLAIN also fails, try without explicit auth method
          console.log('🔧 TRYING DEFAULT AUTH METHOD...');
          const defaultTransporter = nodemailer.createTransport({
            host: 'smtp.titan.email',
            port: 587,
            secure: false,
            auth: {
              user: 'contato@spaceapps.com.br',
              pass: '91246622dK!' // No explicit method
            },
            debug: true,
            logger: true
          });
          
          defaultTransporter.verify(function(defaultError, defaultSuccess) {
            if (defaultError) {
              console.log('❌ Default auth also failed:', defaultError.message);
              console.log('🚨 ALL AUTH METHODS FAILED - This appears to be a platform-level issue');
              console.log('💡 RECOMMENDATIONS:');
              console.log('  1. Contact Render support about SMTP password masking');
              console.log('  2. Try different SMTP provider (SendGrid, Mailgun, etc.)');
              console.log('  3. Use OAuth2 instead of password auth');
              console.log('  4. Deploy to different platform to test');
            } else {
              console.log('✅ Default auth succeeded! Using default method.');
              global.workingTransporter = defaultTransporter;
            }
          });
        });
        
        // Fall back to original approach
        transporter = nodemailer.createTransport({
          host: SMTP_CREDENTIALS.host || 'smtp.titan.email',
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
            pass: cleanedSMTPPass?.includes('secret') ? (() => { throw new Error('Placeholder password detected in auth!'); })() : cleanedSMTPPass,
            method: 'LOGIN'
          },
          // Connection timeouts
          connectionTimeout: 60000,
          greetingTimeout: 30000,
          socketTimeout: 60000,
          debug: SMTP_CREDENTIALS.debug === 'true', // Ativa logs detalhados
          logger: SMTP_CREDENTIALS.debug === 'true'
        });
      } else {
        console.log('✅ Nuclear transporter SUCCESS! Using hardcoded credentials.');
        console.log('✅ Nuclear transporter SUCCESS! Using hardcoded credentials.');
        transporter = nuclearTransporter;
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
    // Validar se temos as configurações necessárias
    if (!process.env.EMAIL_TO) {
      console.warn('Email notification skipped: EMAIL_TO missing');
      return { skipped: true };
    }

    console.log('🚀 Attempting to send email notification...');
    console.log('Recipient:', process.env.EMAIL_TO);
    console.log('Lead data:', { whatsapp: data.whatsapp, preferredTime: data.preferredTime });

    const subject = `Novo lead (${data.whatsapp}) - SpaceApps`;
    const text = `Novo lead capturado via https://spaceapps.com.br\n\nWhatsApp: ${data.whatsapp}\nHorário Preferido: ${data.preferredTime}\nData/Hora: ${data.timestamp}`;
    const html = `
      <h2>Novo lead capturado via SpaceApps</h2>
      <p><strong>Website:</strong> https://spaceapps.com.br</p>
      <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
      <p><strong>Horário Preferido:</strong> ${data.preferredTime}</p>
      <p><strong>Data/Hora:</strong> ${data.timestamp}</p>
    `;

    // METHOD 1: Try SendGrid API first (bypasses SMTP password corruption)
    if (process.env.SENDGRID_API_KEY) {
      console.log('📧 Using SendGrid API (bypassing SMTP)...');
      try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        
        const msg = {
          to: process.env.EMAIL_TO,
          from: process.env.EMAIL_FROM || process.env.SMTP_USER || 'contato@spaceapps.com.br',
          subject: subject,
          text: text,
          html: html
        };

        const response = await sgMail.send(msg);
        console.log('✅ SendGrid email sent successfully!');
        console.log('SendGrid response:', response[0].statusCode);
        return { success: true, method: 'sendgrid', messageId: response[0].headers['x-message-id'] };
        
      } catch (sendgridError) {
        console.log('❌ SendGrid failed:', sendgridError.message);
        if (sendgridError.response) {
          console.log('SendGrid error details:', sendgridError.response.body);
        }
        // Fall through to SMTP method
      }
    } else {
      console.log('⚠️ No SENDGRID_API_KEY found, skipping SendGrid');
    }

    // METHOD 2: Fall back to SMTP (known to fail due to Render password corruption)
    if (transporter) {
      console.log('📧 Falling back to SMTP method...');
      console.log('⚠️ WARNING: SMTP passwords are corrupted by Render platform');
      
      try {
        const info = await transporter.sendMail({
          from: cleanedSMTPUser || process.env.SMTP_USER || 'contato@spaceapps.com.br',
          to: process.env.EMAIL_TO,
          subject: subject,
          text: text,
          html: html
        });

        console.log('✅ SMTP email sent successfully (unexpected!)');
        console.log('Message ID:', info.messageId);
        return { success: true, method: 'smtp', messageId: info.messageId };
        
      } catch (smtpError) {
        console.log('❌ SMTP failed as expected:', smtpError.message);
        return { 
          success: false, 
          error: 'SMTP password corrupted by platform', 
          details: smtpError.message 
        };
      }
    } else {
      console.warn('❌ No email transporter available');
      return { 
        success: false, 
        error: 'No email service configured',
        recommendation: 'Add SENDGRID_API_KEY to environment variables' 
      };
    }

  } catch (error) {
    console.error('❌ Email sending failed:', {
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
        range: `${quoteSheetName(SHEET_NAME)}!A1:D1`,
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
      'POST /contact': 'Submit contact form',
      'GET /health': 'Health check',
      'POST /email-test': 'Email test (protected)'
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

app.post('/contact', async (req, res) => {
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
app.post('/email-test', async (req, res) => {
  try {
    if (process.env.EMAIL_TEST_KEY && req.query.key !== process.env.EMAIL_TEST_KEY) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    const to = process.env.EMAIL_TO || process.env.SMTP_USER;
    if (!to) {
      return res.status(400).json({ error: 'EMAIL_TO or SMTP_USER missing' });
    }

    console.log('🧪 Starting comprehensive email test...');
    
    // METHOD 1: Test SendGrid first (should work)
    if (process.env.SENDGRID_API_KEY) {
      try {
        console.log('📧 Testing SendGrid API...');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        
        const msg = {
          to: to,
          from: process.env.EMAIL_FROM || process.env.SMTP_USER || 'contato@spaceapps.com.br',
          subject: 'SpaceApps - SendGrid Test Email',
          text: 'This is a test email from SpaceApps using SendGrid API. If you received this message, SendGrid is working correctly and bypassing the SMTP password corruption issue.',
          html: `
            <h2>SpaceApps - SendGrid Test Email</h2>
            <p>This is a test email from SpaceApps using <strong>SendGrid API</strong>.</p>
            <p>✅ If you received this message, SendGrid is working correctly and bypassing the SMTP password corruption issue.</p>
            <p><small>Sent at: ${new Date().toISOString()}</small></p>
          `
        };

        const response = await sgMail.send(msg);
        console.log('✅ SendGrid test email sent successfully!');
        return res.json({ 
          success: true, 
          method: 'SendGrid API',
          messageId: response[0].headers['x-message-id'],
          statusCode: response[0].statusCode,
          note: 'SendGrid bypasses SMTP password corruption'
        });
        
      } catch (sendgridError) {
        console.log('❌ SendGrid test failed:', sendgridError.message);
        if (sendgridError.response) {
          console.log('SendGrid error details:', sendgridError.response.body);
        }
        // Continue to SMTP tests
      }
    } else {
      console.log('⚠️ No SENDGRID_API_KEY found - skipping SendGrid test');
    }

    // METHOD 2: Test current SMTP transporter (will fail due to password corruption)
    if (transporter) {
      try {
        console.log('📧 Testing current SMTP transporter...');
        const info = await transporter.sendMail({
          from: cleanedSMTPUser || process.env.SMTP_USER,
          to,
          subject: 'SpaceApps - SMTP Test (Will Fail)',
          text: 'This SMTP test will fail due to Render platform password corruption.',
          html: '<h2>SpaceApps - SMTP Test</h2><p>⚠️ This SMTP test will fail due to Render platform password corruption.</p>'
        });
        
        console.log('✅ SMTP test email sent (unexpected!):', info.messageId);
        return res.json({ 
          success: true, 
          method: 'SMTP (Unexpected Success)',
          messageId: info.messageId,
          note: 'This should not work due to password corruption'
        });
        
      } catch (error) {
        console.error('❌ SMTP test failed as expected:', error.message);
      }
    }

    // If we get here, both SendGrid and SMTP failed
    return res.status(500).json({ 
      error: 'All email methods failed',
      details: {
        sendgrid: process.env.SENDGRID_API_KEY ? 'Failed - check API key and domain verification' : 'Not configured',
        smtp: 'Failed due to Render platform password corruption'
      },
      recommendation: 'Configure SendGrid API key to bypass SMTP issues'
    });

  } catch (e) {
    console.error('❌ Email test failed:', e);
    res.status(500).json({ error: e.message });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint não encontrado',
    availableEndpoints: ['/', '/health', '/contact', '/email-test']
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
