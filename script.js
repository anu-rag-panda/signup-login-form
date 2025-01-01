// Replace with your Google Apps Script web app URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbwLial5e3mpbWaKqQIr4GoSmJCeb3QG79zwBC1KDy4FKsq9wFJTxZyFKAcWtC4Iuv9_Ow/exec';

// Handle Signup Form Submission
document.getElementById('signupForm').onsubmit = function(e) {
    e.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create a FormData object to send the data
    const formData = new FormData();
    formData.append('action', 'signup');
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    // Send the data to the Google Apps Script
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => response.json())
        .then(result => {
            alert(result.message); // Show success or error message
            if (result.result === 'success') {
                // Optionally, you can clear the form or redirect the user
                document.getElementById('signupForm').reset();
            }
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
};

// Handle Login Form Submission
document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Create a FormData object to send the data
    const formData = new FormData();
    formData.append('action', 'login');
    formData.append('username', username);
    formData.append('password', password);

    // Send the data to the Google Apps Script
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => response.json())
        .then(result => {
            alert(result.message); // Show success or error message
            if (result.result === 'success') {
                // Optionally, you can redirect the user to another page
                document.getElementById('loginForm').reset();
            }
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
};

// Switch to Login Form
document.getElementById('switchToLogin').onclick = function() {
    document.getElementById('signupContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
};

// Switch to Signup Form
document.getElementById('switchToSignup').onclick = function() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('signupContainer').style.display = 'block';
};