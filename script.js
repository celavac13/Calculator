"use strict"

const display = document.querySelector(".screen__display");
const numbers = document.querySelectorAll(".number");
const btnComma = document.querySelector(".comma");
const btnDelete = document.querySelector(".delete");
const operands = document.querySelectorAll(".operand");
const btnMinus = document.querySelector(".operand-minus");
const btnReset = document.querySelector(".reset");
const btnEqual = document.querySelector(".equal");

const darkTheme = document.querySelector("#switch1");
const lightTheme = document.querySelector("#switch2");
const dimmedTheme = document.querySelector("#switch3");


const numbersDrag = document.querySelectorAll(".header__themes__num__drag");
const numHolder = document.querySelector(".header__themes__num");
let startX;
let checkForTheme = 1;

let values = {};
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

const getingResult = function (obj) {
    if (obj.operand === "+") {
        return Number(obj.first) + Number(obj.second);
    }
    if (obj.operand === "-") {
        return Number(obj.first) - Number(obj.second);
    }
    if (obj.operand === "*") {
        return Number(obj.first) * Number(obj.second);
    }
    if (obj.operand === "/") {
        return Number(obj.first) / Number(obj.second);
    }
}

numbers.forEach(el => el.addEventListener("click", () => {
    if (display.value === "-" && values.second === "-") {
        display.value += el.innerText;
    } else if (display.value === "-" && Object.entries(values).length === 0) {
        display.value += el.innerText;
    } else if (display.value == 0 || display.value == String(result).replace(/\./g, ",") || display.value === "+" || display.value === "/" || display.value === "*") {
        display.value = el.innerText;
    } else if (display.value === "-" && Object.entries(values).length > 0) {
        display.value = el.innerText;
    } else if (display.value.length <= 12) {
        display.value += el.innerText;
    }
}));

btnComma.addEventListener("click", () => {
    if (checkForComma(display.value)) {
        display.value += ",";
    }
});

btnDelete.addEventListener("click", () => {
    if (display.value.length !== 0) {
        display.value = display.value.slice(0, -1);
    }
});

operands.forEach(el => el.addEventListener("click", () => {
    if (display.value === "-" && values.operand !== "-") {
        display.value === "";
    } else if (display.value === "+" || display.value === "/" || display.value === "*") {
        display.value = el.innerText.replace(/\x/g, "*");
        values.operand = el.innerText.replace(/\x/g, "*");
    } else if (display.value !== "") {
        if (Object.entries(values).length === 2) {
            values.second = display.value.replace(/\,/g, ".");
            values.first = getingResult(values);
            values.operand = el.innerText.replace(/\x/g, "*");
            delete values.second;
            display.value = el.innerText.replace(/\x/g, "*");

            result = values.first;
            result = Math.round((result + Number.EPSILON) * 100) / 100;
        } else {
            if (display.value.replace(/\,/g, ".") !== "-") {
                values.first = display.value.replace(/\,/g, ".");
            }
            values.operand = el.innerText.replace(/\x/g, "*");
            display.value = el.innerText.replace(/\x/g, "*");
            delete values.second;
        }
    }
}));

btnMinus.addEventListener("click", () => {
    if (display.value === "" && Object.entries(values).length === 0) {
        display.value = btnMinus.innerText;
    } else if (display.value !== "" && display.value !== "-" && display.value !== "+" && display.value !== "*" && display.value !== "/") {
        if (Object.entries(values).length === 2) {
            values.second = display.value.replace(/\,/g, ".");
            values.first = getingResult(values);
            values.operand = btnMinus.innerText.replace(/\x/g, "*");
            delete values.second;
            display.value = btnMinus.innerText;

            result = values.first;
            result = Math.round((result + Number.EPSILON) * 100) / 100;
        } else {
            values.first = display.value.replace(/\,/g, ".");
            values.operand = btnMinus.innerText.replace(/\x/g, "*");
            display.value = btnMinus.innerText;
        }
    } else if (display.value === "+" || display.value === "/" || display.value === "*") {
        display.value = btnMinus.innerText;
        values.second = btnMinus.innerText;
    } else if (display.value === "-") {
        values.second = "-";
        display.value = btnMinus.innerText;
    }
}
);

btnEqual.addEventListener("click", () => {
    if (Object.entries(values).length >= 2) {
        if (display.value !== "" && display.value !== "-" && display.value !== "+" && display.value !== "/" && display.value !== "*") {
            values.second = display.value.replace(/\,/g, ".");
            result = getingResult(values);
            result = Math.round((result + Number.EPSILON) * 100) / 100;
            display.value = String(result).replace(/\./g, ",");
            values = {};
        } else {
            result = Number(values.first);
            result = Math.round((result + Number.EPSILON) * 100) / 100;
            display.value = String(result).replace(/\./g, ",");
            values = {};
        }
    }
});

btnReset.addEventListener("click", () => {
    values = {};
    result = 0;
    display.value = "";
});

darkTheme.addEventListener("click", () => {
    document.getElementById("stylesheet").href = "css/dark-theme.css";
    checkForTheme = 1;
});

lightTheme.addEventListener("click", () => {
    document.getElementById("stylesheet").href = "css/light-theme.css";
    checkForTheme = 2;
});

dimmedTheme.addEventListener("click", () => {
    document.getElementById("stylesheet").href = "css/dimmed-theme.css";
    checkForTheme = 3;
});

numbersDrag.forEach(el => {
    el.addEventListener("mousedown", (e) => {
        startX = e.pageX;
    })
});

numHolder.addEventListener("mouseup", (e) => {
    const diffX = startX - e.pageX;
    if (checkForTheme === 1 && diffX < 0) {
        lightTheme.click();
        lightTheme.checked = true;
    } else if (checkForTheme === 2 && diffX < 0) {
        dimmedTheme.click();
        dimmedTheme.checked = true;
    } else if (checkForTheme === 2 && diffX > 0) {
        darkTheme.click();
        darkTheme.checked = true;
    } else if (checkForTheme === 3 && diffX > 0) {
        lightTheme.click();
        lightTheme.checked = true;
    }
});

