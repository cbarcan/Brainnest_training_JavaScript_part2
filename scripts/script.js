let displayValue = 0;
let firstValue = null;
let secondValue = null;
let currentOperator = "";
let equalClicked = false;
const display = document.getElementById("display");
const clearButton = document.getElementById("clear");
const buttons = document.querySelectorAll("button");

// function that rounds the number if there are more decimals then numberOfDecimals
const round = (n, numberOfDecimals) => Number(Math.round(n + 'e' + numberOfDecimals) + 'e-' + numberOfDecimals);

// function that converts the number to scientific notation if it has more than 9 digits, or it rounds it if to has more then 9 decimals
const displayNumber = (n) => {
  if (n === "Error") {
    return "Error";
  } else if (Math.round(n).toString().length > 9 || n.toString().includes("e")) {
    return Number(n).toExponential(4).toString();
  } else {
    return round(n, 9 - (Math.round(n).toString().length)).toString();
  }
};

// function taht will be called when you want to make an operation
const operate = (operator, a, b) => {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        return "Error";
      } else {
        return a / b;
      }
  }
}

// function that updates the display
const updateDisplay = () => {
  display.textContent = displayValue;
}

// function that adds a number to the display
const inputNumber = (event) => {
  if (equalClicked) {
    firstValue = null;
    secondValue = null;
    currentOperator = "";
  }
  clearButton.textContent = "C";
  if (displayValue == "0") {
    displayValue = event.target.textContent;
  } else {
    if (displayValue.toString().includes(".")) {
      if (displayValue.toString().length < 10) {
        displayValue += event.target.textContent;
      }
    } else {
      if (displayValue.toString().length < 9) {
        displayValue += event.target.textContent;
      }
    }
  }
  updateDisplay();
  equalClicked = false;
}

/* this function either keeps track of the current operator or actualy does the operation if you already have an operator
and replaces the current operetor with the one you just clicked */
const inputOperator = (event) => {
  if (equalClicked) {
    secondValue = null;
  }
  if (firstValue === null) {
    firstValue = parseFloat(displayValue);
    currentOperator = event.target.textContent;
    displayValue = 0;
  } else {
    if (!currentOperator) {
      currentOperator = event.target.textContent;
    } else {
      if (displayValue === 0) {
        currentOperator = event.target.textContent;
      } else {
        secondValue = parseFloat(displayValue);
        displayValue = displayNumber(operate(currentOperator, firstValue, secondValue));
        updateDisplay();
        firstValue = parseFloat(displayValue);
        currentOperator = event.target.textContent;
        secondValue = 0;
        displayValue = 0;
      }
    }
  }
  equalClicked = false;
}

/* function that does the curent operation and if you press it again you will do the operation again but with the total
as the first value */
const equal = () => {
  equalClicked = true;
  if (equalClicked) {
    if (currentOperator) {
      if (!secondValue) {
        if (displayValue === 0) {
          secondValue = firstValue;
          displayValue = displayNumber(operate(currentOperator, firstValue, secondValue));
          updateDisplay();
          firstValue = parseFloat(displayValue);
          displayValue = 0;
        } else {
          secondValue = parseFloat(displayValue);
          displayValue = displayNumber(operate(currentOperator, firstValue, secondValue));
          updateDisplay();
          firstValue = parseFloat(displayValue);
          displayValue = 0;
        }
      }
      else {
        displayValue = displayNumber(operate(currentOperator, firstValue, secondValue));
        updateDisplay();
        firstValue = parseFloat(displayValue);
        displayValue = 0;
      }
    }
  }
}

// Clear function
// first click on the clear button will clear only the value on the display
// second click will clear all the values that you have entered
const clearDisplay = () => {
  if (clearButton.textContent === "C") {
    clearButton.textContent = "AC";
    displayValue = 0;
  } else {
    firstValue = null;
    secondValue = null;
    currentOperator = "";
    displayValue = 0;
  }
  updateDisplay();
}

// function that will change the sign of the number on the display
const changeSign = () => {
  clearButton.textContent = "C";
  if (firstValue) {
    if (displayValue === 0) {
      displayValue = firstValue;
    }
    displayValue = -parseFloat(displayValue);
    secondValue = displayValue;
  } else {
    displayValue = -parseFloat(displayValue);
  }
  updateDisplay();
}

// this function only divides by 100
const operatePercentage = () => {
  if (currentOperator) {
    if (displayValue === 0) {
      displayValue = firstValue;
      currentOperator = "";
    }
    displayValue = displayNumber(displayValue / 100);
    updateDisplay();
    secondValue = parseFloat(displayValue);
    displayValue = 0;
  } else {
    if (displayValue === 0) {
      if (firstValue === null){
        displayValue = 0;
      } else {
        displayValue = firstValue;
      }
    }
    displayValue = displayNumber(parseFloat(displayValue) / 100);
    updateDisplay();
    firstValue = parseFloat(displayValue);
    displayValue = 0;
  }
}

// this function inserts one dot and one dot only to the display
const inputDot = () => {
  if (displayValue === 0) {
    clearButton.textContent = "C";
    displayValue += ".";
  } else {
    if (!displayValue.includes(".")) {
      clearButton.textContent = "C";
      displayValue += ".";
    }
  }
  updateDisplay();
}

// function that adds event listeners to the buttons to call the functions above when pressed so that the calculator works
const clickButtons = () => {
  buttons.forEach(element => {
    switch (element.className) {
      case "number":
        element.addEventListener("click", inputNumber);
        break;
      case "operator":
        element.addEventListener("click", inputOperator);
        break;
      case "equal":
        element.addEventListener("click", equal);
        break;
      case "clear":
        element.addEventListener("click", clearDisplay);
        break;
      case "sign":
        element.addEventListener("click", changeSign);
        break;
      case "percentage":
        element.addEventListener("click", operatePercentage);
        break;
      case "dot":
        element.addEventListener("click", inputDot)
        break;
    }
  });
}

// function that adds event listeners to the keys so you can use your keyboard to calculate
const pushKeys = () => {
  document.addEventListener("keydown", (event) => {
    switch (event.key.toLowerCase()) {
      case "c":
        event.preventDefault();
        buttons.item(0).click();
        break;
      case "s":
        event.preventDefault();
        buttons.item(1).click();
        break;
      case "%":
        event.preventDefault();
        buttons.item(2).click();
        break;
      case "/":
        event.preventDefault();
        buttons.item(3).click();
        break;
      case "7":
        event.preventDefault();
        buttons.item(4).click();
        break;
      case "8":
        event.preventDefault();
        buttons.item(5).click();
        break;
      case "9":
        event.preventDefault();
        buttons.item(6).click();
        break;
      case "*":
        event.preventDefault();
        buttons.item(7).click();
        break;
      case "4":
        event.preventDefault();
        buttons.item(8).click();
        break;
      case "5":
        event.preventDefault();
        buttons.item(9).click();
        break;
      case "6":
        event.preventDefault();
        buttons.item(10).click();
        break;
      case "-":
        event.preventDefault();
        buttons.item(11).click();
        break;
      case "1":
        event.preventDefault();
        buttons.item(12).click();
        break;
      case "2":
        event.preventDefault();
        buttons.item(13).click();
        break;
      case "3":
        event.preventDefault();
        buttons.item(14).click();
        break;
      case "+":
        event.preventDefault();
        buttons.item(15).click();
        break;
      case "0":
        event.preventDefault();
        buttons.item(16).click();
        break;
      case ".":
        event.preventDefault();
        buttons.item(17).click();
        break;
      case "enter":
        event.preventDefault();
        buttons.item(18).click();
        break;
      case "=":
        event.preventDefault();
        buttons.item(18).click();
        break;
      case "backspace":
        event.preventDefault();
        if (displayValue === 0) {
          displayValue = firstValue;
        }
        displayValue = displayValue.toString().slice(0, -1) === "" ? 0 : displayValue.toString().slice(0, -1);
        updateDisplay();
        break;
    }
  });
}

//main function
const calculator = () => {
  clickButtons();
  pushKeys();
}

calculator()