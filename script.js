let leftNum;
let rightNum;
let operator;
let state = "init"

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
        return "Div by zero"
    return a / b; 
}

function getState() {
    return state;
}

//evalutates expression based on operator
function operate(op, a, b) {
    console.log(`${a}, ${b}`)
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
    if(state === "init" || state ==="display-ans") {
        clearAll();
        state ="input-left"
    }
    if(state === "input-mid") {
        clearDisplay();
        state ="input-right"
    }
    const pressed = e.target;
    let number = pressed.value;
    display.innerHTML = display.innerHTML + number;
}

function concatDec(e){
    if(state === "init" || state ==="display-ans") {
        clearAll();
        state ="input-left"
    }
    if(state === "input-mid") {
        clearDisplay();
        state ="input-right"
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
    if(!opSet)
        return "";
    ans = operate(operator, leftNum, rightNum)
    if (ans === "Div by zero")
        resetValues();
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
    if(state === "input-left" || state === "display-ans"){
        leftNum = num;
        console.log(num);
    }
    else if(state==="input-right")
        rightNum = num;
}

//sets the operator based on button pressed
function setOperator(e) {
    if(display.innerHTML === "")
        return;
    //evaluates expression if rightNum is defined
    if(state === "input-right"){
        inputNum();
        let answer = evaluate();
        resetValues();
        display.innerHTML = answer;
        leftNum = answer;
        state === "display-ans";
    }
    if(state  === "input-left" || state === "display-ans")
    {
        inputNum();
        state = "input-mid";
    }
    const pressed = e.target;
    operator = pressed.value;
    opSet = true;
}
 
function completeExpression(e) {
    if(state === "input-right"){
        inputNum();
        display.innerHTML = evaluate();
        resetValues();
        inputNum();
        state = "display-ans";
    }
}