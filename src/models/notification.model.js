const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    body: {
        type: String,
        required: true
    }, 
    createdBy: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);