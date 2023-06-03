let leftNum;
let rightNum;
let operator;
let opSet = false;

const display = document.querySelector("#display");

const numbers = document.querySelectorAll(".num");
numbers.forEach(num=> num.addEventListener("click",concatDigit));

const clear = document.querySelector("#clear");
clear.addEventListener("click", clearDisplay);

const operators = document.querySelectorAll(".oper");
operators.forEach(num=> num.addEventListener("click",setOperator));

function add(a,b) { return a + b; }
function subtract(a,b) { return a - b; }
function multiply(a,b) { return a * b; }
function divide(a,b) { 
    if(b===0)
        return "Divide by zero"
    return a / b; 
}

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

function clearDisplay(e) {
    leftNum = undefined;
    rightNum = undefined;
    operator = undefined;
    opSet = false;
    display.innerHTML = "";
}

function setOperator(e) {
    const pressed = e.target;
    operator = pressed.value;
}