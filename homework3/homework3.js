// video explanation here: https://youtu.be/0F9gK6UlwbI
function isPrime(number) {
  for (let i = 2; i < Math.ceil(Math.sqrt(number)); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

function findPrimeNumbers(startNumber, endNumber) {
  const primeNumbers = [];

  for (let i = startNumber; i < endNumber; i++) {
    if (isPrime(i)) {
      primeNumbers.push(i);
    }
  }

  return primeNumbers;
}

function reverse(number) {
  let string = String(number);

  let reverseString = "";

  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += string[i];
  }

  return Number(reverseString);
}

function isPalindrome(number) {
  return reverse(number) === number;
}

/**
 *
 * @param {string} a
 * @param {string} b
 */
function addBinary(a, b) {
  if (a.length > b.length) {
    b = "0".repeat(a.length - b.length) + b;
  } else {
    a = "0".repeat(b.length - a.length) + a;
  }

  let carry = 0;
  let answer = "";

  for (let i = a.length - 1; i >= 0; i--) {
    const b_i = Number(b[i]);
    const a_i = Number(a[i]);

    const sum = a_i + b_i + carry;

    if (sum === 3) {
      answer = "1" + answer;
      continue;
    }

    if (sum === 2) {
      carry = 1;
      answer = "0" + answer;
      continue;
    }

    carry = 0;
    answer = sum + answer;
  }

  return answer;
}

function calculateInverse(binaryNumber) {
  let answer = "";

  for (let i = 0; i < binaryNumber.length; i++) {
    answer += binaryNumber[i] === "0" ? "1" : "0";
  }

  return answer;
}

function calculateTwosComplement(binaryNumber) {
  const inverse = calculateInverse(binaryNumber);
  const twosComplement = addBinary(inverse, "1");

  return twosComplement;
}

// console.log(calculateTwosComplement("101"));

// let a =
//   "000010100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101";

// console.log(inverse(a))
// let b =
//   "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011";

// let answer =
//   "110111101100010011000101110110100000011101000101011001000011011000001100011110011010010011000000000";

// console.log(addBinary(a, b));
// console.log(addBinary(a, b) === answer)

// console.log(isPalindrome(121));

// console.log(reverse(123));
// console.log(reverse(12223));

// console.log(isPrime(123));
// console.log(isPrime(11));

// console.log(findPrimeNumbers(11, 123));
