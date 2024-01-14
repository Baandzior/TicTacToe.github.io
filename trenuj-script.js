document.addEventListener('DOMContentLoaded', function () {
    let timerElement = document.querySelector('.timer');
    let seconds = 0, minutes = 0, hours = 0;
    let timer = setInterval(function() {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes === 60) {
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

    const board = ['', '', '', '', '', '', '', '', ''];
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => playerMove(cell, index));
    });

    function playerMove(cell, index) {
        if (board[index] === '') {
            cell.innerHTML = currentPlayer === 'X' ? '<i class="icon-cancel"></i>' : '<i class="icon-circle-empty"></i>';
            board[index] = currentPlayer;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            checkForWinner();
        }
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
                setTimeout(resetGame, 1000);
                return;
            }
        }

        if (!board.includes('')) {
            setTimeout(resetGame, 1000);
        }
    }

    function resetGame() {
        cells.forEach(cell => cell.innerHTML = '');
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
        currentPlayer = 'X';
    }
});