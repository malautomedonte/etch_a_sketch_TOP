const mainContainer = document.querySelector(".container-grid-main");
const btnCreate = document.querySelector(".btn-create-new-grid");
const btnClearGrid = document.querySelector(".btn-clear-existing-grid");

let rows = 16;
let columns = 16;

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
        square.classList.add("hovered");
      });
    }

    mainContainer.appendChild(row);
  }
};

const clearGrid = function () {
  document.querySelectorAll(".square").forEach((square) => {
    square.classList.remove("hovered");
  });
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
