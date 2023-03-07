import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Candidate = ({ web3, account, item }) => {
  const [vote, setVote] = useState(0);

  useEffect(() => {
    (async () => {
      const data = await axios.post("http://localhost:8080/api/vote/send", {
        method: "totalVotes",
        item,
      });
      setVote(data.data.totalVotes);
      web3.eth
        .subscribe("logs", { address: data.data.CA })
        .on("data", (log) => {
          const params = [
            { type: "string", name: "candidate" },
            { type: "uint", name: "votes" },
          ];
          const value = web3.eth.abi.decodeLog(params, log.data);
          if (value.candidate == item) setVote(value.votes);
        });
    })();
  }, []);

  const onClick = async () => {
    const data = await axios.post("http://localhost:8080/api/vote/send", {
      method: "voteForCandidate",
      candidate: item,
      from: account,
    });
    web3.eth.sendTransaction(data.data);
  };
  return (
    <CandidateBox onClick={onClick}>
      <h3>{item}</h3>
      <div>{vote}</div>
    </CandidateBox>
  );
};

export default Candidate;

const CandidateBox = styled.div`
  width: 75%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    border: 1px solid black;
    padding: 5px 30px;
    border-radius: 10px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }
  }
`;
