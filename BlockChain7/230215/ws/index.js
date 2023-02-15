const express = require("express");
const Web3 = require("web3");

const app = express();

const web3 = new Web3("ws://localhost:8888");

web3.eth.subscribe("newBlockHeaders", (error, result) => {
  if (!error) {
    console.log(result);
  } else console.log(error);
});
// web3.eth.subscribe("pendingTransactions", (error, result) => {
//   if (!error) {
//     console.log(result);
//   } else console.log(error);
// });

app.listen(8000, () => {
  console.log("Server Opend");
});
