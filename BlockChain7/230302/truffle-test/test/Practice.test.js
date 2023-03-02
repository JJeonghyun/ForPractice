const Practice = artifacts.require("Practice");

contract("Practice", (accounts) => {
  console.log(accounts);

  let practice;

  describe("Practice Contract", () => {
    it("deploy", async () => {
      practice = await Practice.deployed();
    });
    it("getText", async () => {
      console.log(await practice.getText.call());
    });
    it("setText", async () => {
      await practice.setText("Hi, hello, bye");
      console.log(await practice.getText.call());
    });
  });
});
