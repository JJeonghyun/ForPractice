# JS에서 Solidity 컴파일 및 스마트 컨트랙트 실행

```bash
npm i solc web3
```

```bash
npx solc --bin --abi ./Test.sol
```

```js
const solc = require("solc");
const fs = require("fs");
const path = require("path");

const contractPath = path.join(__dirname, "contracts", "Test.sol");

const data = JSON.stringify({
  language: "Solidity",
  sources: {
    "Test.sol": {
      content: fs.readFileSync(contractPath, "utf-8"),
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
});

const compiled = JSON.parse(solc.compile(data));

const {
  abi,
  evm: { bytecode },
} = compiled.contracts["Test.sol"].Test;

fs.writeFileSync(
  path.join(__dirname, "bytecode.json"),
  JSON.stringify(bytecode)
);

const bin = bytecode.object;
```

# Geth에서 생성한 지갑 발생 개인키 가져오기

```bash
npm i keythereum
```

```js
const keythereum = require("keythereum");

const keyObj = keythereum.importFromFile(address, __dirname);

const privateKey = keythereum.recover("123456789", keyObj);
```
