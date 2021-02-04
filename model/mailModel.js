const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
    email: {
        type: [String],
        required: [true, 'aaa']
    },
  
    subject: {
        type: String,
        required: [true, 'A subject is a must']
    },

    mailText: {
        type: String,
        required: [true,'Email should have a body']
    },

    timestamp: {
        type: Date,
        default: Date.now()
    }
    
});

const Mail = mongoose.model('Mail', mailSchema);

module.exports = Mail;