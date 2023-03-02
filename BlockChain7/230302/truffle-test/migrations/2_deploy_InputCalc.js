const inputCalc = artifacts.require("InputCalc");

module.exports = function (deployer) {
  deployer.deploy(inputCalc);
};
