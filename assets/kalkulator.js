const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

let updateDisplay = () => {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
};

const clearCalculator = () => {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
};

const inputDigit = (digit) => {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
    calculator.displayNumber += digit;
    }
};

const inverseNumber = () => {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
};

const handlerOperator = (operator) => {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    } else {
        alert("Operator sudah ditetapkan!");
    }
};

const performCalculation = () => {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator!");
        return;
    }

    let result = 0;
    if (calculator.operator === '+') {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }

    // objek yang akan dikirimkan sebagai argumen funsgi putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }

    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener("click", function(event) {

        // mendapatkan objek elemen yang diklik
        const target = event.target;

        if (target.classList.contains("clear")) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains("negative")) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains("equals")) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains("operator")) {
            handlerOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    });
};