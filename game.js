document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    const cells = document.querySelectorAll(".cell");
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let isGameActive = true;  // Dodanie zmiennej isGameActive tutaj
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    console.log("Game initialized");

    function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        console.log(`Clicked cell index: ${clickedCellIndex}`);

        if (gameState[clickedCellIndex] !== "" || !isGameActive) {
            console.log("Cell already taken or game not active");
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerText = currentPlayer;

        if (checkWin()) {
            alert(`${currentPlayer} wygrywa!`);
            isGameActive = false;
        } else if (gameState.every(cell => cell !== "")) {
            alert("Remis!");
            isGameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    function checkWin() {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function resetGame() {
        gameState = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.innerText = "";
        });
        currentPlayer = "X";
        isGameActive = true;
    }

    cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });

    console.log("Event listeners added to cells");
});