"use strict"

const display = document.querySelector(".screen__display");
const numbers = document.querySelectorAll(".number");
const btnComma = document.querySelector(".comma");
const btnDelete = document.querySelector(".delete");
const operands = document.querySelectorAll(".operand");
const btnMinus = document.querySelector(".operand-minus");
const btnReset = document.querySelector(".reset");
const btnEqual = document.querySelector(".equal");

const darkTheme = document.querySelector("#switch1")
const lightTheme = document.querySelector("#switch2")
const dimmedTheme = document.querySelector("#switch3")

let values = [];
let result = 0;

const checkForComma = function (str) {
    let res = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ",") {
            res.push(str[i])
        }
    }
    if (res.length === 0) return true;
    else return false;
};


numbers.forEach(el => el.addEventListener("click", () => {
    if (display.value === 0 || display.value === "0" || display.value === "NaN" || display.value == result) display.value = el.innerText;
    else if (display.value.length <= 12) display.value += el.innerText;
}));

btnComma.addEventListener("click", () => {
    if (checkForComma(display.value)) display.value += ",";
});

btnDelete.addEventListener("click", () => {
    if (display.value.length !== 0) display.value = display.value.slice(0, -1);
});

operands.forEach(el => el.addEventListener("click", () => {
    if (display.value !== "") {
        if (values.length === 2) {
            values.push(display.value.replace(/\,/g, "."));
            values.push(el.innerText.replace(/\x/g, "*"));
            display.value = "";

            result = eval(values.slice(0, 3).join(" "));
            result = Math.round((result + Number.EPSILON) * 100) / 100;
            values = [String(result)];
            values.push(el.innerText.replace(/\x/g, "*"));
        } else {
            values.push(display.value.replace(/\,/g, "."));
            values.push(el.innerText.replace(/\x/g, "*"));
            display.value = "";
        }
    }
}));

btnMinus.addEventListener("click", () => {
    if (display.value === "" || display.value === "NaN") display.value = btnMinus.innerText;
    else {
        if (values.length === 2) {
            values.push(display.value.replace(/\,/g, "."));
            values.push(btnMinus.innerText);
            display.value = "";

            result = eval(values.slice(0, 3).join(" "));
            result = Math.round((result + Number.EPSILON) * 100) / 100;
            values = [String(result)];
            values.push(btnMinus.innerText);
        } else {
            values.push(display.value.replace(/\,/g, "."));
            values.push(btnMinus.innerText);
            display.value = "";
        }
    }
}
);

btnEqual.addEventListener("click", () => {
    if (display.value.length === 0) {
        display.value = result;
        values = [];
    } else {
        values.push(display.value.replace(/\,/g, "."));
        result = eval(values.slice(0, 3).join(" "))
        result = Math.round((result + Number.EPSILON) * 100) / 100;
        display.value = result;
        values = [];
    }
});

btnReset.addEventListener("click", () => {
    values = [];
    result = 0;
    display.value = "";
});

darkTheme.addEventListener("click", () => {
    document.getElementById("stylesheet").href = "css/dark-theme.css";
});

lightTheme.addEventListener("click", () => {
    document.getElementById("stylesheet").href = "css/light-theme.css";
});

dimmedTheme.addEventListener("click", () => {
    document.getElementById("stylesheet").href = "css/dimmed-theme.css";
});
