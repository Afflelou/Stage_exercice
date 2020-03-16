const itemslist = require("./itemslist");
const express = require("express");
const router = express.Router();
const app = express();

router.get("/", (req, res) => {
  res.send("server is up and running");
});

router.get("/items", (req, res) => {
  res.send(itemslist);
});

module.exports = router;
