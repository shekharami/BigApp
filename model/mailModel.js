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
    
}/*,{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}*/);

// userSchema.pre(/find/, function(next){
//     this.find({ active: {$ne: false }})
//     next();
// });

// userSchema.pre('save', async function(next){
//     if(!this.isModified('password')) return next();

//     this.password = await bcrypt.hash(this.password, 12);
//     this.confirmPassword = undefined;
//     next();
// });

// userSchema.pre('save', function(next) {
//     if(!this.isModified('password') || this.isNew) return next();

//     this.passwordChangedAt = Date.now() - 1000;
//     next();
// })

// userSchema.methods.correctPassword = async function (candidatePassword, userPassword){
//     return  await bcrypt.compare(candidatePassword, userPassword);
// };

// userSchema.methods.chnagedPasswordAfter = function(JWTTimestamp){
//     if(this.passwordChangedAt){
//         const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
//         return JWTTimestamp < changedTimestamp;
//     };
//     //FALSE means password not changed
//     return false;
// };

// userSchema.methods.createPasswordResetToken = function(){
//     const resetToken = crypto.randomBytes(32).toString('hex');

//     this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    
//     this.passwordResetExpires = Date.now() + 10*60*1000;
//     return resetToken;
// };

const Mail = mongoose.model('Mail', mailSchema);

module.exports = Mail;