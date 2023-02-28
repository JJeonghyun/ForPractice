const Compiler = require("./compiler");
const Client = require("./web3");

const {
  Test: { abi, bytecode },
} = Compiler.compile("Test.sol");
console.log(abi);

const client = new Client("http://127.0.0.1:8545");

const txObj = { data: bytecode };

const contract = new client.web3.eth.Contract(abi);

async function init() {
  const instance = await contract.deploy(txObj).send({
    from: "0xeD4e7b4e1C87D3F728dF323869b14ecCE0272840",
    gas: 1000000,
  });
}

// init();

async function test() {
  const accounts = await client.web3.eth.getAccounts();

  const ca = "0xcC6371739eC3D80EB44074b96504d62A74fEC9F5";
  const deployed = new client.web3.eth.Contract(abi, ca);

  let text = await deployed.methods.getText().call();

  await deployed.methods.setText("오점뭐").send({ from: accounts[1] });

  text = await deployed.methods.getText().call();

  const balance = await client.web3.eth.getBalance(accounts[1]);
}
test();
