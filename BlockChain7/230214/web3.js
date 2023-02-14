const request = axios.create({
  method: "POST",
  baseURL: "http://localhost:8080",
  header: {
    "content-type": "application/json",
  },
});
// const request = axios.create({
//   method: "POST",
//   baseURL: "http://localhost:8545",
//   header: {
//     "content-type": "application/json",
//   },
// });

const accountsListElem = document.getElementById("accounts-list");
const sendTransactionElem = document.getElementById("send-transaction");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");

// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8080"));

web3.eth.extend({
  property: "txpool",
  methods: [
    {
      name: "content",
      call: "txpool_content",
    },
    {
      name: "inspect",
      call: "txpool_inspect",
    },
    {
      name: "status",
      call: "txpool_status",
    },
  ],
});

async function getAccount() {
  const data = await web3.eth.getAccounts();
  accountsListElem.innerHTML = "";
  // data.forEach(async (item, index) => {
  //   const balance = await web3.eth.getBalance(item);
  //   accountsListElem.innerHTML += `<li>${item} : ${balance} Wei (${
  //     balance / Math.pow(10, 18)
  //   } ETH)</li>`;
  // });
  for (let i = 0; i < data.length; i++) {
    const balance = await web3.eth.getBalance(data[i]);
    accountsListElem.innerHTML += `<li>${data[i]} : ${balance} Wei (${
      balance / Math.pow(10, 18)
    } ETH)</li>`;
  }
  sendTransactionElem.onclick = async () => {
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "personal_unlockAccount",
        params: [data[0], "wkdwjdgus1"],
      },
    });

    const transaction = await web3.eth.sendTransaction({
      from: data[0],
      to: data[1],
      value: web3.utils.toWei("1"),
    });
    console.log(transaction);
    web3.eth.txpool.content().then(console.log).catch(console.error);
    await getAccount();
  };

  startElem.onclick = async () => {
    web3.eth.txpool.content().then(console.log).catch(console.error);

    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "miner_setEtherbase",
        params: [data[0]],
      },
    });

    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "miner_start",
      },
    });
  };

  stopElem.onclick = async () => {
    await request({
      data: {
        id: 1337,
        jsonrpc: "2.0",
        method: "miner_stop",
      },
    });
  };
}

getAccount();
