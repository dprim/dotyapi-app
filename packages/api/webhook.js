require("dotenv").config();
const router = require("express").Router();
const WebSocket = require("ws");

// eslint-disable-next-line no-undef
const WS_PORT = process.env.WS_PORT;
const ws = new WebSocket("ws://localhost:" + WS_PORT);

// const self = this;
// Object.keys(process.env).map((name) => self[name] = process.env[name])
  router.post("/new-order", (req, res) => {
    console.log(req.body)
    req.accepts("application/json");
    ws.send(JSON.stringify(req.body));
    res.sendStatus(200)
  });

module.exports = router;
