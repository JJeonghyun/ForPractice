import useWeb3 from "./Hooks/useWeb3";
import styled from "styled-components";

import Bakery from "./components/Bakery";

function App() {
  const [web3, account] = useWeb3();

  if (!account) {
    return <div>Unconnect MetaMask. Please connect to MetaMask</div>;
  }
  return (
    <BakeryBox>
      <h1>Bakery's Status</h1>
      <Bakery web3={web3} account={account} />
    </BakeryBox>
  );
}

export default App;

const BakeryBox = styled.div`
  width: 70%;
  margin: 0 auto;
  & > h1 {
    padding: 15px 0;
  }
  & > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    & > div {
      padding: 5px 10px 15px 0;
      font-size: 1.3rem;
      font-weight: 850;
    }
    & > button {
      padding: 5px 15px;
      margin: 0 5px;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 10px;
      &:hover {
        background-color: rgba(0, 0, 0, 1);
        color: white;
        cursor: pointer;
      }
    }
  }
`;
