var gameState = {
  occupied: 0,
  currentPlayer: 1,
  board: [[0,0,0],[0,0,0],[0,0,0]],
  p1Name: "Player 1",
  p1Win: 0,
  p2Name: "Player 2",
  p2Win: 0,
  lastWinner: 1
}

var clearBoard = function() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      gameState.board[i][j] = 0;
    }
  }
  var cells = document.getElementsByClassName("cell");
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
  gameState.occupied = 0;
  gameState.currentPlayer = gameState.lastWinner;
  document.getElementById("status").innerHTML = `Player ${gameState.currentPlayer}'s turn`;
}

var checkWin = function (id, player) {
  id = id.split('');
  gameState.board[id[0]][id[1]] = player;
  gameState.occupied++;
  var winner = false;
  for (var i = 0; i < 3; i++) { // Checks columns
    if (gameState.board[0][i] === player && gameState.board[1][i] === player && gameState.board[2][i] === player) {
      winner = true;
    }
  }
  for (var i = 0; i < 3; i++) { // Checks rows
    if (gameState.board[i][0] === player && gameState.board[i][1] === player && gameState.board[i][2] === player) {
      winner = true;
    }
  }
  if (gameState.board[0][0] === player && gameState.board[1][1] === player && gameState.board[2][2] === player) { // Check major diagonal
    winner = true;
  }
  if (gameState.board[2][0] === player && gameState.board[1][1] === player && gameState.board[0][2] === player) { // Check minor diagonal
    winner = true;
  }
  if (winner) { // Check if they won
    
    if (gameState.currentPlayer === 1) {
      gameState.p1Win++;
      alert(`${gameState.p1Name} won!`);
      gameState.lastWinner = 1;
      document.getElementById("p1Win").innerHTML = `${gameState.p1Win}`;
    } else {
      gameState.p2Win++;
      alert(`${gameState.p2Name} won!`);
      gameState.lastWinner = 2;
      document.getElementById("p2Win").innerHTML = `${gameState.p2Win}`;
    }
    clearBoard();
  } else if (gameState.occupied === 9) {
    alert(`Tie detected! Board will reset`);
    clearBoard();
  } else {
    if (gameState.currentPlayer === 1) {
      gameState.currentPlayer++;
    } else {
      gameState.currentPlayer--;
    }
  }
}

var ticTacClick = function() {
  if (this.id === "submitName1" || this.id === "submitName2") {
    var nameProp = `p${this.id.charAt(this.id.length - 1)}Name`;
    gameState[nameProp] = document.getElementById(nameProp).innerHTML;
  } else if (this.id === "reset") {
    clearBoard();
  } else {
    if (this.innerHTML === "") {
      if(gameState.currentPlayer === 1) {
        this.innerHTML = "X";
        checkWin(this.id, gameState.currentPlayer);
        document.getElementById("status").innerHTML = `${gameState.p1Name}'s turn`;
      } else if (gameState.currentPlayer === 2) {
        this.innerHTML = "O";
        checkWin(this.id, gameState.currentPlayer);
        document.getElementById("status").innerHTML = `${gameState.p2Name}'s turn`;
      }
    } else {
      document.getElementById("status").innerHTML = `<em>Nope, can't click there</em>`;
    }
  }
}