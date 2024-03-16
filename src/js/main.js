// Declare Variables

let currentPlayer = 'X';
let gameEnded = false;
let gameMoves = ['', '', '', '', '', '', '', '', ''];


// Get Dom

const boxes = document.querySelectorAll("td");
const table = document.querySelector("table");
const gameScore = document.querySelector("#game-score");
const resetBtn = document.querySelector("#reset-btn");
let player = document.querySelector("#player");
let text = document.querySelector("#text");


// Add EventListeners to Table Boxes

boxes.forEach((box, i) => {
    box.addEventListener("click", () => {
        if (!gameEnded && gameMoves[i] === '') {
            gameMoves[i] = currentPlayer;
            box.textContent = currentPlayer;

            // Check for Winner
            if (gemeWin()) {
                table.style.display = "none";
                gameScore.style.display = "block";
                player.textContent = currentPlayer;
                text.textContent = "--- WINNER ---";
                gameEnded = true;
            }


            // Check for draw
            else if (gameDraw()) {
                table.style.display = "none";
                gameScore.style.display = "block";
                player.textContent = "X / O";
                text.textContent = "--- DRAW ---";
                gameEnded = true;
            }

            // Player Switch
            else {
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            }
        }
    });
});

// Check for Winner Function

function gameWin() {
    const winnerCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
        [0, 4, 8], [2, 4, 6]              // diagonals
    ];

    return winnerCombos.some((combo) => {
        return combo.every((index) => {
            return gameMoves[index] === currentPlayer;
        });
    });
}


// Check for Draw Function

function gameDraw() {
    return gameMoves.every((move) => move !== '');
}


// Reset Game Function

function resetGame() {
    table.style.display = "block";
    gameScore.style.display = "none";
    currentPlayer = "X";
    gameEnded = false;

    gameMoves = ['', '', '', '', '', '', '', '', ''];
    boxes.forEach((box) => box.textContent = '');
}


// Event Listener for Reset Button

resetBtn.addEventListener("click", resetGame);