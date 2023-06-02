let leftNum;
let rightNum;
let operator;

const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".num");
numbers.forEach(num=> num.addEventListener("click",concatDigit));

function add(a,b) { return a + b; }
function subtract(a,b) { return a - b; }
function multiply(a,b) { return a * b; }
function divide(a,b) { return a / b; }

function operate(op, a, b) {
    switch(op){
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
        default:
            return "ERROR: Invalid Operator";
    }
}

function concatDigit(e){
    const pressed = e.target;
    let number = pressed.value;
    display.innerHTML = display.innerHTML + number;
}