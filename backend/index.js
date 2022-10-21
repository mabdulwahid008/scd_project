const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectToMongoDB = require('./db')

// Create express App
const app = express();

// Used midleware for Cross Origin Resource Sharing
app.use(cors());

app.use(express.json())

// Conect DB
connectToMongoDB()

//Routes
app.use('/user', require('./routes/User'))
app.use('/service', require('./routes/Service'))

app.get('/', (req,res)=>{
    res.send('Hello World')
})
app.listen(process.env.PORT, ()=>{
    console.log(`App is listening on  port ${process.env.PORT}`);
})