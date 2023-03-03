import useWeb3 from "./Hooks/useWeb3";

import NumberCalcContainer from "./components/NumberCalc/Container";

function App() {
  const [web3, account] = useWeb3();

  if (!account) return <div>No MetaMask || disconnected Accounts</div>;
  return (
    <div>
      <NumberCalcContainer web3={web3} account={account} />
    </div>
  );
}

export default App;
