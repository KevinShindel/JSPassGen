const resultEl = document.getElementById('result');
const upperEl = document.getElementById('Up');
const lowerEl = document.getElementById('Lw');
const specialEl = document.getElementById('Sp');
const numbersEl = document.getElementById('Dg');
const lengthEl = document.getElementById('pass');
const generateBtn = document.getElementById('generateBtn');
const resetBtn = document.getElementById('resetBtn');
const copyBtn = document.getElementById('copyBtn');

const charSets = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    special: '!@#$%^&*()',
    numbers: '0123456789'
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generatePassword() {
    const length = parseInt(lengthEl.value, 10);
    if (length < 1 || length > 128) {
        alert('Password length must be between 1 and 128.');
        return;
    }

    let totalChars = '';
    if (upperEl.checked) totalChars += charSets.upper;
    if (lowerEl.checked) totalChars += charSets.lower;
    if (specialEl.checked) totalChars += charSets.special;
    if (numbersEl.checked) totalChars += charSets.numbers;

    if (!totalChars) {
        alert('Select at least one character set.');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = getRandomInt(totalChars.length);
        password += totalChars[randomIndex];
    }

    resultEl.value = password;
}

function resetForm() {
    lengthEl.value = 12;
    upperEl.checked = true;
    lowerEl.checked = true;
    specialEl.checked = true;
    numbersEl.checked = true;
    resultEl.value = '';
}

function copyToClipboard() {
    if (resultEl.value) {
        navigator.clipboard.writeText(resultEl.value).then(() => {
            copyBtn.classList.add('copied');
            // Remove class after 1 second to revert icon
            setTimeout(() => copyBtn.classList.remove('copied'), 1000);
        }).catch(err => console.error('Copy failed:', err));
    }
}
// Event listeners
generateBtn.addEventListener('click', generatePassword);
resetBtn.addEventListener('click', resetForm);
copyBtn.addEventListener('click', copyToClipboard);
lengthEl.addEventListener('input', generatePassword);
[upperEl, lowerEl, specialEl, numbersEl].forEach(el => el.addEventListener('change', generatePassword));

// Initial generation
generatePassword();