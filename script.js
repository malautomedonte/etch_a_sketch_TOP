const mainContainer = document.querySelector(".container-grid-main");
const btnCreate = document.querySelector(".btn-create-new-grid");
const btnClearGrid = document.querySelector(".btn-clear-existing-grid");
const colorPicker = document.querySelector("#favcolor");
const randomCheckBox = document.querySelector("#toggleRandom");

let rows = 16;
let columns = 16;
let selectedColor = colorPicker.value;

const getUserColor = function () {
  selectedColor = colorPicker.value;
};

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

// Event delegation, optimize memory usage, listener attached to mainContainer instead of every square.
mainContainer.addEventListener(
  "mouseenter",
  (event) => {
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
  if (event.button === 2 && event.target.classList.contains("square")) {
    event.target.style.backgroundColor = "";
  }
});

const clearGrid = function () {
  document.querySelectorAll(".square").forEach((square) => {
    square.style.backgroundColor = "";
  });
};

const getRandomColor = function () {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
};

initializeGrid();

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

colorPicker.addEventListener("input", getUserColor);
