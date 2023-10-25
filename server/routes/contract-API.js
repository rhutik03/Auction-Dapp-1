const express = require("express");
const router = express.Router();
const compile = require("../../ethereum/compile");
const deploy = require("../../ethereum/deploy");

// Compile the contract
router.post("/compile", async function (req, res, next) {
  const result = compile();
  res.send(result);
});

// Deploy the contract
router.post("/deploy", async function (req, res, next) {
  const result = await deploy(req.body.bidTime,req.body.brand,req.body.rnumber);
  // console.log(result);
  res.send(result);
});

module.exports = router;
//check the response for deploy