const WebSocket = require('ws');

// Use the cloud provider's port, or default to 3000 for local testing
const PORT = process.env.PORT || 3000; 
const wss = new WebSocket.Server({ port: PORT });

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

console.log(`WebSocket server is running on port ${PORT}`);