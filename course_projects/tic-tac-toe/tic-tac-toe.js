// @ts-check
const readlineSync = require("readline-sync");

function printError(message) {
  console.log(COLORS.fg.red, "[error]:", COLORS.reset, message);
}

function printInfo(message) {
  console.log(COLORS.fg.green, "[finished]:", COLORS.reset, message);
}

function cleanTerminal() {
  console.log("\u001b[2J\u001b[0;0H");
}

const COLORS = {
  reset: "\x1b[0m",
  fg: {
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    green: "\x1b[32m",
  },
};

function getNonEmptyAnswer(question) {
  while (true) {
    const name = readlineSync.question(question);
    if (!name) {
      printError("Answer cannot be empty.");
    } else return name;
  }
}

function initGame() {
  const BOARD = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  const playerXName = getNonEmptyAnswer("Player X username: ");
  const playerOName = getNonEmptyAnswer("Player O username: ");

  const playerX = {
    symbol: "x",
    name: playerXName,
    nextTurn() {
      GAME.currentPlayer = playerO;
    },
  };

  const playerO = {
    symbol: "o",
    name: playerOName,
    nextTurn() {
      GAME.currentPlayer = playerX;
    },
  };

  const GAME = {
    currentPlayer: playerX,
  };

  return { GAME, BOARD };
}

function drawBoard(board) {
  cleanTerminal();
  for (let i = 0; i < board.length; i++) {
    const element = board[i];
    console.log(COLORS.fg.yellow, "[", element.join(" | "), "]", COLORS.reset);
  }
}

function getPlayerMove(board, player) {
  while (true) {
    const getCoordQuestion = `[player-${player.symbol}] ${player.name}: format: {row} {col}: `;
    const coords = readlineSync.question(getCoordQuestion);

    try {
      const [x, y] = coords.split(" ").map(Number);
      if (x >= board[0].length || y >= board.length || y < 0 || x < 0) {
        printError("Not valid coordinates. Out of board.");
      } else if (board[x][y] !== " ") {
        printError("Field is not empty.");
      } else return { x, y };
    } catch {
      printError("Not valid format, input should be {col}-{row}.");
    }
  }
}

function isWinningRow(board, row, symbol) {
  for (let i = 0; i < board[row].length; i++) {
    if (board[row][i] !== symbol) return false;
  }

  return true;
}

function isWinningCol(board, col, symbol) {
  for (let i = 0; i < board.length; i++) {
    if (board[i][col] !== symbol) return false;
  }

  return true;
}

function checkWinner(board, game) {
  let rightDiagonal = 0;
  let leftDiagonal = 0;

  for (let i = 0; i < board.length; i++) {
    if (isWinningRow(board, i, game.currentPlayer.symbol)) return true;
    if (isWinningCol(board, i, game.currentPlayer.symbol)) return true;

    if (board[i][i] === game.currentPlayer.symbol) rightDiagonal++;
    if (board[i][board.length - i - 1] === game.currentPlayer.symbol)
      leftDiagonal++;
  }

  return rightDiagonal === board.length || leftDiagonal === board.length;
}

function askPlayAgain() {
  const agree = readlineSync.keyInYNStrict("Would you like to play again?");
  if (agree) startGame();
}

function startGame() {
  cleanTerminal();
  const { GAME, BOARD } = initGame();

  while (true) {
    drawBoard(BOARD);
    const move = getPlayerMove(BOARD, GAME.currentPlayer);
    BOARD[move.x][move.y] = GAME.currentPlayer.symbol;
    const isWinner = checkWinner(BOARD, GAME);

    if (isWinner) {
      drawBoard(BOARD);
      printInfo(
        `${GAME.currentPlayer.name} (player-${GAME.currentPlayer.symbol}) is the winner!`
      );
      break;
    }

    GAME.currentPlayer.nextTurn();
  }

  askPlayAgain();
}

startGame();
