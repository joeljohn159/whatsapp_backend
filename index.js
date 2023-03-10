const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);

const port = process.env.PORT || 3000;

server.listen(port,()=>{
    console.log(`Server connected to PORT : ${port}`);
})

io.on('connection',(socket)=>{
    socket.on('join',(data)=>{
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user joined');
    })
    socket.on('message',(data)=>{
        io.in(data.room).emit('new message',{user:data.user,message: data.message});
    })

})