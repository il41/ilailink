
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.argv[2] || 8000

app.use( express.static(__dirname+'/www') )



let recentMessages = [];
function recordMessage(msg){
  recentMessages.push(msg);
  if(recentMessages.length>40){
    recentMessages.shift();
  }
}

io.on('connection',function(socket){
  socket.emit('load recent',recentMessages);
  // console.log('a user connected');
  socket.on('client chat',(msg)=>{
    recordMessage(msg);
    io.emit('server chat',msg);
  })
})


// start listening for requests from potential clients
http.listen( port, function(err){
    if(err){ // if there's an error, log it to terminal
        console.log(err)
    } else { // otherwise, log the following...
        console.log(`server is listening, visit http://localhost:${port}`)
    }
})
