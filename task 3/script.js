const display = document.getElementById('display');
let currentInput = '';
let operator = null;
let previousValue = '';
let awaitingNextNumber = false;

function appendValue(value) {
    if (awaitingNextNumber) {
        currentInput = value;
        awaitingNextNumber = false;
    } else {
        if (value === '.' && currentInput.includes('.')) return;
        currentInput += value;
    }
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    previousValue = '';
    awaitingNextNumber = false;
    display.value = '';
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}

function setOperator(nextOperator) {
    if (currentInput === '' && previousValue === '') return;

    if (previousValue !== '' && currentInput !== '' && operator) {
        calculate();
    } else if (currentInput !== '') {
        previousValue = currentInput;
    }
    operator = nextOperator;
    awaitingNextNumber = true;
    display.value = `${previousValue} ${operator}`;
}

function calculate() {
    if (previousValue === '' || currentInput === '') return;

    let expression = `${previousValue}${operator}${currentInput}`;
    expression = expression.replace(/÷/g, '/').replace(/×/g, '*');

    try {
        let result = eval(expression);
        if (!Number.isInteger(result)) result = parseFloat(result.toFixed(10));
        currentInput = result.toString();
        display.value = currentInput;
        previousValue = '';
        operator = null;
        awaitingNextNumber = false;
    } catch {
        display.value = "Error";
        currentInput = '';
        previousValue = '';
        operator = null;
        awaitingNextNumber = false;
    }
}

// ✅ Keyboard input support
document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (!isNaN(key) || key === '.') {
        appendValue(key);
    } else if (['+', '-', '*', '/', '%'].includes(key)) {
        setOperator(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key.toLowerCase() === 'c') {
        clearDisplay();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    display.value = '0';
});
