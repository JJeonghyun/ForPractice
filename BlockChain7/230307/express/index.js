const express = require("express");
const cors = require("cors");

const routes = require("./routes/index");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/api", routes);

app.listen(8080, () => {
  console.log("Server Opened!!");
});
