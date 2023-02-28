const solc = require("solc");
const fs = require("fs");
const path = require("path");

class Compiler {
  /**
   *
   * @param {string} _fileName 매개변수로 넘어온 fileName
   */

  static compile(_fileName) {
    const contractPath = path.join(__dirname, "contracts", _fileName);
    const data = JSON.stringify({
      language: "Solidity",
      sources: {
        [_fileName]: {
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
    const compiled = solc.compile(data);
    return Compiler.writeOutput(JSON.parse(compiled));
    // 현재 문서의 경로에서 contracts 폴더, _fileName까지 contractPath 라는 변수에 경로를 합쳐서 저장

    // solc를 사용하여 솔리디티 코드를 컴파일 시 사용할 설정
    // 언어는 솔리디티, 파일로 생성되는 솔리디티 객체의 이름은 [_fileName], 파일 내용은 contractPath를 utf-8로 전환하여 파일을 읽은 내용으로 설정
    // 추가적인 설정은 가져올 정보 설정과 파일이름, 가져올 데이터의 키, 값 전부 모든 것으로 설정

    // 컴파일 한 데이터를 json 파일에서 객체화하여서 writeOutput 매개변수로 넘겨준다
  }
  /**
   *
   * @param {*} _compiled 컴파일된 솔리디티 객체
   */
  static writeOutput(_compiled) {
    const result = {};
    for (const contractFileName in _compiled.contracts) {
      const [contractName] = contractFileName.split(".");
      const contract = _compiled.contracts[contractFileName][contractName];
      const abi = contract.abi;
      const bytecode = contract.evm.bytecode.object;
      const tempObj = { abi, bytecode };
      const buildPath = path.join(__dirname, "build", `${contractName}.json`);
      fs.writeFileSync(buildPath, JSON.stringify(tempObj));
      //   fs.writeFileSync(
      //     path.join(__dirname, "build", `${contractName}.abi`),
      //     JSON.stringify(abi)
      //   );
      //   fs.writeFileSync(
      //     path.join(__dirname, "build", `${contractName}.bin`),
      //     bytecode
      //   );
      result[contractName] = tempObj;
    }
    return result;
  }
}

module.exports = Compiler;
