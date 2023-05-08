import simpleDDP from "simpleddp";
import ws from "isomorphic-ws";

let opts = {
  // endpoint: "ws://52.21.126.150/websocket",
  endpoint: "ws://localhost:4000/websocket",
  SocketConstructor: ws,
  reconnectInterval: 5000,
};

const server = new simpleDDP(opts);

export default server;
