import { useEffect, useState } from "react";
import axios from "axios";

import NumberCalcComponent from "./Component";

const NumberCalcContainer = ({ web3, account }) => {
  const [result, setResult] = useState(0);
  const [inputValue, setInput] = useState(0);
  const [deployed, setDeployed] = useState();

  useEffect(() => {
    (async () => {
      if (deployed) return;
      const data = await axios.post("http://localhost:8080/api/op/check");
      const { CA, _deployed, _result } = data.data;
      setDeployed(_deployed);
      setResult(parseInt(_result));

      web3.eth.subscribe("logs", { address: CA }).on("data", (log) => {
        console.log(log);
        const params = [{ type: "int256", name: "inputValue" }];
        const value = web3.eth.abi.decodeLog(params, log.data);
        setResult(value.inputValue);
      });
    })();
  }, []);

  const add = async (_input) => {
    const data = (
      await axios.post("http://localhost:8080/api/op/add", {
        from: account,
        input: _input,
      })
    ).data;
    await web3.eth.sendTransaction(data);
  };
  const minus = async (_input) => {
    const data = (
      await axios.post("http://localhost:8080/api/op/minus", {
        from: account,
        input: _input,
      })
    ).data;
    await web3.eth.sendTransaction(data);
  };
  const multiply = async (_input) => {
    const data = (
      await axios.post("http://localhost:8080/api/op/multiply", {
        from: account,
        input: _input,
      })
    ).data;
    await web3.eth.sendTransaction(data);
  };
  const division = async (_input) => {
    const data = (
      await axios.post("http://localhost:8080/api/op/division", {
        from: account,
        input: _input,
      })
    ).data;
    await web3.eth.sendTransaction(data);
  };

  return (
    <NumberCalcComponent
      account={account}
      add={add}
      minus={minus}
      multiply={multiply}
      division={division}
      result={result}
      inputValue={inputValue}
      setInput={setInput}
    />
  );
};
export default NumberCalcContainer;
