import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Configuration for your spreadsheets
const MAIN_SPREADSHEET_ID = process.env.GOOGLE_SHEETS_MAIN_ID;
const BACKUP_SPREADSHEET_ID = process.env.GOOGLE_SHEETS_BACKUP_ID;
const SHEET_NAME = 'Contatos Site Space'; // Sheets name must match exactly

// Optional email transporter (only initialized if enabled)
let transporter: nodemailer.Transporter | null = null;
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
  } catch (e) {
    console.error('Failed to initialize nodemailer transporter:', e);
  }
}

interface ContactData {
  whatsapp: string;
  preferredTime: string;
  timestamp: string;
}

async function appendToSheet(spreadsheetId: string, data: ContactData) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${SHEET_NAME}!A:D`, // Columns A to D
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [
          [
            data.timestamp,
            data.whatsapp,
            data.preferredTime,
            'Novo' // Status column
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

async function createHeadersIfNeeded(spreadsheetId: string) {
  try {
    // Check if headers exist
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${SHEET_NAME}!A1:D1`,
    });

    // If no data exists, create headers
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
    // If sheet doesn't exist, it will be created automatically when we append data
  }
}

async function sendLeadEmail(data: ContactData) {
  if (!transporter) return { skipped: true };
  if (!process.env.EMAIL_TO || !process.env.EMAIL_FROM) return { skipped: true };
  const subject = `Novo lead (${data.whatsapp}) - SpaceApps`;
  const text = `Novo lead capturado\n\nWhatsApp: ${data.whatsapp}\nHorário Preferido: ${data.preferredTime}\nData/Hora: ${data.timestamp}`;
  const html = `<h2>Novo lead capturado</h2><ul><li><strong>WhatsApp:</strong> ${data.whatsapp}</li><li><strong>Horário Preferido:</strong> ${data.preferredTime}</li><li><strong>Data/Hora:</strong> ${data.timestamp}</li></ul>`;
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject,
      text,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('Error sending lead email:', error);
    return { success: false, error: error.message };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { whatsapp, preferredTime } = body;

    // Validate input
    if (!whatsapp || !preferredTime) {
      return NextResponse.json(
        { error: 'WhatsApp e horário preferido são obrigatórios' },
        { status: 400 }
      );
    }

    // Validate WhatsApp format (accepts international formats)
    const digitsOnly = whatsapp.trim().replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      return NextResponse.json(
        { error: 'Número de WhatsApp inválido. Deve ter entre 10 e 15 dígitos.' },
        { status: 400 }
      );
    }

    // Check environment variables
    if (!MAIN_SPREADSHEET_ID || !BACKUP_SPREADSHEET_ID) {
      return NextResponse.json(
        { error: 'Configuração do Google Sheets não encontrada' },
        { status: 500 }
      );
    }

    // Prepare data
    const contactData: ContactData = {
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

    // Create headers if needed (for both sheets)
    await Promise.all([
      createHeadersIfNeeded(MAIN_SPREADSHEET_ID),
      createHeadersIfNeeded(BACKUP_SPREADSHEET_ID)
    ]);

    // Append to both main and backup sheets
    const [mainResult, backupResult] = await Promise.all([
      appendToSheet(MAIN_SPREADSHEET_ID, contactData),
      appendToSheet(BACKUP_SPREADSHEET_ID, contactData)
    ]);

    // Optional email notification
    let emailResult: any = null;
    if (process.env.EMAIL_NOTIFICATIONS_ENABLED === 'true') {
      emailResult = await sendLeadEmail(contactData);
    }

    return NextResponse.json({
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
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor. Tente novamente em alguns minutos.',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Contact API is working',
    timestamp: new Date().toISOString()
  });
}
