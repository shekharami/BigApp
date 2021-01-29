const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    email: {
        type: [String],
        required: [true, 'aaa']
    },
    failed : {
        type: [String]
    },

    successful: {
        type: [String]
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

const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats;