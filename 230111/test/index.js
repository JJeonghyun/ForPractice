// 10진수 > 2진수
function toBinary(n) {
  let tempArr = [];
  while (n > 0) {
    tempArr.push(n % 2);
    n = parseInt(n / 2);
  }
  return tempArr.reverse();
}

// 2진수 > 10진수
function binaryToNum(n) {
  let num = 0;
  let tempBinary = [];
  tempBinary = n.toString().split();
  //   let tempBinary = tempArr.reverse();
  for (let i = 0; i < tempBinary.length; i++) {
    let tempNum = 0;
    tempNum = 2 ** i;
    num += tempBinary[i] * tempNum;
  }
  return num;
}

// 10진수 > 16진수
function toHex(n) {
  let tempArr = [];
  while (n > 0) {
    let remain = n % 16;
    switch (remain) {
      case 10:
        remain = "A";
        break;
      case 11:
        remain = "B";
        break;
      case 12:
        remain = "C";
        break;
      case 13:
        remain = "D";
        break;
      case 14:
        remain = "E";
        break;
      case 15:
        remain = "F";
        break;
      default:
        break;
    }
    tempArr.push(remain);
    n = parseInt(n / 16);
  }
  return tempArr.reverse();
}

// 16진수 > 10진수
function hexToNum(n) {}

// 10진수 > 2진수
console.log(toBinary(13));

// 2진수 > 10진수
console.log(binaryToNum(1101));

// 10진수 > 16진수
console.log(toHex(13));
