const readlineSync = require("readline-sync");
const fs = require("fs");
const { pathfinder } = require("./strategy/AStar");

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
    white: "\x1b[37m",
  },
};

const NODES = {
  EMPTY: 0,
  OBSTACLE: 1,
  START: 2,
  END: 3,
  PATH: 4,
};

const SYMBOLS = {
  [NODES.EMPTY]: " ",
  [NODES.OBSTACLE]: "🪵",
  [NODES.START]: "✗",
  [NODES.END]: "✓",
  [NODES.PATH]: "٭",
};

function readMap() {
  const data = JSON.parse(fs.readFileSync("./map.json", "utf-8"));
  return data.map;
}

function drawMap(map) {
  cleanTerminal();
  for (let i = 0; i < map.length; i++) {
    const element = map[i];
    console.log(
      COLORS.fg.white,
      "[",
      element.map((value) => SYMBOLS[value]).join("  "),
      "]",
      COLORS.reset
    );
  }
}

function getCoords(matrix, context) {
  while (true) {
    const getCoordQuestion = `[${context}]: format {row} {col}: `;
    const coords = readlineSync.question(getCoordQuestion);

    try {
      const [x, y] = coords.split(" ").map(Number);
      if (x >= matrix.length || y >= matrix[0].length || y < 0 || x < 0) {
        printError("Not valid coordinates. Out of board.");
      } else if (matrix[x][y] !== 0) {
        printError("Field is not empty.");
      } else return { x, y };
    } catch {
      printError("Not valid format, input should be {row} {col}.");
    }
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function drawPath(map, path) {
  for (let i = 0; i < path.length; i++) {
    const node = path[i];
    await sleep(500);
    if (
      map[node.x][node.y] !== NODES.START &&
      map[node.x][node.y] !== NODES.END
    ) {
      map[node.x][node.y] = NODES.PATH;
    }
    drawMap(map);
  }
}

function askPlayAgain() {
  const agree = readlineSync.keyInYNStrict("Would you like to try again?");
  if (agree) startGame();
}

async function startGame() {
  const map = readMap();
  drawMap(map);

  const startCoords = getCoords(map, "start-coords");
  map[startCoords.x][startCoords.y] = NODES.START;
  drawMap(map);

  const endCoords = getCoords(map, "end-coords");
  map[endCoords.x][endCoords.y] = NODES.END;
  drawMap(map);

  try {
    const path = pathfinder(map, startCoords, endCoords);
    await drawPath(map, path);
    printInfo(
      `From ${startCoords.x}-${startCoords.y} to ${endCoords.x}-${endCoords.y} with ${path.length} steps!`
    );
  } catch (error) {
    printError(error.message);
  }

  askPlayAgain();
}

startGame();
