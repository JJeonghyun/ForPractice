const request = axios.create({
  method: "POST",
  baseURL: "http://localhost:8545",
  header: {
    "content-type": "application/json",
  },
});

const walletListElem = document.getElementById("wallet-list");
const accountElem = document.getElementById("account");
const balanceElem = document.getElementById("balance");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const selectElem = document.getElementById("select-account");
const txInfoElem = document.getElementById("tx-info");
const txBlockInfoElem = document.getElementById("block-info");
const blockInfoBox = document.getElementById("block-info-box");
const txInfoBox = document.getElementById("tx-info-box");

let isCreating = false;
let interval;
let accounts = [];

async function getBlockByNumber() {
  const {
    data: { result },
  } = await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "eth_blockNumber",
    },
  });

  const block = await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "eth_getBlockByNumber",
      params: [result, true],
    },
  });
  console.log("block : ", block.data.result);
  const tempBlockHeight = document.createElement("div");
  const tempBlockDif = document.createElement("div");
  const tempBlockHash = document.createElement("div");

  blockInfoBox.style.padding = "10px 0";

  tempBlockHeight.innerHTML =
    "블록의 높이 : " + parseInt(block.data.result.number, 16);
  tempBlockDif.innerHTML =
    "블록의 난이도 : " + parseInt(block.data.result.difficulty, 16);
  tempBlockHash.innerHTML = "Hash 값 : " + block.data.result.hash;

  tempBlockHash.append(tempBlockHeight);
  tempBlockDif.append(tempBlockHash);
  blockInfoBox.append(tempBlockDif);
}

async function getTransaction(_txHash) {
  const {
    data: { result },
  } = await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "eth_getTransactionReceipt",
      params: [_txHash],
    },
  });
  console.log("tx hash : ", result);

  const tempTxFrom = document.createElement("div");
  const tempTxTo = document.createElement("div");
  const tempBlockNumber = document.createElement("div");

  txInfoBox.style.padding = "10px 0";

  tempTxFrom.innerHTML = "보낸 주소 : " + result.from;
  tempTxTo.innerHTML = "받은 주소 : " + result.to;
  tempBlockNumber.innerHTML =
    "블록의 높이 : " + parseInt(result.blockNumber, 16);

  tempTxTo.append(tempTxFrom);
  tempBlockNumber.append(tempTxTo);
  txInfoBox.append(tempBlockNumber);
}

async function mineStop() {
  await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "miner_stop",
      params: [],
    },
  });
  clearInterval(interval);
  interval = undefined;
}

async function getBalance(_account) {
  const {
    data: { result },
  } = await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: [_account, "latest"],
    },
  });
  balanceElem.innerHTML =
    parseInt(parseInt(result, 16) / Math.pow(10, 15)) / 1000;
}

async function getWallet(_account) {
  // if (interval) mineStop();
  //   if (interval !== undefined) mineStop();
  accountElem.innerHTML = _account;

  await getBalance(_account);
  selectElem.innerHTML = "";
  accounts.forEach((item) => {
    if (item !== _account)
      selectElem.innerHTML += `<option value="${item}">${item}</option>`;
  });
}

async function getAccounts() {
  const {
    data: { result },
  } = await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "eth_accounts",
    },
  });
  walletListElem.innerHTML = "";
  result.forEach((item) => {
    walletListElem.innerHTML += `<li onclick="getWallet('${item}')">${item}</li>`;
  });
  accounts = result;
}
getAccounts();
// mineStop();

document.forms["new-wallet"].onsubmit = async (e) => {
  e.preventDefault();
  if (e.target["new-pw"].value.length < 5 || isCreating) return;
  isCreating = true;
  await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "personal_newAccount",
      params: [e.target["new-pw"].value],
    },
  });
  await getAccounts();
  e.target["new-pw"].value = "";
  isCreating = false;
};

startBtn.onclick = async () => {
  if (accountElem.innerHTML === "") return;
  await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "miner_setEtherbase",
      params: [accountElem.innerHTML],
    },
  });
  await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "miner_start",
      params: [],
    },
  });
  interval = setInterval(() => {
    getBalance(accountElem.innerHTML);
  }, 2000);
};
stopBtn.onclick = mineStop;

document.forms["transaction"].onsubmit = async (e) => {
  e.preventDefault();
  let to = selectElem.value;
  if (e.target["transaction-account"].value)
    to = e.target["transaction-account"].value;
  await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "personal_unlockAccount",
      params: [accountElem.innerHTML, e.target["tran-pw"].value],
    },
  });

  const {
    data: { result },
  } = await request({
    data: {
      id: 1337,
      jsonrpc: "2.0",
      method: "eth_sendTransaction",
      params: [
        {
          from: accountElem.innerHTML,
          to,
          value:
            "0x" + (+e.target["ether"].value * Math.pow(10, 18)).toString(16),
        },
      ],
    },
  });

  console.log(result); // 트랜 잭션의 정보
  getBlockByNumber();
  getTransaction(result);
  getBalance(accountElem.innerHTML);
};

document.forms["form-meta"].onsubmit = (e) => {
  e.preventDefault();
  getWallet(e.target["meta"].value);
};

// 블록 정보 getblockByNumber
// 트랜잭션 정보 getTransactionReceipt
