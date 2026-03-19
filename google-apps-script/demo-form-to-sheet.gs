// Google Apps Script: Save About page demo form submissions to Google Sheet
// 1) Create/choose a Google Sheet and note its ID below (recommended).
// 2) Open Extensions > Apps Script and paste this file.
// 3) Deploy > New deployment > Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 4) Copy Web App URL and paste it in components/about.js (DEMO_SHEET_WEB_APP_URL).

const SPREADSHEET_ID = '1ZY3URfI9WyK4yPQqrAzWvSKRFuAv-khWn7_vkatkog8';
const SHEET_NAME = 'Demo Booking Data';

function doGet() {
  try {
    const sheet = getOrCreateSheet_(SHEET_NAME);
    return ContentService
      .createTextOutput(JSON.stringify({
        ok: true,
        message: 'Web app is live',
        sheetName: sheet.getName(),
        rowCount: sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const sheet = getOrCreateSheet_(SHEET_NAME);

    const p = (e && e.parameter) ? e.parameter : {};

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Submitted At',
        'Page',
        'Full Name',
        'Mobile Number',
        'Email Address',
        'Course Interested In',
        'Preferred Demo Date',
        'Preferred Demo Time',
        'Mode of Learning',
        'Message / Questions'
      ]);
    }

    sheet.appendRow([
      p.submitted_at || new Date().toISOString(),
      p.page || 'about.html',
      p.name || '',
      p.phone || '',
      p.email || '',
      p.course || '',
      p.demo_date || '',
      p.demo_time || '',
      p.mode || '',
      p.message || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet_(sheetName) {
  const spreadsheet = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  if (!spreadsheet) {
    throw new Error('Spreadsheet not found. Set SPREADSHEET_ID or use a bound script from the target Sheet.');
  }

  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  return sheet;
}
