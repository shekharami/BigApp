const mongoose = require('mongoose')
const sgMail = require('@sendgrid/mail')
const Mail = require('./../model/mailModel');
const stats = require('./../model/statsModel');
const { text } = require('express');

exports.sendPersonalisedEmail = async (req, res, next) => {
    const email = req.body.email 
    const from = 'shekhara128@gmail.com'
    let failed = []
    let sent = ''

    // const data = await Mail.create( req.body )

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    email.map( async p => {
        try{
            await sgMail.send({ to: p, from, subject: req.body.subject, text: req.body.mailText })
            sent += `${p},`

        }catch(err){
            failed.push(p)
        }
    });

    let successful = sent.split(',')
    successful.pop()

    const doc = await stats.create( { email: req.body.email, failed, successful, subject: req.body.subject , mailText: req.body.mailText})

    // console.log(doc)

    res.status(201).json({
        data: doc
    })

    next();
}

