const process = require("process");
require("dotenv").config();
const router = require("express").Router();
const passport = require("passport");
const CLIENT_URL = process.env.CLIENT_URL;
require("./passport");

router.get("/oauth2", passport.authorize("oauth2"));
router.get("/oauth2/callback", async (req, res)=>{
  const respBody = fetch('https://api.dotykacka.cz/v2/signin/token', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Authorization": "User " + req.query.token
      },
      body: JSON.stringify({ _cloudId: req.query.cloudid })
    }).then((r) => {
      return r.json();
    })
    res.status(200)
    res.end(JSON.stringify(await respBody));
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Failed to Authenticate",
  });
});

router.get("/login/success", (req, res) => {
  if (req.token) {
    res.status(200).json({
      success: true,
      message: "Successfull",
      token: req.token
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

module.exports = router;
