const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    email: String,

    custom_mail_id: String,

    event : String,

    reason : {
        type: String,
        default : null
    },

    sg_msg_id: String,
    
    timestamp: Date
    
});

const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats;