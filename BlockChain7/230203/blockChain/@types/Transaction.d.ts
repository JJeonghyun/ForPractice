declare interface ITxOut {
  address: string;
  amount: number;
}

declare interface ITxIn {
  txOutId: string;
  txOutIndex: number;
  signature?: string;
}

declare interface ITransaction {
  txIns: Array<ITxIn>;
  txOuts: Array<ITxOut>;
  hash: string; // TxHash || TxID
}

declare interface IUnspentTxOut {
  address: string;
  amount: number;
  txOutId: string;
  txOutIndex: number;
}
