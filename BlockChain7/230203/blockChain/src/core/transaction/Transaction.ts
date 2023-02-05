import UnspentTxOut from "./UnspentTxOut";
import { SHA256 } from "crypto-js";
import TxIn from "./TxIn";
import TxOut from "./TxOut";

class Transaction implements ITransaction {
  public txIns: Array<ITxIn>;
  public txOuts: Array<ITxOut>;
  public hash: string;

  constructor(_txIns: Array<ITxIn>, _txOuts: Array<ITxOut>) {
    this.txIns = _txIns;
    this.txOuts = _txOuts;
    this.hash = this.createHash();
  }

  createHash(): string {
    let txOutStr: string = "";
    for (let i = 0; i < this.txOuts.length; i++) {
      const tempTxOut = Object.values(this.txOuts[i]);
      for (let j = 0; j < tempTxOut.length; j++) {
        txOutStr += tempTxOut[j];
      }
    }
    let txInStr = "";
    for (let i = 0; i < this.txIns.length; i++) {
      const tempTxIn = Object.values(this.txIns[i]);
      for (let j = 0; j < tempTxIn.length; j++) {
        txInStr += tempTxIn[j];
      }
    }
    return SHA256(txInStr + txOutStr)
      .toString()
      .toUpperCase();
  }

  createUTXO(): Array<IUnspentTxOut> {
    const utxo: Array<IUnspentTxOut> = [];
    for (let i = 0; i < this.txOuts.length; i++) {
      utxo.push(
        new UnspentTxOut(
          this.txOuts[i].address,
          this.txOuts[i].amount,
          this.hash,
          i
        )
      );
    }
    return utxo;
  }

  static createTx(_receivedTx, _myUTXO: Array<IUnspentTxOut>): Transaction {
    const { sum, txIns } = TxIn.createTxIns(_receivedTx, _myUTXO);
    const txOuts = TxOut.createTxOuts(sum, _receivedTx);
    const tx = new Transaction(txIns, txOuts);

    return tx;
  }
}

export default Transaction;
