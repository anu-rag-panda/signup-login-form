const sheetName = 'Sheet1'; // Change this to your actual sheet name
const scriptProp = PropertiesService.getScriptProperties();

function initialSetup() {
    const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost(e) {
    const action = e.parameter.action;
    if (action === 'signup') {
        return handleSignup(e);
    } else if (action === 'login') {
        return handleLogin(e);
    } else {
        return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: 'Invalid action' }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

function handleSignup(e) {
    const username = e.parameter.username;
    const email = e.parameter.email;
    const password = e.parameter.password;

    const sheet = SpreadsheetApp.openById(scriptProp.getProperty('key')).getSheetByName(sheetName);
    const data = sheet.getDataRange().getValues();

    // Check if username already exists
    for (let i = 1; i < data.length; i++) {
        if (data[i][0] === username) {
            return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: 'Username already exists!' }))
                .setMimeType(ContentService.MimeType.JSON);
        }
    }

    // Add new user
    sheet.appendRow([username, email, password, new Date()]);
    return ContentService.createTextOutput(JSON.stringify({ result: 'success', message: 'Signup successful!' }))
        .setMimeType(ContentService.MimeType.JSON);
}

function handleLogin(e) {
    const username = e.parameter.username;
    const password = e.parameter.password;

    const sheet = SpreadsheetApp.openById(scriptProp.getProperty('key')).getSheetByName(sheetName);
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length; i++) {
        if (data[i][0] === username && data[i][2] === password) {
            return ContentService.createTextOutput(JSON.stringify({ result: 'success', message: 'Login successful!' }))
                .setMimeType(ContentService.MimeType.JSON);
        }
    }
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', message: 'Invalid username or password!' }))
        .setMimeType(ContentService.MimeType.JSON);
}
