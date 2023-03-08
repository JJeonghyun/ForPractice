# 230308 순서

1. front/back 폴더 생성
2. 각 폴더 필요한 라이브러리 설치 및 init
3. useWeb3.js 생성 ( CustomHook )
4. solidity 파일 생성

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
```

5. migrations내 배포 JS 파일 생성

```js
const Bakery = artifacts.require("Bakery");

module.exports = function (deployer) {
  deployer.deploy(Bakery);
};
```

6. compile, migration 실행

7. front/src내 contract와 components 폴더 생성

   - front/src/contract내 truffle로 build내 json파일을 가져온다
   - compile, migration 후 가져와야함 (network 관련 내용이 있어야 되기에)
   - front/src/components내 App.js 하위 컴포넌트를 생성
   - 하위 컴포넌트에게 web3, account를 props로 넘겨준다

8. Bakery.jsx를 작성해서 현재 빵 개수를 출력

9. 빵을 구매하는 함수, 판매하는 함수를 생성
