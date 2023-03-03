const { Router } = require("express");
const InputCalcContract = require("../build/contracts/InputCalc.json");
const Web3 = require("web3");

const router = Router();
const web3 = new Web3("http://127.0.0.1:8545");

router.post("/check", async (req, res) => {
  const networkId = await web3.eth.net.getId();
  const CA = InputCalcContract.networks[networkId].address;
  const abi = InputCalcContract.abi;
  const _deployed = new web3.eth.Contract(abi, CA);
  const _result = await _deployed.methods.getResult().call();
  res.send({ CA, abi, _deployed, _result });
});

router.post("/add", async (req, res) => {
  const { from, input } = req.body;

  const nonce = await web3.eth.getTransactionCount(from);
  const networkId = await web3.eth.net.getId();
  const CA = InputCalcContract.networks[networkId].address;
  const abi = InputCalcContract.abi;
  const deployed = new web3.eth.Contract(abi, CA);
  const data = await deployed.methods.add(input).encodeABI();

  const txObj = {
    nonce,
    from,
    to: CA,
    data,
  };
  res.json(txObj);
});

router.post("/minus", async (req, res) => {
  const { from, input } = req.body;

  const nonce = await web3.eth.getTransactionCount(from);
  const networkId = await web3.eth.net.getId();
  const CA = InputCalcContract.networks[networkId].address;
  const abi = InputCalcContract.abi;
  const deployed = new web3.eth.Contract(abi, CA);
  const data = await deployed.methods.minus(input).encodeABI();

  const txObj = {
    nonce,
    from,
    to: CA,
    data,
  };
  res.json(txObj);
});

router.post("/multiply", async (req, res) => {
  const { from, input } = req.body;

  const nonce = await web3.eth.getTransactionCount(from);
  const networkId = await web3.eth.net.getId();
  const CA = InputCalcContract.networks[networkId].address;
  const abi = InputCalcContract.abi;
  const deployed = new web3.eth.Contract(abi, CA);
  const data = await deployed.methods.multiply(input).encodeABI();

  const txObj = {
    nonce,
    from,
    to: CA,
    data,
  };
  res.json(txObj);
});

router.post("/division", async (req, res) => {
  const { from, input } = req.body;

  const nonce = await web3.eth.getTransactionCount(from);
  const networkId = await web3.eth.net.getId();
  const CA = InputCalcContract.networks[networkId].address;
  const abi = InputCalcContract.abi;
  const deployed = new web3.eth.Contract(abi, CA);
  const data = await deployed.methods.division(input).encodeABI();

  const txObj = {
    nonce,
    from,
    to: CA,
    data,
  };
  res.json(txObj);
});

module.exports = router;
