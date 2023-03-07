const { Router } = require("express");

const vote = require("./vote.js");

const router = Router();

router.use("/vote", vote);

module.exports = router;
