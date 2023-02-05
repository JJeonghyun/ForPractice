import cryptoJS from "crypto-js";
import elliptic from "elliptic";

const privateKey: string = cryptoJS.lib.WordArray.random(32)
  .toString()
  .toUpperCase();

const ec: elliptic.ec = new elliptic.ec("secp256k1");
const keyPair: elliptic.ec.KeyPair = ec.keyFromPrivate(privateKey);
const publicKey: string = keyPair.getPublic().encode("hex", true).toUpperCase();
console.log("privateKey : ", privateKey);
console.log("privateKey.length : ", privateKey.length);
console.log("publicKey : ", publicKey);
console.log("publicKey.length : ", publicKey.length);
const hash: string = cryptoJS.SHA256("checking data").toString().toUpperCase();
console.log("hash : ", hash);
console.log("hash.length : ", hash.length);
const signature: elliptic.ec.Signature = keyPair.sign(hash, "hex");
console.log("signature", signature);
const verify: boolean = ec.verify(
  hash,
  signature,
  ec.keyFromPublic(publicKey, "hex")
);
console.log("verify", verify);
const newPrivate: string = cryptoJS.lib.WordArray.random(32)
  .toString()
  .toUpperCase();

const newKeyPair = ec.keyFromPrivate(newPrivate);
const newPublicKey = newKeyPair.getPublic().encode("hex", true).toUpperCase();
const newVerify = ec.verify(
  hash,
  signature,
  ec.keyFromPublic(newPublicKey, "hex")
);
console.log("newVerify", newVerify);
const myWallet = publicKey.slice(26);
console.log("myWallet", myWallet);
