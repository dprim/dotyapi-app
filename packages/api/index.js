require("./passport");
require("dotenv").config();
const process = require('process')
const bodyParser = require('body-parser').json(); 
const cors = require("cors");
const cookieParser = require('cookie-parser')
const cookieSession = require("cookie-session");
const express = require("express");
const passport = require("passport");
const session = require('express-session')

const authRoute = require("./auth");
const webhookRoute = require("./webhook");
//const WSs = require("./WSs");
const WSs = require("./WHWS");

const CLIENT_URL = process.env.CLIENT_URL;
const WS_PORT = process.env.WS_PORT;
const app = express();

app.use(bodyParser);
app.use(express.static('/public'));
app.use(cookieParser());
app.use(cookieSession({ name: "session", keys: ["app"], maxAge: 24 * 60 * 60 * 100 }));
app.use(session({ saveUninitialized: true, resave: true, secret: 'localStorage' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use("/webhook", webhookRoute);

const server = app.listen(WS_PORT, () => {
  console.log("Server is running!");
})

new WSs({ server: server });

