import useWeb3 from "./Hooks/useWeb3";

import NumberCalc from "./components/NumberCalc";

function App() {
  const [web3, account] = useWeb3();

  if (!account) return <div>No MetaMask || disconnected Accounts</div>;
  return (
    <div>
      <div>Now Account : {account}</div>
      <NumberCalc web3={web3} account={account} />
    </div>
  );
}

export default App;
