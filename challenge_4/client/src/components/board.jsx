import TopRow from './topRow.jsx'
import Row from './row.jsx'

class Board extends React.Component {

  // A `constructor` method is expected on all ES6 classes
  // When React instantiates the component,
  // it will pass `props` to the constructor

  constructor(props) {
    // Equivalent to ES5's React.Component.call(this, props)
                   //   0     1        2       3       4      5        6
    const board = [['blank','blank','blank','blank','blank','blank','blank'], // 0
                   ['blank','blank','blank','blank','blank','blank','blank'], // 1
                   ['blank','blank','blank','blank','blank','blank','blank'], // 2
                   ['blank','blank','blank','blank','blank','blank','blank'], // 3
                   ['blank','blank','blank','blank','blank','blank','blank'], // 4
                   ['blank','blank','blank','blank','blank','blank','blank'], // 5
                   1];                                                        // 6
    // Equivalent to ES5's React.Component.call(this, props)
                   //   0     1        2       3       4      5        6
    super(props);
    this.state = {
      board
    };
  }

  checkWinner(board, lastMove) {
    // Last move looks like [row, col]
    // check left only if row > 2
    // check right only if row < 4
    // check 
    console.log(`In CheckWinner, here's what Last Move is:`, lastMove)
    var sLeft = [lastMove[0], Math.max(0, lastMove[1] - 3)];
    var sTop = [Math.max(0, lastMove[0] - 3), lastMove[1]];
    var findStartingMDiag = function(pos) {
      while(pos[0] > 0 && pos[1] > 0) {
        pos[0] -= 1;
        pos[1] -= 1;
        console.log(pos);
      }
      return pos;
    }
    var sMDiag = findStartingMDiag(lastMove.slice());
    var findStartingmDiag = function(pos) {
      while(pos[0] <= 5 && pos[1] > 0) {
        pos[0] += 1;
        pos[1] -= 1;
        console.log(pos);
      }
      return pos;
    }
    var smDiag = findStartingmDiag(lastMove.slice());

    console.log(`Start left: `, sLeft);
    console.log(`Start Top: `, sTop);
    console.log(`Start Major Diag: `, sMDiag);
    console.log(`Start minor Diag: `, smDiag);

    for (var i = 0; i < 4; i++) {
      if (board[sLeft[0]][sLeft[1] + i] === board[sLeft[0]][sLeft[1] + i + 1]  && board[sLeft[0]][sLeft[1] + i] !== 'blank') {
        if (board[sLeft[0]][sLeft[1] + i + 1] === board[sLeft[0]][sLeft[1] + i + 2]) {
          if (board[sLeft[0]][sLeft[1] + i + 2] === board[sLeft[0]][sLeft[1] + i + 3]) {
            return true;
          }
        }
      }  // Checks row wins
    }
    for (var i = 0; i < 4; i++) {
      if (board[sTop[0] + i][sTop[1]] === board[sTop[0] + i + 1][sTop[1]] && board[sLeft[0] + i][sLeft[1]] !== 'blank') {
        if (board[sTop[0] + i + 1][sTop[1]] === board[sTop[0] + i + 2][sTop[1]]) {
          if (board[sTop[0] + i + 2][sTop[1]] === board[sTop[0] + i + 3][sTop[1]]) {
            return true;
          }
        }
      }  // Checks column wins
    }
    for (var i = 0; i < 4; i++) {
      if (board[sMDiag[0] + i][sMDiag[1] + i] === board[sMDiag[0] + i + 1][sMDiag[1] + i + 1] && board[sLeft[0] + i][sLeft[1] + i] !== 'blank') {
        if (board[sMDiag[0] + i + 1][sMDiag[1] + i + 1] === board[sMDiag[0] + i + 2][sMDiag[1] + i + 2]) {
          if (board[sMDiag[0] + i + 2][sMDiag[1] + i + 2] === board[sMDiag[0] + i + 3][sMDiag[1] + i + 3]) {
            return true;
          }
        }
      }  // Checks MD wins
    }
    for (var i = 0; i < 4; i++) {
      if (smDiag[0] - i - 3 > 0) {
        if (board[smDiag[0] - i][smDiag[1] + 1] === board[smDiag[0] - i - 1][smDiag[1] + i + 1] && board[sLeft[0] - i][sLeft[1] + i] !== 'blank') {
          if (board[smDiag[0] - i - 1][smDiag[1] + i + 1] === board[smDiag[0] - i - 2][smDiag[1] + i+ 2]) {
            if (board[smDiag[0] - i - 2][smDiag[1] + i + 2] === board[smDiag[0] - i - 3][smDiag[1] +i +3]) {
              return true;
            }
          }
        }  // Checks mD wins  
      }
    }
    return false;
  }

  clearBoard() {
    this.setState({
      state: INITIAL_STATE
    })
  }

  onClickHandler(e) {
    // console.log(`clickie`, e.target);
    var j = Number(e.target.getAttribute('id'));
    // console.log(j);
    var doneWithTurn = false;
    var lastMove = [];
    const INITIAL_STATE = [['blank','blank','blank','blank','blank','blank','blank'], // 0
                           ['blank','blank','blank','blank','blank','blank','blank'], // 1
                           ['blank','blank','blank','blank','blank','blank','blank'], // 2
                           ['blank','blank','blank','blank','blank','blank','blank'], // 3
                           ['blank','blank','blank','blank','blank','blank','blank'], // 4
                           ['blank','blank','blank','blank','blank','blank','blank'], // 5
                           1];
    
    if (this.state.board[0][j] === 'blank') {
      this.setState(state => {
        const board = state.board.map((row, i) => {
          if (i === 6) {
            // console.log(`Currentplayer row: `, row);
            return row === 1 ? 2 : 1;
          } else {
            return row.map((box, k) => {
              if (j === k && !doneWithTurn && (state.board[i][k] === 'blank' && state.board[i + 1][k] !== 'blank')) {
                doneWithTurn = true;
                lastMove = [i, j];
                // console.log(`Placed a piece, here's it's row, cal`, lastMove);
                return state.board[6] === 1 ? 'red' : 'blue';
              } else {
                return box;
              }
            });
          } 
        });
        
        if (this.checkWinner(board, lastMove)) {
          alert('Winner!');
          return {
            board: INITIAL_STATE,
          };
        } else {
          return {
            board,
          };
        }
        
      });
    }
  }

  // Every class component mus t have a `render` method
  // Stateless functional components are pretty much just this method
  render() {
    return (
      <div>
        <TopRow onclick={this.onClickHandler.bind(this)} spaces={this.state.board[0]}/>
        <Row spaces={this.state.board[1]}/>
        <Row spaces={this.state.board[2]}/>
        <Row spaces={this.state.board[3]}/>
        <Row spaces={this.state.board[4]}/>
        <Row spaces={this.state.board[5]}/>
      </div>
    );
  }
}

export default Board;