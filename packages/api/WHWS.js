require("dotenv").config();
const { WebSocketServer } = require("ws");

/*
const wss = new WebSocketServer({
  server: app.listen(WS_PORT, () => {
    console.log("Server is running!");
  })
});

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
  ws.send('something: ' + JSON.stringify(process.cpuUsage()));
});
*/
class WHWS extends WebSocketServer {
  constructor(props) {
    super(props)
    constructor(props)
    this.server = props.server;
    this.init()
  }
  init = () => {
    this.on('connection', function connection(ws) {
      ws.on('error', console.error);
      ws.on('message', function message(data) {
        console.log('received: %s', data);
      });
      ws.on('new-order', function message(data) {
        console.log('received: %s', data);
      });
      ws.send('something');
    });
  };
}
//exports.WHWS = { WHWS, getWS: WHWS.getWS};
module.exports = WHWS;
