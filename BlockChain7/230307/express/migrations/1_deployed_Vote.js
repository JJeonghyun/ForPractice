const Vote = artifacts.require("Vote");

module.exports = function (deployer) {
  deployer.deploy(Vote, [
    "핵밥",
    "냉면",
    "금마루",
    "싸다김밥",
    "롯데리아",
    "버거킹",
  ]);
};
