# blockChain typescript

- 설치 명령어

```sh
npm i -D typescript ts-node @types/node
npm i crypto-js hex-to-binary merkle
npm i -D @types/crypto-ks @types/merkle
```

- 타입에 대한 전역 초기화

  - @types 폴더에 모두 모아둘 것이다.
  - tsconfig.json 파일에 아래 내용 추가

  ```json
  {
    "compilerOptions": {
      "typeRoot": ["./@types"]
    }
  }
  ```

- 파일에 대한 별칭 설정

  - import 시에 별칭으로 짧게 불러올 수 있다

  ```json
  {
    "compilerOptions": {
      "paths": {
        "@core/*": ["src/core/*"],
        "*": ["@types/*"]
      }
    }
  }
  ```

  ```javascript
  import a from "src/core/a.ts";
  // 위 코드를 아래와 같이 쓸 수 있다
  import a from "@core/a.ts";
  ```

# declare

- TypeScript Compiler에게 타입이 선언되었음을 알린다.
- 컴파일 시 포함되지 않는다

# .d.ts 파일 불러오기 오류 해결(ts-node 에러 해결)

- npm i -D tsconfig-paths
  - tsconfig.json 파일에 아래 내용 추가

```json
{
  "ts-node": {
    "files": true,
    "require": ["tsconfig-paths/register"]
  }
}
```

- ts-node : ts-node 실행 시 설정
  - files : declare 가져오기 시 발생하는 에러 해결
    - 전역에서 사용할 수 있게 함
  - require : 터미널에서 ts-node 실행 시 필요한 라이브러리를 설정
    - 없으면 아래와 같이 실행
    ```sh
    npx ts-node r tsconfig-paths/register src/core/block/block.ts
    ```
    - 있으면 아래와 같이 실행
    ```sh
    npx ts-node src/core/block/block.ts
    ```

# implements

- interface 기준으로 타입을 확인한다.
- class의 프로퍼티의 타입을 선언해주는 것이 아닌 정상적으로 타입이 정의 되었나 확인한다

# 230203

```mermaid
flowchart
A[http 통신으로 block/mine에 데이터는 주소로 요청]
B[보상 주는 트랜잭션을 생성 core/chain/index.tx]
C[보상 주는 트랜잭션 포함해서 블록 생성 - data에 코인베이스 트랜잭션을 넣는다 core/chain/index.tx]
D[트랜잭션 풀에 코인베이스 트랜잭션 안들어간다]
F[코인베이스 트랜잭션을 기준으로 UTXO을 생성]
G[생성된 블록을 체인에 추가한다]

A-->B-->F-->C-->G
C---D
```
