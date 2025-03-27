const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let currentPlayer = "X"; 


const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]          
];


function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (gameBoard[index] !== "" || !gameActive || currentPlayer !== "X") return;

    makeMove(index, "X");

    if (checkWinner("X")) {
        statusText.textContent = "You Win!";
        gameActive = false;
        return;
    }

    if (gameBoard.every(cell => cell !== "")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = "O";
    statusText.textContent = "Robot's Turn...";
    
    setTimeout(robotMove, 500);
}


function robotMove() {
    if (!gameActive) return;

    let availableCells = gameBoard
        .map((cell, index) => (cell === "" ? index : -1))
        .filter(index => index !== -1);
    console.log(availableCells);
    if (availableCells.length === 0) return;

    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    makeMove(randomIndex, "O");

    if (checkWinner("O")) {
        statusText.textContent = "Robot Wins!";
        gameActive = false;
        return;
    }

    if (gameBoard.every(cell => cell !== "")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = "X";
    statusText.textContent = "Your Turn (X)";
}


function makeMove(index, player) {
    gameBoard[index] = player;
    cells[index].textContent = player;
}

function checkWinner(player) {
    return winningCombos.some(combo =>
        combo.every(index => gameBoard[index] === player)
    );
}


const resetGame=()=> {
    gameBoard.fill("");
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Your Turn (X)";
    cells.forEach(cell => (cell.textContent = ""));
}


cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
