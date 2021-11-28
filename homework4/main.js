const utils = require("./utils");

const matrix1 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
];

const matrix2 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [10, 11, 12],
];

const matrixForSum1 = [
  [1, 2],
  [3, 4],
];

const matrixForSum2 = [
  [1, 2],
  [3, 4],
];

console.table(utils.sumOfMatrices(matrixForSum1, matrixForSum2));

console.table(utils.sumOfEachRow(matrix1));

console.table(utils.matrixProduct(matrix1, matrix2));
