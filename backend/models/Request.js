const mongoose = require('mongoose');
const { Schema } = mongoose;

const requestSchema = new Schema({
    reuestedAccountId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    request : {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        }
    },
    // message: [
    //     {
    //         bid: {
    //             type: String,
    //         },
    //         worker_id : {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: 'user'
    //         }
    //     }
    // ],
    message : {
        type: String,
    },
    worker_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;