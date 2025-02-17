"use strict";

const mainContainer = document.querySelector(".container-grid-main");
const btnCreate = document.querySelector(".create-new-grid");
const btnClearGrid = document.querySelector(".clear-existing-grid");
const colorPicker = document.querySelector("#favcolor");
const randomCheckBox = document.querySelector("#toggleRandom");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

let rows = 16;
let columns = 16;
let selectedColor = colorPicker.value;
let drawingEnabled = true;

// Modal related functions
const openModal = function () {
  console.log("button clicked");

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener("click", openModal);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Color handling functions
const getRandomColor = function () {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
};

const getUserColor = function () {
  selectedColor = colorPicker.value;
};

// Grid creation function
const initializeGrid = function () {
  mainContainer.innerHTML = "";

  for (let i = 0; i <= rows; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.style.display = "flex";

    for (let j = 0; j < columns; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      row.appendChild(square);
    }

    mainContainer.appendChild(row);
  }
};

const clearGrid = function () {
  document.querySelectorAll(".square").forEach((square) => {
    square.style.backgroundColor = "";
  });
};

const initializeApp = function () {
  // Event delegation, optimize memory usage, listener attached to mainContainer instead of every square.
  mainContainer.addEventListener(
    "mouseenter",
    (event) => {
      if (!drawingEnabled) return;

      if (event.target.classList.contains("square")) {
        if (randomCheckBox.checked) {
          event.target.style.backgroundColor = getRandomColor();
        } else {
          event.target.style.backgroundColor = selectedColor;
        }
      }
    },
    true
  ); // "true" sets the listener to the capture phase to catch events sooner

  mainContainer.addEventListener("mouseup", (event) => {
    if (event.button === 2) {
      drawingEnabled = false;
    }
  });

  mainContainer.addEventListener("mouseup", (event) => {
    if (event.button === 0) {
      drawingEnabled = true;
    }
  });

  mainContainer.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  btnCreate.addEventListener("click", () => {
    const gridSize = parseInt(
      prompt("Please enter the size of the new grid (100 max)")
    );

    if (gridSize > 0 && gridSize <= 100) {
      mainContainer.innerHTML = ""; // Clears the grid
      rows = gridSize;
      columns = gridSize;
      initializeGrid();
    } else {
      alert("Invalid input! Please enter a number between 1 and 100.");
    }
  });

  btnClearGrid.addEventListener("click", clearGrid);
  colorPicker.addEventListener("input", getUserColor);
  btnCloseModal.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
};

initializeGrid();
initializeApp();
