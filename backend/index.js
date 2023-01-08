const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectToMongoDB = require('./db')

const io = require('socket.io')(3001,{
    cors:{
        origin: ['http://localhost:3000']
    }
})

// Create express App
const app = express();

// Used midleware for Cross Origin Resource Sharing
app.use(cors());

app.use(express.json())
app.use('/profileImages',express.static('profileImages'))

// Conect DB
connectToMongoDB()

//Routes
app.use('/user', require('./routes/User'))
app.use('/service', require('./routes/Service'))
app.use('/request', require('./routes/Requests'))

app.get('/', (req,res)=>{
    res.send('Hello World')
})

app.listen(process.env.PORT, ()=>{
    console.log(`App is listening on  port ${process.env.PORT}`);
})


io.on('connection', (socket)=>{
    console.log(socket.id);
    socket.on('request', (data) => {
        console.log(data);
        socket.broadcast.emit('send', data)
    })
})