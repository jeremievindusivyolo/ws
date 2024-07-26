const express = require('express')


const webserver = express()
 .use((req, res) =>
   res.sendFile('/ws-client.html', { root: __dirname })
 )
 .listen(3100, () => console.log(`Listening on ${3000}`))

const { WebSocketServer } = require('ws')
const sockserver = new WebSocketServer({ port: 2048 })

sockserver.on('connection', ws => {
    console.log('New client connected!')
    
    ws.send('connection established') 
    
    ws.on('close', () => console.log('Client has disconnected!'))
    
    ws.on('message', data => {
        console.log(data); 
        var data2 = [{'id' : 23, 'nom' : 'Mumbere', 'firstName' : 'Jeremiah', 'posts' : data}]
        sockserver.clients.forEach(client => {
        //console.log(`distributing message: ${data[20].posts}`)
        client.send(`${JSON.stringify(data2)}`);  
        })
    })
    
    ws.onerror = function () {
        console.log('websocket error')
    }
}
)