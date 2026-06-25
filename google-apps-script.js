/**
 * Google Apps Script Backend for Editkaro.in
 * 
 * Instructions to setup the backend:
 * 1. Go to https://sheets.google.com and create a new Google Sheet named "Editkaro Submissions".
 * 2. In the first row (headers), add the following column names:
 *    A1: Timestamp
 *    B1: Form Type
 *    C1: Name
 *    D1: Email
 *    E1: Channel/Brand
 *    F1: Message
 *    G1: Quote Summary
 * 3. In the Google Sheet menu, go to Extensions -> Apps Script.
 * 4. Delete any code in the editor and paste the ENTIRE script below.
 * 5. Click the "Save" icon (or Ctrl+S / Cmd+S).
 * 6. Click the blue "Deploy" button -> "New deployment".
 * 7. Click the gear icon next to "Select type" and choose "Web app".
 * 8. Set the following configuration:
 *    - Description: Editkaro API
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone"
 * 9. Click "Deploy". You may need to "Authorize access" (Advanced -> Go to script (unsafe)).
 * 10. Copy the "Web app URL" provided.
 * 11. Open the `script.js` file in your website code, find the `const GOOGLE_SCRIPT_URL = "YOUR_SCRIPT_URL_HERE";` variable at the top, and paste your URL there.
 */

const SHEET_NAME = 'Sheet1'; // Make sure this matches the tab name in your Google Sheet

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    // Check if event parameters exist
    if (typeof e !== 'undefined' && e.parameter) {
      const timestamp = new Date();
      const formType = e.parameter.formType || 'unknown';
      const name = e.parameter.name || 'N/A';
      const email = e.parameter.email || 'N/A';
      const channel = e.parameter.channel || 'N/A';
      const message = e.parameter.message || 'N/A';
      const quoteSummary = e.parameter.quoteSummary || 'N/A';

      // Append row to the sheet
      sheet.appendRow([timestamp, formType, name, email, channel, message, quoteSummary]);

      // Return success response to the client
      return ContentService.createTextOutput(JSON.stringify({
        'result': 'success',
        'message': 'Data appended successfully'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
