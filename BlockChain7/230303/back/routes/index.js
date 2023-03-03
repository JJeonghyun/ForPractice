const { Router } = require("express");

const op = require("./op.js");

const router = Router();

router.use("/op", op);

module.exports = router;
