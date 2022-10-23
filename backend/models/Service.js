const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
    worker_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pricePerHour:{
        type: Number,
        required: true,
    },
    location: {
        city: {
            type: String,
            required: true
        },
        area: {
            type: String,
            required: true
        }
    },
    keywords:{
        type: [String],
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now
    }
})

const Service = mongoose.model('service', serviceSchema);
module.exports = Service;