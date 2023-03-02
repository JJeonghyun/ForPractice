import { useEffect, useState } from "react";
import InputCalcContract from "../contracts/InputCalc.json";

const NumberCalc = ({ web3, account }) => {
  const [result, setResult] = useState(0);
  const [inputValue, setInput] = useState(0);
  const [deployed, setDeployed] = useState();

  useEffect(() => {
    (async () => {
      if (deployed) return;
      const _deployed = new web3.eth.Contract(
        InputCalcContract.abi,
        "0xb02d46c5d6dbaeE6F47f855b4443C5adb1ECA5f8"
      );
      setDeployed(_deployed);

      const _result = await _deployed.methods.getResult().call();
      setResult(parseInt(_result));
    })();
  }, []);

  const add = async (_input) => {
    const data = await deployed.methods.add(_input).send({ from: account });
    if (!data) return;
    const _result = await deployed.methods.getResult().call();
    setResult(_result);
  };
  const minus = async (_input) => {
    const data = await deployed.methods.minus(_input).send({ from: account });
    if (!data) return;
    const _result = await deployed.methods.getResult().call();
    setResult(_result);
  };
  const multiply = async (_input) => {
    const data = await deployed.methods
      .multiply(_input)
      .send({ from: account });
    if (!data) return;
    const _result = await deployed.methods.getResult().call();
    setResult(_result);
  };
  const division = async (_input) => {
    const data = await deployed.methods
      .division(_input)
      .send({ from: account });
    if (!data) return;
    const _result = await deployed.methods.getResult().call();
    setResult(_result);
  };

  return (
    <div>
      <input
        type="number"
        value={inputValue}
        placeholder={"연산할 수를 입력하세요"}
        onInput={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        onClick={() => {
          add(inputValue);
        }}
      >
        더하기
      </button>
      <button
        onClick={() => {
          minus(inputValue);
        }}
      >
        빼기
      </button>
      <button
        onClick={() => {
          multiply(inputValue);
        }}
      >
        곱하기
      </button>
      <button
        onClick={() => {
          division(inputValue);
        }}
      >
        나누기
      </button>
      <div>Result : {result}</div>
    </div>
  );
};
export default NumberCalc;
