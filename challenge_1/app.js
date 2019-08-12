var currentPlayer = 1;
var board = [[0,0,0],[0,0,0],[0,0,0]];
var occupied = 0;

var clearBoard = function() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      board[i][j] = 0;
    }
  }
  var cells = document.getElementsByClassName("cell");
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
  document.getElementById("status").innerHTML = `Player ${currentPlayer}'s turn`;
  occupied = 0;
}

var checkWin = function (id, player) {
  id = id.split('');
  board[id[0]][id[1]] = player;
  occupied++;
  var winner = false;
  for (var i = 0; i < 3; i++) { // Checks columns
    if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
      winner = true;
    }
  }
  for (var i = 0; i < 3; i++) { // Checks rows
    if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
      winner = true;
    }
  }
  if (board[0][0] === player && board[1][1] === player && board[2][2] === player) { // Check major diagonal
    winner = true;
  }
  if (board[2][0] === player && board[1][1] === player && board[0][2] === player) { // Check minor diagonal
    winner = true;
  }
  if (winner) { // Check if they won
    alert(`Player ${currentPlayer} won!`);
    clearBoard();
  } else if (occupied === 9) {
    alert(`Tie detected! Board will reset`);
    clearBoard();
  } else {
    if (currentPlayer === 1) {
      currentPlayer++;
    } else {
      currentPlayer--;
    }
  }
}

var cellClick = function() {
  if (this.innerHTML === "") {
    if(currentPlayer === 1) {
      this.innerHTML = "X";
      checkWin(this.id, currentPlayer);
      document.getElementById("status").innerHTML = `Player ${currentPlayer}'s turn`;
    } else if (currentPlayer === 2) {
      this.innerHTML = "O";
      checkWin(this.id, currentPlayer);
      document.getElementById("status").innerHTML = `Player ${currentPlayer}'s turn`;
    }
  } else {
    document.getElementById("status").innerHTML = `<em>Nope, can't click there</em>`;
  }
}