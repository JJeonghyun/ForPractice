import Block from "@core/block/block";
import Transaction from "@core/transaction/Transaction";
import TxIn from "@core/transaction/txIn";
import TxOut from "@core/transaction/txOut";

class Chain implements IChain {
  private chain: Array<IBlock>;
  private DIFFICULTY_ADJUSTMENT_INTERVAL: number = 10;
  private BLOCK_GENERATION_INTERVAL: number = 10;
  private TIME_UNIT: number = 60 * 1000;
  private utxos: Array<IUnspentTxOut>;
  private txPool: Array<ITransaction>;

  constructor() {
    this.chain = [];
    const transaction = new Transaction(
      [new TxIn(`초대 블록 ${new Date()}`, 0)],
      []
    );
    const genesis: IBlock = new Block([transaction]);
    this.chain.push(genesis);

    this.utxos = [];
    this.txPool = [];
  }
  get getChain(): Array<IBlock> {
    return [...this.chain];
  }

  get lastBlock(): IBlock {
    return this.chain[this.chain.length - 1];
  }

  get config(): IConfig {
    return {
      DAI: this.DIFFICULTY_ADJUSTMENT_INTERVAL,
      averageGenerationTime: this.BLOCK_GENERATION_INTERVAL * this.TIME_UNIT,
    };
  }

  get adjustmentBlock(): IBlock {
    const length: number = this.chain.length;
    const interval: number = length - this.DIFFICULTY_ADJUSTMENT_INTERVAL;
    if (interval < 0) return this.chain[0];
    return this.chain[interval];
  }

  get getUtxo(): Array<IUnspentTxOut> {
    return [...this.utxos];
  }

  get getTxPool(): Array<ITransaction> {
    return [...this.txPool];
  }

  addBlock(_data: Array<ITransaction>): IBlock | null {
    const newBlock: IBlock = new Block(
      _data,
      this.lastBlock,
      this.adjustmentBlock,
      this.config
    );
    return this.add2Chain(newBlock);
  }
  add2Chain(_newBlock: IBlock): IBlock | null {
    const isValid: TResult<IBlock, string> = Block.isValidBlock(
      _newBlock,
      this.lastBlock
    );
    if (isValid.isError) {
      console.error(isValid.msg);
      return null;
    } else {
      console.log(_newBlock);
      this.chain.push(_newBlock);

      _newBlock.data.forEach((_tx: Transaction) => this.updateUTXO(_tx));
      this.updateTxPool(_newBlock);
      return _newBlock;
    }
  }
  isValidChain(_chain: Array<IBlock>): TResult<undefined, string> {
    for (let i = 0; i < _chain.length; i++) {
      const nowBlock = _chain[i];
      const previousBlock = _chain[i - 1];
      const isValid = Block.isValidBlock(nowBlock, previousBlock);
      if (isValid.isError === true) return isValid;
    }
    return { isError: false, value: undefined };
  }
  replaceChain(_chain: Array<IBlock>): TResult<undefined, string> {
    const newLastBlock = _chain[_chain.length - 1];
    const lastBlock = this.lastBlock;
    if (newLastBlock.height === 0 && lastBlock.height !== 0) {
      return { isError: true, msg: "받은 블록이 초대블록인데요" };
    }
    if (newLastBlock.height < lastBlock.height) {
      return { isError: true, msg: "내 체인이 더 길다" };
    }
    if (newLastBlock.hash === lastBlock.hash) {
      return { isError: true, msg: "동기화 완료" };
    }
    this.chain = _chain;

    this.chain.forEach((_block: IBlock) => {
      this.updateTxPool(_block);
      _block.data.forEach((_tx: Transaction) => {
        this.updateUTXO(_tx);
      });
    });
    return { isError: false, value: undefined };
  }
  mineBlock(_address: string) {
    const txIn: ITxIn = new TxIn("", this.lastBlock.height + 1);
    const txOut: TxOut = new TxOut(_address, 50);
    const coinBaseTracnsaciton: Transaction = new Transaction([txIn], [txOut]);
    return this.addBlock([...this.getTxPool, coinBaseTracnsaciton]);
  }

  updateUTXO(_tx: Transaction) {
    const utxos = this.getUtxo;
    const newUTXO = _tx.createUTXO();

    let temp = utxos.filter((item) => {
      const txIn = _tx.txIns.find(
        (item1) =>
          item.txOutId === item1.txOutId && item.txOutIndex === item1.txOutIndex
      );
      return !txIn;
    });
    const result = [...temp, ...newUTXO];
    this.utxos = result.reduce((prev, curr) => {
      const find = prev.find(
        ({ txOutId, txOutIndex }) =>
          txOutId === curr.txOutId && txOutIndex === curr.txOutIndex
      );
      if (!find) prev.push(curr);
      return prev;
    }, []);
  }

  addTxPool(_tx: Transaction): void {
    this.txPool.push(_tx);
  }

  updateTxPool(_newBlock: IBlock): void {
    let txPool: Array<ITransaction> = this.getTxPool;
    const tempTx: Array<ITransaction> = _newBlock.data;
    for (let i = 0; i < tempTx.length; i++) {
      const tempTxPool: Array<ITransaction> = [];
      for (let j = 0; j < txPool.length; j++) {
        if (txPool[j].hash !== tempTx[i].hash) tempTxPool.push(txPool[j]);
      }
      txPool = tempTxPool;
    }
    this.txPool = txPool;
  }
}

export default Chain;
