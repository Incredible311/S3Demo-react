const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });

console.log('WebSocket running on 3030')

wss.on('connection', function connection(ws) {
  console.log('connected!');
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        const response = {
          message: data,
          response: 'Hi, This this is mock response! Nice to meet you scale3C~~~'
        }
        client.send(JSON.stringify(response));
      }
    });
  });
});