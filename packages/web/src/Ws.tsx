import {
  ArrayQueue,
  ConstantBackoff,
  Websocket,
  WebsocketBuilder,
  WebsocketEvent,
} from "websocket-ts";

// Initialize WebSocket with buffering and 1s reconnection delay
const ws = new WebsocketBuilder("ws://localhost:5000")
  .withBuffer(new ArrayQueue())           // buffer messages when disconnected
  .withBackoff(new ConstantBackoff(1000)) // retry every 1s
  .build();

// Function to output & echo received messages
const echoOnMessage = (i: Websocket, ev: MessageEvent) => {
  console.log(`received message: ${ev.data}`);
  i.send(`echo: ${ev.data}`);
};

// Add event listeners
ws.addEventListener(WebsocketEvent.open, () => console.log("opened!"));
ws.addEventListener(WebsocketEvent.close, () => console.log("closed!"));
ws.addEventListener(WebsocketEvent.message, echoOnMessage);
