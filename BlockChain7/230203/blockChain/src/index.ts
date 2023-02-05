import P2P, { IMessage, MessageType } from "./p2p";
import express, { Express, Request, Response } from "express";
import Wallet from "@core/wallet";

const app: Express = express();
const ws: P2P = new P2P();

app.use(express.json());

app.use((req: Request, res: Response, next) => {
  const baseAuth = req.headers.authorization?.split(" ")[1] || "";
  console.log("baseAuth : ", baseAuth);
  if (!baseAuth || baseAuth === "") return res.status(401).end();
  const [userId, userPw] = Buffer.from(baseAuth, "base64")
    .toString()
    .split(":");
  if (userId !== "admin" || userPw !== "1234") return res.status(401).end();
  next();
});

app.get("/chains", (req: Request, res: Response) => {
  res.json(ws.getChain);
});

app.post("/block/mine", (req: Request, res: Response) => {
  const { data }: { data: string } = req.body;
  const newBlock: IBlock | null = ws.mineBlock(data);
  if (newBlock === null) res.send("error data");

  const message: IMessage = {
    type: MessageType.allBlock,
    payload: [newBlock],
  };
  ws.boardcast(message);
  res.json(newBlock);
});

app.post("/transaction/send", (req: Request, res: Response) => {
  const result = Wallet.sendTransaction(req.body, ws.getUtxo);
  console.log(result);
  if (result.isError === true) res.send(result.msg);
  else {
    ws.addTxPool(result.value);
    ws.updateUTXO(result.value);
    const message: IMessage = {
      type: MessageType.allBlock,
      payload: result.value,
    };
    ws.boardcast(message);
    res.end();
  }
});

app.get("/utxo", (req: Request, res: Response) => {
  res.json(ws.getUtxo);
});

app.post("/peer/add", (req: Request, res: Response) => {
  const { peer }: { peer: string } = req.body;
  ws.addToPeer(peer);
  res.end();
});

app.get("/peer", (req: Request, res: Response) => {
  const sockets = ws.getSockets.map(
    (item: any) => item._socket.remoteAddress + ":" + item._socket.remotePort
  );
  res.json(sockets);
});

app.post("/balance", (req: Request, res: Response) => {
  res.json({ balance: Wallet.getBalance(req.body.address, ws.getUtxo) });
});

app.get("/txpool", (req: Request, res: Response) => {
  res.json(ws.getTxPool);
});
const ports = [
  [8080, 7545],
  [8081, 7546],
];
const idx = 0;

app.listen(ports[idx][0], () => {
  console.log("Server Opend", ports[idx][0]);
  ws.listen(ports[idx][1]);
});
