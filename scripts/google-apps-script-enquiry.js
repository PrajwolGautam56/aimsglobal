/**
 * AIMS Global — Enquiry Webhook
 *
 * Deploy steps:
 * 1. Open: https://docs.google.com/spreadsheets/d/1A3xFwN17ERu_eYhKl2jKPDTL9AAzK8zXFyLhpieXXWg/edit
 * 2. Extensions → Apps Script → paste this file → Save
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL → add to Vercel as GOOGLE_SHEETS_WEBHOOK
 *
 * Required sheets: "Enquiries" and "Blog Queries" (with same headers + Blog Post column on Blog Queries)
 */

const SHEET_ID = "1A3xFwN17ERu_eYhKl2jKPDTL9AAzK8zXFyLhpieXXWg";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SHEET_ID);

    const sheetName = data.type === "blog_query" ? "Blog Queries" : "Enquiries";
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      throw new Error('Sheet not found: "' + sheetName + '"');
    }

    const lastRow = sheet.getLastRow();
    const enquiryNum = String(Math.max(lastRow, 1)).padStart(3, "0");
    const year = new Date().getFullYear();
    const enquiryId = "ENQ-" + year + "-" + enquiryNum;

    const now = new Date();
    const dateStr = Utilities.formatDate(now, "Asia/Kathmandu", "yyyy-MM-dd HH:mm:ss");

    const row = [
      enquiryId,
      dateStr,
      data.name || "",
      data.email || "",
      data.phone || "",
      data.course || "",
      data.university || "",
      data.city || "",
      data.message || "",
      data.sourcePage || "",
      "New",
      "",
      "",
      "",
      "In Progress",
    ];

    if (data.type === "blog_query") {
      row.push(data.blogPost || "");
    }

    sheet.appendRow(row);

    const newRow = sheet.getLastRow();
    sheet.getRange(newRow, 11).setBackground("#FF6B35").setFontColor("#FFFFFF");

    MailApp.sendEmail({
      to: "info@aimsglobal.com.np",
      subject: "New Enquiry: " + data.name + " — " + (data.course || "General"),
      htmlBody:
        "<div style='font-family:Arial,sans-serif;max-width:500px'>" +
        "<h2 style='color:#1B3B8A'>New Enquiry — AIMS Global</h2>" +
        "<table style='width:100%;border-collapse:collapse'>" +
        "<tr><td style='padding:6px;color:#666'>ID</td><td style='padding:6px;font-weight:bold'>" +
        enquiryId +
        "</td></tr>" +
        "<tr><td style='padding:6px;color:#666'>Name</td><td style='padding:6px'>" +
        data.name +
        "</td></tr>" +
        "<tr><td style='padding:6px;color:#666'>Phone</td><td style='padding:6px'>" +
        data.phone +
        "</td></tr>" +
        "<tr><td style='padding:6px;color:#666'>Course</td><td style='padding:6px'>" +
        (data.course || "") +
        "</td></tr>" +
        "<tr><td style='padding:6px;color:#666'>University</td><td style='padding:6px'>" +
        (data.university || "") +
        "</td></tr>" +
        "<tr><td style='padding:6px;color:#666'>City</td><td style='padding:6px'>" +
        (data.city || "") +
        "</td></tr>" +
        "<tr><td style='padding:6px;color:#666'>Message</td><td style='padding:6px'>" +
        (data.message || "") +
        "</td></tr>" +
        "<tr><td style='padding:6px;color:#666'>Source</td><td style='padding:6px'>" +
        (data.sourcePage || "") +
        "</td></tr>" +
        "</table>" +
        "<p style='margin-top:16px'><a href='https://docs.google.com/spreadsheets/d/" +
        SHEET_ID +
        "'>Open Google Sheet →</a></p></div>",
    });

    return ContentService.createTextOutput(
      JSON.stringify({ success: true, id: enquiryId })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "AIMS Global enquiry webhook active" })
  ).setMimeType(ContentService.MimeType.JSON);
}
