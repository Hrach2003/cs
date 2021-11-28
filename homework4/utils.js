function matrixProduct(matrix1, matrix2) {
  let product = [];

  for (let i = 0; i < matrix1.length; i++) {
    product.push([]);
    for (let j = 0; j < matrix2[0].length; j++) {
      let cellValue = 0;

      for (let k = 0; k < matrix1[i].length; k++) {
        cellValue += matrix1[i][k] * matrix2[k][j];
      }

      product[i].push(cellValue);
    }
  }

  return product;
}

function sumOfMatrices(matrix1, matrix2) {
  const sum = [];

  for (let i = 0; i < matrix1.length; i++) {
    sum.push([]);
    for (let j = 0; j < matrix1[i].length; j++) {
      sum[i][j] = matrix1[i][j] + matrix2[i][j];
    }
  }

  return sum;
}

function sumOfRow(array) {
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }

  return sum;
}

function sumOfEachRow(matrix) {
  const result = [];

  for (let i = 0; i < matrix.length; i++) {
    const sum = sumOfRow(matrix[i]);
    result.push(sum);
  }

  return result;
}

module.exports = {
  sumOfEachRow,
  sumOfMatrices,
  matrixProduct,
};
