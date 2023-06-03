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

const back = document.querySelector("#back");
back.addEventListener("click", backspace);

//functions for arithmetic operations
function add(a,b) { return a + b; }
function subtract(a,b) { return a - b; }
function multiply(a,b) { return a * b; }
function divide(a,b) { 
    if(b===0)
        return "D.B.Z."
    return a / b; 
}

function getState() {
    return state;
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

//adds digit to display if there's room
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
    if(display.innerHTML.length < 11)
        display.innerHTML = display.innerHTML + number;
    else
        triggerOverflow();
}

//adds decimal place to display if there's room
function concatDec(e){
    if(state === "init" || state ==="display-ans") {
        clearAll();
        state ="input-left"
    }
    if(state === "input-mid") {
        clearDisplay();
        state ="input-right"
    }
    if(!display.innerHTML.includes(".")){
        if(display.innerHTML.length < 11)
            display.innerHTML = display.innerHTML + ".";
        else if (display.innerHTML.length >= 11)
            triggerOverflow();
    }
}


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
    state = "init";
}

function evaluate (){
    if(!opSet)
        return "";
    ans = operate(operator, leftNum, rightNum)
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
    console.log(num);
    if(state === "input-left"){
        leftNum = num;
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
        state = "display-ans";
    }
    else if(state  === "input-left")
    {
        inputNum();
        state = "input-mid";
    }
    else if(state === "display-ans"){
        state = "input-mid";
    }
    else if(state === "init")
        return;
    const pressed = e.target;
    operator = pressed.value;
    opSet = true;
}

//Displays overflow and resets values;
function triggerOverflow(){
    console.log(leftNum + " " + rightNum)
    resetValues();
    state = "init";
    display.innerHTML = "Overflow";
}

//rounds float based on how much space there is
function trimFloat(num){
    wholeNumLength = num.toFixed(0).toString().length;
    maxDecLength = Math.max( 0 , 10-wholeNumLength);
    return trimZeroes(num.toFixed(maxDecLength));
}

//Trims unnecessary floating zeroes
function trimZeroes(num){
    //convert to string
    numString = num.toString();
    //check if number is a float (if not do nothing)
    if (numString.includes(".")) {
        //iterates over string from end deleting zeroes
        //until it comes to a non-zero number or decimal point
        
        for(let i = numString.length - 1; i >= 0; i--){
            if(numString[i] == "0"){
                numString=numString.substring(0,i-1);
            }
            else if(numString[i] == "."){
                numString=numString.substring(0,i-1);
                break;
            }
            else
                break;
        }
    }
    //convert back to float
    return parseFloat(numString);
}
 
//Calculates expression answer then displays
//number that fits in the space available
//or displays "Overflow" if answer is too big
function completeExpression(e) {
    if(state === "input-right"){
        inputNum();
        ans = evaluate();
        if(ans <= 99999999999)
        {
            ans=trimFloat(ans)
            display.innerHTML = ans;
        }
        else {
            triggerOverflow();
            return;
        }
        resetValues();
        state = "input-left";
        inputNum();
        if(ans !== "D.B.Z.")
            state = "display-ans";
        else
            state = "init"
    }
}

function backspace(e){
    console.log("backspace");
    if(state === "input-left" || state === "input-right"){
        str = display.innerHTML;
        if(str.length === 1 || str.length === 0){
            display.innerHTML = "";
        }
        else{
            str = str.substring(0,(str.length-1));
            display.innerHTML = str;
        }
    }
}