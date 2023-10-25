require("dotenv").config();
const path = require("path");
const { WebSocketServer } = require('ws')

class WSs extends WebSocketServer {
  constructor(props) {
    super(props);
    this.serverWS = props.server;
    constructor({ noServer: props.noServer });
    this.initWS()
  }

  initWS() {
    this.on('connection', (ws) => {
        ws.on('error', console.error);
        ws.on('message', (data) => {
          console.log('received: %s', data);
        });
      });

    this.serverWS.on('upgrade', (request, socket, head) => {
      const { pathname } = path.join("/", request.url)

        if (pathname === '/dotyapi') {
          this.handleUpgrade(request, socket, head, (ws) => {
            this.emit('connection', ws, request);
          });
        } else {
          socket.destroy();
        }
      });
  }
}

module.exports = WSs;
