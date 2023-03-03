import styled from "styled-components";

const NumberCalcComponent = ({
  add,
  minus,
  multiply,
  division,
  result,
  inputValue,
  setInput,
  account,
}) => {
  return (
    <MainBox>
      <div>Now Account : {account}</div>
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
          setInput(0);
        }}
      >
        더하기
      </button>
      <button
        onClick={() => {
          minus(inputValue);
          setInput(0);
        }}
      >
        빼기
      </button>
      <button
        onClick={() => {
          multiply(inputValue);
          setInput(0);
        }}
      >
        곱하기
      </button>
      <button
        onClick={() => {
          division(inputValue);
          setInput(0);
        }}
      >
        나누기
      </button>
      <div>Result : {result}</div>
    </MainBox>
  );
};
export default NumberCalcComponent;

const MainBox = styled.div`
  width: 70%;
  margin: 0 auto;
  & > div:first-child,
  & > div:last-child {
    padding: 10px 0;
  }

  & > button,
  & > input {
    padding: 5px 10px;
  }
`;
