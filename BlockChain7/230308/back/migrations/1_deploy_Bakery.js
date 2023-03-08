const Bakery = artifacts.require("Bakery");

module.exports = function (deployer) {
  deployer.deploy(Bakery);
};
