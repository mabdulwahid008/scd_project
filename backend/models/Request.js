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
    message : {
        type: [Object]
    }
})

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;