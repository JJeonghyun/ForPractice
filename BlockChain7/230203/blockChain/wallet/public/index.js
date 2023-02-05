const addressLi = document.getElementById("wallet_address");
const publicKeyLi = document.getElementById("wallet_publicKey");
const privateKeyLi = document.getElementById("wallet_privateKey");
const balanceLi = document.getElementById("wallet_balance");

const listUl = document.getElementById("wallet_list");

const info = (_wallet) => {
  addressLi.innerHTML = _wallet.address;
  publicKeyLi.innerHTML = _wallet.publicKey;
  privateKeyLi.innerHTML = _wallet.privateKey;
  balanceLi.innerHTML = _wallet.balance;
};

const getInfo = async (_address) => {
  const wallet = await axios.get("/wallet/" + _address);
  info(wallet.data);
};

document.getElementById("new_wallet_btn").onclick = () => {
  axios.post("/wallet/create").then(({ data }) => {
    console.log(data);
    info(data);
  });
};

document.getElementById("wallet_list_btn").onclick = () => {
  axios.get("/wallet/list").then(({ data }) => {
    // console.log(data);
    listUl.innerHTML = "";
    data.forEach((item) => {
      listUl.innerHTML += `<li onclick="getInfo('${item}')">${item}</li>`;
    });
  });
};

document.getElementById("transaction_form").onsubmit = (e) => {
  e.preventDefault();

  const publicKey = publicKeyLi.innerHTML;
  const address = addressLi.innerHTML;
  const received = e.target.received.value;
  const amount = +e.target.amount.value;

  const req = {
    sender: {
      publicKey,
      address,
    },
    received,
    amount,
  };

  axios.post("/transaction/send", req);
};

document.getElementById("block-mine-btn").onclick = () => {
  const data = addressLi.innerHTML;
  if (data === "") return;
  axios.post("/block/mine", { data: data }).then(() => {
    axios.post("/balance", { address: data }).then(({ data }) => {
      console.log(data);
      console.log(data.balance);
      balanceLi.innerHTML = data.balance;
    });
  });
};
