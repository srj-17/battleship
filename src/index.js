import "./domController.js";
const body = document.querySelector("body");

// make gameboard in the dom
const container = document.createElement("div");
container.classList.toggle("container");
body.appendChild(container);

const header = document.createElement("div");
header.classList.toggle("header");
header.textContent = "BattleShip";
container.appendChild(header);
