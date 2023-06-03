let leftNum;
let rightNum;
let operator;
let opSet = false;
let rightStarted = false;

const display = document.querySelector("#display");

const numbers = document.querySelectorAll(".num");
numbers.forEach(num=> num.addEventListener("click",concatDigit));

const clear = document.querySelector("#clear");
clear.addEventListener("click", clearAll);

const operators = document.querySelectorAll(".oper");
operators.forEach(num=> num.addEventListener("click",setOperator));

const equals = document.querySelector("#eq");
equals.addEventListener("click", completeExpression);

const dec = document.querySelector("#dec");
dec.addEventListener("click", concatDec);

//functions for arithmetic operations
function add(a,b) { return a + b; }
function subtract(a,b) { return a - b; }
function multiply(a,b) { return a * b; }
function divide(a,b) { 
    if(b===0)
        return "Divide by zero"
    return a / b; 
}

//evalutates expression based on operator
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
    if(opSet && !rightStarted) {
        clearDisplay();
        rightStarted = true;
    }
    const pressed = e.target;
    let number = pressed.value;
    display.innerHTML = display.innerHTML + number;
}

function concatDec(e){
    if(opSet && !rightStarted) {
        clearDisplay();
        rightStarted = true;
    }
    if(!display.innerHTML.includes("."));
        display.innerHTML = display.innerHTML + ".";
}

//
function resetValues(){
    leftNum = undefined;
    rightNum = undefined;
    operator = undefined;
    opSet = false;
    rightStarted = false;
}

function clearDisplay() {
    display.innerHTML = "";
}
function clearAll(e) {
    clearDisplay();
    resetValues();
}

function evaluate (){
    ans = operate(operator, leftNum, rightNum)
    console.log(ans);
    return ans;
}


//sets an operand to the value shown in display
function inputNum() {
    let input = display.innerHTML;
    let num;
    if(input.includes("."))
        num = parseFloat(input);
    else
        num = parseInt(input);
    if(leftNum === undefined)
        leftNum = num;
    else
        rightNum = num;
}

//sets the operator based on button pressed
function setOperator(e) {
    //evaluates expression if rightNum is defined
    if(rightStarted){
        inputNum();
        let answer = evaluate();
        resetValues();
        display.innerHTML = answer;
        leftNum = answer;
    }
    inputNum();
    const pressed = e.target;
    operator = pressed.value;
    opSet = true;
}
 
function completeExpression(e) {
    inputNum();
    display.innerHTML = evaluate();
    resetValues();
    inputNum();
}