import { WebSocket, WebSocketServer } from "ws";
import Chain from "@core/chain";

export enum MessageType {
  lastBlock = 0,
  allBlock = 1,
  addBlock = 2,
  addTx = 3,
}

export interface IMessage {
  type: MessageType;
  payload: any;
}

class P2P extends Chain {
  private sockets: Array<WebSocket>;
  constructor() {
    super();
    this.sockets = [];
  }

  get getSockets(): Array<WebSocket> {
    return [...this.sockets];
  }

  connectSocket(socket: WebSocket, type?: MessageType): void {
    this.sockets.push(socket);
    socket.on("message", (_data: string) => {
      const data: IMessage = JSON.parse(_data.toString());

      switch (data.type) {
        case MessageType.lastBlock: {
          const message: IMessage = {
            type: MessageType.allBlock,
            payload: [this.lastBlock],
          };
          socket.send(JSON.stringify(message));
          break;
        }
        case MessageType.allBlock: {
          const [newBlock]: [IBlock] = data.payload;
          const isValid: IBlock | null = this.add2Chain(newBlock);
          if (isValid !== null) break;

          const message: IMessage = {
            type: MessageType.addBlock,
            payload: this.getChain,
          };
          socket.send(JSON.stringify(message));
          break;
        }
        case MessageType.addBlock: {
          const isValidChain = this.isValidChain(data.payload);
          if (isValidChain.isError === true) break;

          const isValid = this.replaceChain(data.payload);
          if (isValid.isError === true) break;

          const message: IMessage = {
            type: MessageType.addBlock,
            payload: data.payload,
          };
          this.boardcast(message);

          break;
        }
        case MessageType.addTx: {
          const receivedTx = data.payload;
          if (
            !receivedTx ||
            this.getTxPool.find((item) => item.hash === receivedTx.hash)
          )
            break;

          this.addTxPool(receivedTx);

          const message: IMessage = {
            type: MessageType.addTx,
            payload: receivedTx,
          };

          this.boardcast(message);
          break;
        }
      }
    });

    const message: IMessage = {
      type: type | MessageType.lastBlock,
      payload: type ? this.getChain : [],
    };
    socket.send(JSON.stringify(message));
  }

  listen(port: number): void {
    const server: WebSocketServer = new WebSocket.Server({ port });
    server.on("connection", (socket: WebSocket) => {
      console.log("socket Opend");
      this.connectSocket(socket);
    });
  }

  addToPeer(peer: string): void {
    const socket: WebSocket = new WebSocket(peer);
    socket.on("open", () => {
      console.log("opend");
      this.connectSocket(socket, MessageType.addBlock);
    });
  }

  boardcast(message: IMessage) {
    this.sockets.forEach((item) => {
      item.send(JSON.stringify(message));
    });
  }
}

export default P2P;
