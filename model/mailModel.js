// const crypto = require('crypto');
const mongoose = require('mongoose');
// const { doc } = require('prettier');
// const validator = require('validator');
// const bcrypt = require('bcrypt');


const mailSchema = new mongoose.Schema({
    emails: {
        type: Array,
        required: [true, 'aaa']
    },
    successful: [String],

    failed : [String],

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