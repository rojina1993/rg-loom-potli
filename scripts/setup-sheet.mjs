import { google } from "googleapis";

process.loadEnvFile(".env.local");
const spreadsheetId = process.env.GOOGLE_SHEET_ID;
const tab = process.env.GOOGLE_SHEET_TAB_NAME;
if (!spreadsheetId || !tab || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) throw new Error("Missing Google Sheets environment variables.");
const headers = ["Order ID", "Date & Time", "Customer Name", "Phone Number", "Email Address", "Exact Location", "Product Name", "Quantity", "Price Per Piece", "Total Price", "Payment Method", "Order Status", "Notes"];
const auth = new google.auth.JWT({ email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"), scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
const sheets = google.sheets({ version: "v4", auth });
const meta = await sheets.spreadsheets.get({ spreadsheetId });
const sheet = meta.data.sheets?.find((item) => item.properties?.title === tab);
if (sheet?.properties?.sheetId === undefined) throw new Error(`Tab \"${tab}\" was not found.`);
const sheetId = sheet.properties.sheetId;
const existing = await sheets.spreadsheets.values.get({ spreadsheetId, range: `'${tab}'!A1:M1` });
if (!existing.data.values?.[0]?.[0]) await sheets.spreadsheets.values.update({ spreadsheetId, range: `'${tab}'!A1:M1`, valueInputOption: "RAW", requestBody: { values: [headers] } });
await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests: [
  { repeatCell: { range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 13 }, cell: { userEnteredFormat: { backgroundColor: { red: 0.388, green: 0.106, blue: 0.251 }, textFormat: { foregroundColor: { red: 1, green: 1, blue: 1 }, bold: true, fontSize: 10 }, horizontalAlignment: "CENTER", verticalAlignment: "MIDDLE", wrapStrategy: "WRAP" } }, fields: "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment,wrapStrategy)" } },
  { updateDimensionProperties: { range: { sheetId, dimension: "ROWS", startIndex: 0, endIndex: 1 }, properties: { pixelSize: 44 }, fields: "pixelSize" } },
  { updateDimensionProperties: { range: { sheetId, dimension: "COLUMNS", startIndex: 0, endIndex: 13 }, properties: { pixelSize: 130 }, fields: "pixelSize" } },
  { updateDimensionProperties: { range: { sheetId, dimension: "COLUMNS", startIndex: 5, endIndex: 6 }, properties: { pixelSize: 240 }, fields: "pixelSize" } },
  { updateDimensionProperties: { range: { sheetId, dimension: "COLUMNS", startIndex: 6, endIndex: 7 }, properties: { pixelSize: 200 }, fields: "pixelSize" } },
  { setBasicFilter: { filter: { range: { sheetId, startRowIndex: 0, startColumnIndex: 0, endColumnIndex: 13 } } } },
  { setDataValidation: { range: { sheetId, startRowIndex: 1, startColumnIndex: 11, endColumnIndex: 12 }, rule: { condition: { type: "ONE_OF_LIST", values: ["New Order", "Order Confirmed", "Order Ongoing", "Delivered", "Cancelled"].map((userEnteredValue) => ({ userEnteredValue })) }, strict: true, showCustomUi: true } } },
  { repeatCell: { range: { sheetId, startRowIndex: 1, startColumnIndex: 8, endColumnIndex: 10 }, cell: { userEnteredFormat: { numberFormat: { type: "CURRENCY", pattern: "NPR #,##0" } } }, fields: "userEnteredFormat.numberFormat" } }
] } });
console.log("Premium spreadsheet layout initialized.");
