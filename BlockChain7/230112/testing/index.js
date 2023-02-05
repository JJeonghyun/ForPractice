// const arr = ["홍길동", "김철수", "최영희", "이가원", "이재혁"];

// console.log(arr);
// console.log(
//   arr.sort((curr, next) => {
//     if (curr > next) return 1;
//     else if (curr < next) return -1;
//     else return 0;
//   })
// );

// console.log(
//   arr.sort((curr, next) => {
//     if (curr > next) return -1;
//     else if (curr < next) return 1;
//     else return 0;
//   })
// );

// console.log(tempReturn);
// function test(arr, k) {
//   let anwser = [];
//   anwser = [...arr].filter((item) => item % k === 0);
//   if (!anwser.length) anwser.push(-1);
//   return anwser;
// }

// console.log(test([7, 10, 9, 5], 5));
// console.log(test([3, 2, 6], 10));

// console.log("0 ~ 1 사이의 난수 : ", Math.random());
// console.log("원주율 :", Math.PI);

// console.log("절댓값", Math.abs(-4));

// console.log(
//   "매개변수로 넘어온 수 중 가장 큰 값 : ",
//   Math.max(100, 300, 20000, -7)
// );
// console.log(
//   "매개변수로 넘어온 수 중 가장 작은 값 : ",
//   Math.min(100, 300, 20000, -7)
// );

// console.log("pow(n,k) => n의 k제곱 : ", Math.pow(2, 10));

// console.log("반올림", Math.round(3.14));
// console.log("반올림", Math.round(3.54));
// console.log("반올림", Math.round(10.14));

// console.log("root, 제곱근 :", Math.sqrt(64));
// console.log("root, 제곱근 :", Math.sqrt(4));

// let plus1 = "자료 ";
// let plus2 = "구조";
// let plus3 = 3;
// console.log(plus1 + plus2);
// console.log(plus1 + plus3);

// console.log(4 / 3);
// console.log(4 % 3);
// console.log(5 % 3);

// let count = 0;

// console.log(++count); // 더하고 count를 출력한다.
// console.log(--count); // 빼고 count를 출력한다.
// console.log(count++); // 출력하고 count를 하나 늘린다.
// console.log(count--); // 출력하고 count를 하나 뺸다.

// let test = 1;
// // +=, -=, *=, /=, %=, **=
// test += 2;
// console.log(test);
// // test = test + 2;
// test -= 2;
// console.log(test);
// // test = test - 2;
// test *= 2;
// console.log(test);
// // test = test * 2;
// test %= 2;
// console.log(test);
// // test = test % 2;

const test2 = 1;
const test3 = 2;
const test4 = 1;
const test5 = "1";

// console.log(test2 == test3);
// console.log(!(test2 == test3));
// console.log(test2 == test4);
// console.log(test2 == test5);

// console.log(test2 === test5);

// console.log(test2 != test3);
// console.log(test2 != test4);
// console.log(test2 != test5);

// console.log(test2 !== test5);

console.log("test2 보다 초과");
console.log(test2 < test3);
console.log(test2 < test4);
console.log(test2 < test5);

console.log("test2 보다 미만");
console.log(test2 > test3);
console.log(test2 > test4);
console.log(test2 > test5);

console.log("test2 보다 이상");
console.log(test2 <= test3);
console.log(test2 <= test4);
console.log(test2 <= test5);

console.log("test2 보다 이하");
console.log(test2 >= test3);
console.log(test2 >= test4);
console.log(test2 >= test5);
