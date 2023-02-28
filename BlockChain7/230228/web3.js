const web3 = require("web3");

let instance;

class Client {
  constructor(_url) {
    if (instance) return instance;
    this.web3 = new web3(_url);
    instance = this;
  }
}
module.exports = Client;
