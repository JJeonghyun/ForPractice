// console.log(window.ethereum);
const nowAccountElem = document.getElementById("now-account");
const balanceElem = document.getElementById("balance");
const toElem = document.getElementById("to");
const etherCountElem = document.getElementById("ether-count");
const sendTransactionElem = document.getElementById("sendTransaction");

if (window.ethereum) {
  const isConnected = window.ethereum.isConnected();
  console.log("JS 읽자 마자 isConnected : ", isConnected);

  const getBalance = async (_accounts) => {
    nowAccountElem.innerHTML = _accounts[0];
    const balance = await ethereum.request({
      method: "eth_getBalance",
      params: _accounts,
    });
    balanceElem.innerHTML = `잔액 : ${
      parseInt(balance) / Math.pow(10, 18)
    }ETH `;
    console.log(parseInt(balance));
    console.log(parseInt(balance) / Math.pow(10, 18));
  };

  ethereum.on("connect", async (connectInfo) => {
    console.log(connectInfo);
    console.log(connectInfo.chainId);

    const isConnected = window.ethereum.isConnected();
    console.log("connect 후 isConnected : ", isConnected);
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      //   nowAccountElem.innerHTML = accounts[0];
      //   const balance = await ethereum.request({
      //     method: "eth_getBalance",
      //     params: accounts,
      //   });
      //   balanceElem.innerHTML = `잔액 : ${
      //     parseInt(balance) / Math.pow(10, 18)
      //   }ETH `;
      //   console.log(parseInt(balance));
      //   console.log(parseInt(balance) / Math.pow(10, 18));
      await getBalance(accounts);
    } catch (err) {
      console.log(err);
    }
  });

  ethereum.on("accountsChanged", async (accounts) => {
    console.log(accounts);
    // nowAccountElem.innerHTML = accounts[0];

    // const balance = await ethereum.request({
    //   method: "eth_getBalance",
    //   params: accounts,
    // });
    // balanceElem.innerHTML = `잔액 : ${
    //   parseInt(balance) / Math.pow(10, 18)
    // }ETH `;

    // console.log(parseInt(balance));
    await getBalance(accounts);
  });

  ethereum.on("chainChanged", (chainId) => {
    console.log(chainId);
  });
  sendTransactionElem.onclick = () => {
    const from = nowAccountElem.innerHTML;
    const to = toElem.value;
    const value =
      "0x" + (+etherCountElem.value * Math.pow(10, 18)).toString(16);

    ethereum
      .request({
        method: "eth_sendTransaction",
        params: [
          {
            from,
            to,
            value,
          },
        ],
      })
      .then(async (result) => {
        console.log(result);
        getBalance([from]);
      })
      .catch((err) => console.log(err));
  };
}

// ethereum.on("connect", handler : function(connectInfo:{chainId:string}):void)
