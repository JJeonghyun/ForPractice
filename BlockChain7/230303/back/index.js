const express = require("express");
const cors = require("cors");

const routes = require("./routes/index");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/api", routes);

app.listen(8080, () => {
  console.log("test Server Opend");
});
