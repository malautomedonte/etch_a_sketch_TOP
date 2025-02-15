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
  for (let i = 0; i <= rows; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.style.display = "flex";

    for (let j = 0; j < columns; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      row.appendChild(square);

      square.addEventListener("mouseenter", () => {
        if (randomCheckBox.checked) {
          square.style.backgroundColor = getRandomColor();
        } else {
          square.style.backgroundColor = selectedColor;
        }
      });

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
