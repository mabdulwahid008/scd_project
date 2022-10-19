const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongoDB = () => {
    mongoose.connect(process.env.DBMS_URL, ()=>{
        console.log('Connected to Database');
    })
}

module.exports = connectToMongoDB