require("dotenv").config();
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2").Strategy;

//Input your client id and client secrect
const GITHUB_CLIENT_ID = "bosscard";
// eslint-disable-next-line no-unused-vars
const CLIENT_ID = GITHUB_CLIENT_ID
const CLIENT_URL = "http://localhost:3000"
const GITHUB_CLIENT_SECRET = "G2gDP0AUS84a7cr5j6Jc";
const strategy = new OAuth2Strategy(  {
    authorizationURL: 'https://admin.dotykacka.cz/client/connect',
    tokenURL: 'https://api.dotykacka.cz/v2/signin/token',
    callbackURL: CLIENT_URL + "/auth/oauth2/callback",
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    state: true,
    scope: "*",
    passReqToCallback: true
  },
  (token, cloudid) => {
    fetch('https://api.dotykacka.cz/v2/signin/token', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": "User " + token
      },
      body: JSON.stringify({ _cloudId: cloudid })
    }).then((res) => {
      return res.json();
    }).then((res) => {
      console.log("FRONT accessToken", res.accessToken)
    })
  }
)
passport.use("oauth2",
  strategy
);
OAuth2Strategy.prototype.authorizationParams = function (options) {
  return { ...options, client_secret: GITHUB_CLIENT_SECRET };
};

OAuth2Strategy.prototype.tokenParams = function (options) {
  return { ...options, token: "token" };
};

passport.transformAuthInfo((info)=>{
  console.log(info)
},(err, data)=>{
  console.log(err);
  console.log(data);
})


passport.serializeUser((token, done) => {
  done(null, token);
});

passport.deserializeUser((token, done) => {
  done(null, token);
});
