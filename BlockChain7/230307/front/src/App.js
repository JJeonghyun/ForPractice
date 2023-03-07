import { useEffect, useState } from "react";
import axios from "axios";
import useWeb3 from "./Hooks/useWeb3";

import Candidate from "./components/Candidate";

function App() {
  const [web3, account] = useWeb3();
  const [candidateList, setCandidateList] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await axios.post("http://localhost:8080/api/vote/send", {
        method: "candidates",
      });
      setCandidateList(data.data.candidates);
    })();
  }, []);

  return (
    <div>
      <h1>deploy로 배포하면서 solidity 생성자 들어가는 배열 </h1>
      <div>
        {candidateList?.map((item, index) => (
          <Candidate
            key={`candidate-${index}`}
            item={item}
            web3={web3}
            account={account}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
