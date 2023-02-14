// npm i ethereumjs-tx
const ethTx = require("ethereumjs-tx").Transaction;

const tx = new ethTx({
  from: "0xA4a28D58De41671FB632861B92f88A5cAf3EdF43",
  to: "0x292B50c514A14648B2fC1B400932b086C3f06e1A",
  value: "0x" + Math.pow(10, 18).toString(16),
});
// console.log(tx);
// console.log(tx.r);
// console.log(tx.v);
// console.log(tx.s);

tx.sign(
  Buffer.from(
    "c2fa1f056f295cb32e89dc9a3240c30dd706fe717785f7c1789a0263a7e92116",
    "hex"
  )
);

// console.log(tx.r);
// console.log(tx.v);
// console.log(tx.s);

// console.log(tx.serialize().toString("hex"));
