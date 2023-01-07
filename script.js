//TODO: addPlayer conditions, wincheck diagonal conditionals,
//start guard clause

const playerFactory = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;

  return { getName, getMark };
};

const Gameboard = (() => {
  let board = [Array("", "", ""), Array("", "", ""), Array("", "", "")];
  let players = [];
  let player_switch = 0;

  const getBoard = () => board;
  const getPlayers = () => players;
  const getSwitch = () => player_switch;
  const setSwitch = (num) => {
    player_switch = num;
  };

  const addPlayer = () => {
    let name = prompt(`Player ${getSwitch() + 1} name:`);
    if (getSwitch() == 1) {
      if (name === players[0].getName()) {
        addPlayer();
      }
    }
    let mark = getSwitch() === 0 ? "X" : "O";
    let p = playerFactory(name, mark);
    setSwitch(getSwitch() + 1);
    players.push(p);
  };

  const start = () => {
    const divboard = document.querySelector("#board");
    if (divboard.childNodes.length != 1) {
      return;
    }
    while (getSwitch() < 2) {
      addPlayer();
    }
    setSwitch(0);
    turntext.textContent = `${players[0].getName()} Turn`;
    displayController.renderBoard(getBoard());
  };
  return { getBoard, getPlayers, getSwitch, setSwitch, start };
})();

const displayController = (() => {
  const renderBoard = (gameboard) => {
    if (board.childNodes.length != 1) {
      return;
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.dataset.row = i;
        div.dataset.col = j;
        div.addEventListener("click", (e) => {
          if (e.target.textContent != "") {
            return;
          }

          let row = e.target.dataset.row;
          let col = e.target.dataset.col;
          const players = Gameboard.getPlayers();
          let pswitch = Gameboard.getSwitch();
          e.target.textContent = players[pswitch].getMark();
          gameboard[row][col] = players[pswitch].getMark();
          pswitch ? Gameboard.setSwitch(0) : Gameboard.setSwitch(1);
          turntext.textContent = Gameboard.getSwitch()
            ? `${players[1].getName()} Turn`
            : `${players[0].getName()} Turn`;
          winCheck(Gameboard.getBoard());
        });
        board.appendChild(div);
      }
    }
  };

  const endGame = (p) => {
    setTimeout(() => {
      alert(`${p.getName()} has won!`);
    }, 1);
    setTimeout(() => {
      location.reload();
    }, 1);
  };

  const winCheck = (gameboard) => {
    const players = Gameboard.getPlayers();
    for (let i = 0; i < 3; i++) {
      if (gameboard[i].every((e) => e === gameboard[i][0] && e != "")) {
        if (gameboard[i][0] === players[0].getMark()) {
          endGame(players[0]);
        } else {
          endGame(players[1]);
        }
      }
    }

    let col1 = [gameboard[0][0], gameboard[1][0], gameboard[2][0]];
    let col2 = [gameboard[1][0], gameboard[1][1], gameboard[1][2]];
    let col3 = [gameboard[2][0], gameboard[2][1], gameboard[2][2]];

    if (col1.every((e) => e === col1[0] && e != "")) {
      if (col1[0] === players[0].getMark()) {
        endGame(players[0]);
      } else {
        endGame(players[1]);
      }
    } else if (col2.every((e) => e === col2[0] && e != "")) {
      if (col2[0] === players[0].getMark()) {
        endGame(players[0]);
      } else {
        endGame(players[1]);
      }
    } else if (col3.every((e) => e === col3[0] && e != "")) {
      if (col3[0] === players[0].getMark()) {
        endGame(players[0]);
      } else {
        endGame(players[1]);
      }
    }

    let diag1 = [gameboard[0][0], gameboard[1][1], gameboard[2][2]];
    let diag2 = [gameboard[0][2], gameboard[1][1], gameboard[2][0]];

    if (diag1.every((e) => e === diag1[0] && e != "")) {
      if (diag1[0] === players[0].getMark()) {
        endGame(players[0]);
      } else {
        endGame(players[1]);
      }
    } else if (diag2.every((e) => e === diag2[0] && e != "")) {
      if (diag2[0] === players[0].getMark()) {
        endGame(players[0]);
      } else {
        endGame(players[1]);
      }
    }
  };

  return { renderBoard };
})();

Gameboard.start();
