// Yahan apna Google Apps Script ka Web App URL paste karein
const scriptURL = 'https://script.google.com/macros/s/AKfycbyuy-0Q69THtwAEvvUbTw9WiSPK-hyU-zBu3gY9Flz1RYSXHw47NXscmqxY8_5ix_0kjA/exec'; 

const form = document.getElementById('dataForm');
const statusMessage = document.getElementById('statusMessage');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    statusMessage.style.color = '#38bdf8';
    statusMessage.textContent = 'Sending data...';

    const requestData = {
        name: document.getElementById('name').value,
        number: document.getElementById('number').value
    };

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // CORS policy bypass karne ke liye
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(() => {
        statusMessage.style.color = '#4ade80';
        statusMessage.textContent = 'Data successfully saved to Google Sheet!';
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit to Sheet';
    })
    .catch(error => {
        console.error('Error!', error.message);
        statusMessage.style.color = '#f87171';
        statusMessage.textContent = 'Error! Data could not be saved.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit to Sheet';
    });
});