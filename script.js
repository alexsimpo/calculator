class Calculator {
    constructor(previousOperand, currentOperand) {
        this.previousOperand = previousOperand;
        this.currentOperand = currentOperand;
        this.clear();
    }

    clear() {
        this.current = ''
        this.previous = ''
        this.operation = undefined
    }

    appendNumber(number) {
        if (number === '.' && this.current.includes('.')) return;
        this.current = this.current.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.current === '') return;
        if(this.previous !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previous = this.current;
        this.current = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previous);
        const current = parseFloat(this.current);
        if (isNaN(prev) || isNaN(current)) return;
        switch  (this.operation) {
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            case '*':
                computation = prev * current
                break;
            case '÷':
                computation = prev / current
                break;
            default:
                return
        }
        this.current = computation
        this.operation = undefined;
        this.previous = ''
    }
    
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        const floatNumber = parseFloat(number);
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperand.innerText = this.getDisplayNumber(this.current);
        if(this.operation != null) {
            this.previousOperand.innerText = `${this.getDisplayNumber(this.previous)} ${this.operation}`;
        } else {
            this.previousOperand.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equals = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperand, currentOperand);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
        console.log(button.innerText)
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equals.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})