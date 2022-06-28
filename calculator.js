$("document").ready(() => {
  createCalculator();
  let result = 0;
  let prevEntry = 0;
  let operation = null;
  let currentEntry = "0";

  updateScreen(result);

  $(".button").on("click", (evt) => {
    let buttonPressed = $(evt.target).html();
    if (buttonPressed === "C") {
      result = 0;
      currentEntry = "0";
    } else if (buttonPressed === "CE") {
      currentEntry = "0";
    } else if (buttonPressed === "Back") {
      currentEntry = currentEntry.substring(0, currentEntry.length - 1);
    } else if (buttonPressed === "+/-") {
      currentEntry *= -1;
    } else if (buttonPressed === ".") {
      currentEntry += ".";
    } else if (isNumber(buttonPressed)) {
      if (currentEntry === "0") currentEntry = buttonPressed;
      else currentEntry = currentEntry + buttonPressed;
    } else if (buttonPressed === "=") {
      currentEntry = operate(prevEntry, currentEntry, operation);
      operation = null;
    } else if (buttonPressed === "%") {
      currentEntry = currentEntry / 100;
    } else if (buttonPressed === "sqrt") {
      currentEntry = Math.sqrt(currentEntry);
    } else if (buttonPressed === "1/x") {
      currentEntry = 1 / currentEntry;
    } else if (buttonPressed === "pi") {
      currentEntry = Math.PI;
    } else if (isOperator(buttonPressed)) {
      prevEntry = parseFloat(currentEntry);
      operation = buttonPressed;
      currentEntry = "";
    }
    updateScreen(currentEntry);
  });
});

updateScreen = (display) => {
  let displayValue = display.toString();
  $(".screen").html(displayValue.substring(0, 10));
};

isNumber = (value) => {
  return !isNaN(value);
};

isOperator = (value) => {
  return value === "/" || "*" || "+" || "-";
};

operate = (a, b, operation) => {
  a = parseFloat(a);
  b = parseFloat(b);
  console.log("a = ", a, "b = ", b);
  if (operation === "+") return a + b;
  if (operation === "-") return a - b;
  if (operation === "/") return a / b;
  if (operation === "*") return a * b;
};

createCalculator = () => {
  const title = $("<p>jQuery Calculator</p>");
  $(".calculator").append(title);

  for (let i = 0; i < 6; i++) {
    const rowDiv = createDiv("calc-row");
    $(".calculator").append(rowDiv);
    console.log(rowDiv);
  }

  const screenDiv = createDiv("screen", "0123456789");
  $(".calc-row").first().append(screenDiv);

  for (let i = 0; i < 5; i++) {
    const btn = createDiv("button");
    $(".calc-row:not(:first)").append(btn);
  }

  // Row No.1
  $(".calc-row:eq(1) > .button:lt(2)").addClass("orange");
  $(".calc-row:eq(1) > .button:eq(0)").html("C");
  $(".calc-row:eq(1) > .button:eq(1)").html("CE");
  $(".calc-row:eq(1) > .button:eq(2)").addClass("backspace");
  $(".calc-row:eq(1) > .button:eq(2)").html("Back");
  $(".calc-row:eq(1) > .button:eq(3)").addClass("plus-minus");
  $(".calc-row:eq(1) > .button:eq(3)").html("+/-");
  $(".calc-row:eq(1) > .button:eq(4)").html("%");

  // Row No.2
  $(".calc-row:eq(2) > .button:eq(0)").html("7");
  $(".calc-row:eq(2) > .button:eq(1)").html("8");
  $(".calc-row:eq(2) > .button:eq(2)").html("9");
  $(".calc-row:eq(2) > .button:eq(3)").addClass("divice");
  $(".calc-row:eq(2) > .button:eq(3)").html("/");
  $(".calc-row:eq(2) > .button:eq(4)").html("sqrt");

  // Row No.3
  $(".calc-row:eq(3) > .button:eq(0)").html("4");
  $(".calc-row:eq(3) > .button:eq(1)").html("5");
  $(".calc-row:eq(3) > .button:eq(2)").html("6");
  $(".calc-row:eq(3) > .button:eq(3)").addClass("multiply");
  $(".calc-row:eq(3) > .button:eq(3)").html("*");
  $(".calc-row:eq(3) > .button:eq(4)").addClass("inverse");
  $(".calc-row:eq(3) > .button:eq(4)").html("sqrt");

  // Row No.4
  $(".calc-row:eq(4) > .button:eq(0)").html("1");
  $(".calc-row:eq(4) > .button:eq(1)").html("2");
  $(".calc-row:eq(4) > .button:eq(2)").html("3");
  $(".calc-row:eq(4) > .button:eq(3)").addClass("minus");
  $(".calc-row:eq(4) > .button:eq(3)").html("-");
  $(".calc-row:eq(4) > .button:eq(4)").addClass("pi");
  $(".calc-row:eq(4) > .button:eq(4)").html("PI");

  // Row No.5
  $(".calc-row:eq(5) > .button:eq(0)").addClass("zero").html("0");
  $(".calc-row:eq(5) > .button:eq(1)").addClass("decimal").html(".");
  $(".calc-row:eq(5) > .button:eq(2)").addClass("plus").html("+");
  $(".calc-row:eq(5) > .button:eq(3)").addClass("equal").html("=");
  $(".calc-row:eq(5) > .button:eq(4)").remove();
};

createDiv = (divClass, divContent) => {
  const div = $(
    `<div ${divClass ? `class="${divClass}"` : ""}>${
      divContent ? divContent : ""
    }</div>`
  );
  return div;
};
