document.addEventListener('DOMContentLoaded', function () {
        let timerElement = document.querySelector('.timer');
        let seconds = 0, minutes = 0, hours = 0;
        let timer = setInterval(function() {
            seconds++;
            if (seconds == 60) {
                minutes++;
                seconds = 0;
            }
            if (minutes == 60) {
                hours++;
                minutes = 0;
            }
            timerElement.textContent = 
                (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + 
                (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + 
                (seconds > 9 ? seconds : "0" + seconds);
        }, 1000);

        window.onbeforeunload = function() {
            clearInterval(timer);
        };
});

let playerScore = 0;
let computerScore = 0;

document.addEventListener('DOMContentLoaded', () => {
    const board = ['', '', '', '', '', '', '', '', ''];
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => playerMove(cell, index));
    });

    function playerMove(cell, index) {
        if (board[index] === '' && currentPlayer === 'X') {
            cell.innerHTML = '<i class="icon-cancel"></i>';
            board[index] = 'X';
            currentPlayer = 'O';
            if (!checkForWinner()) {
                setTimeout(computerMove, 700);
            }
        }
    }

    function findWinningMove(playerSymbol) {

        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] === playerSymbol && board[a] === board[b] && !board[c]) {
                 return c;
            } else if (board[a] === playerSymbol && board[a] === board[c] && !board[b]) {
                return b;
            } else if (board[b] === playerSymbol && board[b] === board[c] && !board[a]) {
                return a;
            }
        }
        return null;
    }


    function computerMove() {
        let move = null;
        let availableCells = board.map((e, i) => e === '' ? i : null).filter(e => e !== null);

        move = findWinningMove('O');
        
        if (move === null) {
            move = findWinningMove('X');
        }

        if (move === null && availableCells.length > 0) {
            move = availableCells[Math.floor(Math.random() * availableCells.length)];
        }

        if (move !== null) {
            cells[move].innerHTML = '<i class="icon-circle-empty"></i>';
            board[move] = 'O';
            currentPlayer = 'X';
        }
    
        checkForWinner();
    }

    function checkForWinner() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let condition of winConditions) {
            let [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                endGame(board[a]);
                return true;
            }
        }

        if (!board.includes('')) {
            endGame('Draw');
            return true;
        }
        return false;
    }

    function endGame(result) {
        const resultBanner = document.getElementById('result-banner');
        const resultText = document.getElementById('result-text');
        const playerScoreBoard = document.getElementById('scoreboard-gracz');
        const computerScoreBoard = document.getElementById('scoreboard-komputer');
        switch (result) {
            case 'X':
                resultText.textContent = 'WYGRANA!!';
                playerScore++;
                playerScoreBoard.textContent = `Gracz: ${playerScore}`;
                break;
            case 'O':
                resultText.textContent = 'PORAŻKA :(';
                computerScore++;
                computerScoreBoard.textContent = `Komputer: ${computerScore}`;
                break;
            case 'Draw':
                resultText.textContent = 'REMIS';
                break;
        }
        resultBanner.style.display = 'block';
    }

    document.getElementById('result-banner').addEventListener('click', () => {
        document.getElementById('result-banner').style.display = 'none';
        resetGame();
    });

    function resetGame() {
        cells.forEach(cell => cell.textContent = '');
    
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    
        currentPlayer = 'X';

        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => playerMove(cell, index), { once: true });
        });
    }
});