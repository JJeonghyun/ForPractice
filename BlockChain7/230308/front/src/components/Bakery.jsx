import { useState, useEffect } from "react";
import BakeryContract from "../contracts/Bakery.json";

const Bakery = ({ web3, account }) => {
  const [bread, setBread] = useState(0);
  const [deployed, setDeployed] = useState();
  const [CA, setCA] = useState();

  const initialize = async () => {
    if (!web3) return;

    const networkId = await web3.eth.net.getId();
    const _CA = BakeryContract.networks[networkId].address;
    setCA(_CA);
    const abi = BakeryContract.abi;

    const _deployed = new web3.eth.Contract(abi, _CA);
    setDeployed(_deployed);

    const _bread = await _deployed.methods.getBread().call({ from: account });
    setBread(_bread);
  };

  const buyBread = async () => {
    await deployed.methods
      .buyBread()
      .send({ from: account, to: CA, value: web3.utils.toWei("1") });
    const _bread = await deployed.methods.getBread().call({ from: account });
    setBread(_bread);
  };

  const sellBread = async () => {
    await deployed.methods.sellBread().send({ from: account });
    const _bread = await deployed.methods.getBread().call({ from: account });
    setBread(_bread);
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div>
      <div>현재 빵 개수 : {bread}</div>
      <button onClick={buyBread}>빵 사기</button>
      <button onClick={sellBread}>빵 팔기</button>
    </div>
  );
};

export default Bakery;
