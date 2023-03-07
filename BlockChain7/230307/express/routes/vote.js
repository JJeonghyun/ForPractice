const { Router } = require("express");
const Web3 = require("web3");

const router = Router();

const VoteContract = require("../build/contracts/Vote.json");

const web3 = new Web3("http://127.0.0.1:8545");

router.post("/send", async (req, res) => {
  const networkId = await web3.eth.net.getId();
  const CA = VoteContract.networks[networkId].address;
  const abi = VoteContract.abi;

  const deployed = new web3.eth.Contract(abi, CA);
  const dataObj = {};

  switch (req.body.method) {
    case "candidates":
      dataObj.candidates = await deployed.methods.candidates().call();
      break;
    case "totalVotes":
      dataObj.totalVotes = await deployed.methods
        .totalVotes(req.body.item)
        .call();
      dataObj.CA = CA;
      break;
    case "voteForCandidate":
      console.log(req.body.from);
      console.log(req.body.candidate);
      console.log(CA);
      dataObj.nonce = await web3.eth.getTransactionCount(req.body.from);
      dataObj.to = CA;
      dataObj.from = req.body.from;
      dataObj.data = await deployed.methods
        .voteForCandidate(req.body.candidate)
        .encodeABI();
      break;
    default:
      break;
  }

  res.json(dataObj);
});

module.exports = router;
