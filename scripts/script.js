let displayValue = 0;
let firstValue = null;
let secondValue = null;
let currentOperator = "";
let equalClicked = false;
const display = document.getElementById("display");
const clearButton = document.getElementById("clear");
const buttons = document.querySelectorAll("button");

//function that rounds the number if there are more decimals then numberOfDecimals
const round = (n, numberOfDecimals) => Number(Math.round(n + 'e' + numberOfDecimals) + 'e-' + numberOfDecimals);

//function that converts the number to scientific notation if it has more than 9 digits, or it rounds it if to has more then 9 decimals
const displayNumber = (n) => {
  if (n === "Error") {
    return "Error";
  } else if (Math.round(n).toString().length > 9) {
    return Number(n).toExponential(4).toString();
  } else {
    return round(n, 9 - (Math.round(n).toString().length)).toString();
  }
};

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const percentage = (a) => a / 100;

const operate = (operator, a, b) => {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      if (b === 0) {
        return "Error";
      } else {
        return divide(a, b);
      }
  }
}

const updateDisplay = () => {
  display.textContent = displayValue;
}

const clickButton = () => {
  buttons.forEach(element => {
    switch (element.className) {
      case "number":
        element.addEventListener("click", event => {
          if (equalClicked) {
            firstValue = null;
            secondValue = null;
            currentOperator = "";
          }
          clearButton.textContent = "C";
          if (displayValue == "0") {
            displayValue = event.target.textContent;
            updateDisplay();
          } else {
            if (displayValue.includes(".")){
              if (displayValue.length < 10) {
                displayValue += event.target.textContent;
                updateDisplay();
              }
            } else {
              if (displayValue.length < 9) {
                displayValue += event.target.textContent;
                updateDisplay();
              }
            }
          }
          equalClicked = false;
        });
        break;
      case "operator":
        element.addEventListener("click", event => {
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
        });
        break;
      case "equal":
        element.addEventListener("click", () => {
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
        });
        break;
      case "clear":
        element.addEventListener("click", () => {
          if (clearButton.textContent === "C") {
            clearButton.textContent = "AC";
            displayValue = 0;
            updateDisplay();
          } else {
            firstValue = null;
            secondValue = null;
            currentOperator = "";
            updateDisplay();
          }
        });
        break;
      case "sign":
        element.addEventListener("click", () => {
          if (firstValue) {
            if (displayValue === 0) {
              displayValue = firstValue;
            }
            displayValue = -parseFloat(displayValue);
            secondValue = displayValue;
            updateDisplay();
          } else {
            displayValue = -parseFloat(displayValue);
            updateDisplay();
          }
        });
        break;
      case "percentage":
        element.addEventListener("click", () => {
          //so I can use percentage again on result
          if (displayValue === 0) {
            displayValue = firstValue;
          }
          displayValue = displayNumber(percentage(parseFloat(displayValue)));
          updateDisplay();
          firstValue = parseFloat(displayValue);
          displayValue = 0;
        });
        break;
      case "dot":
        element.addEventListener("click", () => {
          if (displayValue === 0) {
            clearButton.textContent = "C";
            displayValue += ".";
            updateDisplay();
          } else {
            if (!displayValue.includes(".")) {
              clearButton.textContent = "C";
              displayValue += ".";
              updateDisplay();
            }
          }
        })
        break;
    }
  });
}

clickButton()