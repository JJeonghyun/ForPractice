const keythereum = require("keythereum");
const path = require("path");

const address = "0xd1c7925dacaab963043d1402333da475b787ee55";

const keyObj = keythereum.importFromFile(address, __dirname);

const privateKey = keythereum.recover("123456789", keyObj);

console.log(privateKey.toString("hex"));
