const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart');
const pvpBtn = document.getElementById('pvp');
const pvcBtn = document.getElementById('pvc');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = false;
let gameMode = ''; // "pvp" for Player vs Player, "pvc" for Player vs Computer

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

// Handle game mode selection
pvpBtn.addEventListener('click', () => startGame('pvp'));
pvcBtn.addEventListener('click', () => startGame('pvc'));

function startGame(mode) {
    gameMode = mode;
    gameActive = true;
    board.fill(null);
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
    });
}

function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if (!gameActive || board[index]) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        endGame();
    } else if (board.every(cell => cell)) {
        message.textContent = 'Draw!';
        endGame();
    } else {
        switchPlayer();
        if (gameMode === 'pvc' && currentPlayer === 'O') {
            computerMove();
        }
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningConditions.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function endGame() {
    gameActive = false;
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}

function computerMove() {
    let availableCells = board.map((cell, index) => cell === null ? index : null).filter(cell => cell !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    board[randomIndex] = currentPlayer;
    document.querySelector(`[data-index="${randomIndex}"]`).textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `Computer (${currentPlayer}) wins!`;
        endGame();
    } else if (board.every(cell => cell)) {
        message.textContent = 'Draw!';
        endGame();
    } else {
        switchPlayer();
    }
}

// Restart the game
restartBtn.addEventListener('click', () => {
    gameActive = false;
    message.textContent = '';
    cells.forEach(cell => cell.textContent = '');
});
