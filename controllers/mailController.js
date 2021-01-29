const mongoose = require('mongoose')
const sgMail = require('@sendgrid/mail')
const Mail = require('./../model/mailModel');
const { text } = require('express');
const e = require('express');

exports.sendPersonalisedEmail = async (req, res, next) => {
    const email = req.body.email 
    const from = 'shekhara128@gmail.com'
    let failed = []
    let sent = []
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    function createMsgObject (to, from, subject, text){
        return { to, from, subject, text }
    }
    email.map( async e => {
        try{
            await sgMail.send(createMsgObject(e, from, req.body.subject, req.body.mailText ))
            sent.push(e)

        }catch(err){

            failed.push(e)
        }
    });

    const data = await Mail.create( { email : JSON.stringify(email), 
                                      successful: JSON.stringify(sent), 
                                      failed : JSON.stringify(failed), 
                                      subject: req.body.subject, 
                                      mailText: req.body.mailText 
                                    })
    

    res.status(201).json({
        data
    })

    next();
}

