import { useEffect, useState } from "react";
import axios from "axios";
import useWeb3 from "./Hooks/useWeb3";
import styled from "styled-components";

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
    <CandidateBox>
      <h1>
        migrations폴더 내 deploy.js안의 solidity 생성자로 넘겨준 배열 목록{" "}
      </h1>
      <h2>해당 목록들 클릭 시 투표 수가 올라간다 </h2>
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
    </CandidateBox>
  );
}

export default App;

const CandidateBox = styled.div`
  width: 75%;
  margin: 0 auto;

  & > h1,
  h2 {
    padding: 10px 0;
    width: 100%;
    text-align: center;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    margin: 0 auto;
    & > div {
      border: 1px solid black;
      padding: 5px 30px;
      border-radius: 10px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.5);
        cursor: pointer;
      }
    }
  }
`;
