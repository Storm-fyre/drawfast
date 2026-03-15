const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Broadcast the drawing coordinates to everyone else
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
});
console.log("WebSocket running on ws://localhost:3000");