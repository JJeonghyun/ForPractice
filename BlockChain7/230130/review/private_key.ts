import cryptoJS from "crypto-js";

const privateKey: string = cryptoJS.lib.WordArray.random(32).toString();
console.log(privateKey);
console.log(privateKey.length);
