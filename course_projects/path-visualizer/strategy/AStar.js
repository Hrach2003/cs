// not the best implementation
// just for simplicity
class PriorityQueue {
  constructor() {
    this.queue = [];
    this.priorities = new Map();
    this.compare = (a, b) => this.priorities.get(a) - this.priorities.get(b);
  }

  isEmpty() {
    return this.queue.length <= 0;
  }

  peek() {
    return this.queue[0];
  }

  poll() {
    return this.queue.shift();
  }

  add(item, priority = 1) {
    this.priorities.set(item, priority);
    this.queue.push(item);

    this.queue.sort(this.compare);
  }

  changePriority(item, priority) {
    this.priorities.set(item, priority);
    this.queue.sort(this.compare);
  }

  hasValue(item) {
    return this.queue.includes(item);
  }
}

function calculateHeuristic(currentNode, endNode) {
  const euclideanDistance = Math.sqrt(
    Math.pow(Math.abs(currentNode.x - endNode.x), 2) +
      Math.pow(Math.abs(currentNode.y - endNode.y), 2)
  );

  return euclideanDistance;
}

function uniqueKey(coords) {
  return `${coords.x}-${coords.y}`;
}

function nodeNeighbors(map, coords) {
  const neighbors = [];

  if (coords.x + 1 < map.length && map[coords.x + 1][coords.y] !== 1)
    neighbors.push({ x: coords.x + 1, y: coords.y });

  if (coords.x - 1 >= 0 && map[coords.x - 1][coords.y] !== 1)
    neighbors.push({ x: coords.x - 1, y: coords.y });

  if (coords.y + 1 < map[0].length && map[coords.x][coords.y + 1] !== 1)
    neighbors.push({ x: coords.x, y: coords.y + 1 });

  if (coords.y - 1 >= 0 && map[coords.x][coords.y - 1] !== 1)
    neighbors.push({ x: coords.x, y: coords.y - 1 });

  return neighbors;
}

function extractPath(backtrackingPath, endNode) {
  const path = [endNode];

  let currentNode = endNode;
  while (backtrackingPath[uniqueKey(currentNode)]) {
    currentNode = backtrackingPath[uniqueKey(currentNode)];
    path.push(currentNode);
  }

  return path.reverse();
}

function AStar(map, startCoords, endCoords) {
  const backtrackingPath = {};
  const visitedCoords = {};
  const openSet = new PriorityQueue();

  startCoords.g = 0;
  startCoords.f = startCoords.g + calculateHeuristic(startCoords, endCoords);

  openSet.add(startCoords, startCoords.f);

  while (!openSet.isEmpty()) {
    const currentCoords = openSet.poll();

    if (uniqueKey(currentCoords) === uniqueKey(endCoords)) {
      return extractPath(backtrackingPath, endCoords);
    }

    visitedCoords[uniqueKey(currentCoords)] = currentCoords;

    nodeNeighbors(map, currentCoords).forEach((coords) => {
      if (visitedCoords[uniqueKey(coords)]) return;

      const gScore = currentCoords.g + 1;

      if (!openSet.hasValue(coords)) {
        backtrackingPath[uniqueKey(coords)] = currentCoords;
        coords.g = gScore;
        coords.f = coords.g + calculateHeuristic(coords, endCoords);
        openSet.add(coords, coords.f);
      }

      if (gScore < coords.g && openSet.hasValue(coords)) {
        backtrackingPath[uniqueKey(coords)] = currentCoords;
        coords.g = gScore;
        coords.f = coords.g + calculateHeuristic(coords, endCoords);
        openSet.changePriority(coords, coords.f);
      }
    });
  }

  throw new Error(
    `No path from ${startCoords.x}-${startCoords.y} to ${endCoords.x}-${endCoords.y}.`
  );
}

module.exports = {
  pathfinder: AStar,
};
