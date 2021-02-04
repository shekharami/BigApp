const mongoose = require('mongoose')
const Mail = require('./../model/mailModel');
const Stats = require('./../model/statsModel');
const { text } = require('express');
const nodemailer = require('nodemailer');
const Headers = require('node-sendgrid').Headers;
const email = require('./../Utils/email');


exports.saveEmail = async (req, res, next) => {
    try{

        const email = await Mail.create(req.body)

        res.status(201).json({
            status: "success",
            email
        })

    }catch(err){
        console.log(err)
    }

    next()
}

exports.listAllEmails = async (req, res, next) => {
    try{

        const email = await Mail.find()

        res.status(201).json({
            status: "success",
            count: email.length,
            email
        })

    }catch(err){
        console.log(err)
    }

    next()
}

exports.sendEmailByMailId = async (req, res, next) => {

    try{

        const mail = await Mail.findById(req.params.emailId)

        await email.sendEmail( { email: mail.email , subject: mail.subject , mailText: mail.mailText , _id : mail._id } )

        res.status(200).json({
            status: "success"
        })

    }catch(err){

        res.status(400).json({
            status: "fail"
        })
    
    }

    next();
}

exports.sgEventNotification = async (req, res, next) => {

    let evesArr = [...req.body]
    let filteredevesArr = []

    if( evesArr.length === 1 ) filteredevesArr = evesArr
    else{
        evesArr.map(e => {
            if(e.event !== 'processed' ){
                filteredevesArr.push(e)
            }
    })
    }

    for (p of filteredevesArr){
        try{

            if(!p.custom_mail_id) continue

            const doc = await Stats.find({ custom_mail_id : p.custom_mail_id , email: p.email })

            if(doc.length) continue

            let evnts, reason

            switch (p.event){
                case 'delivered':

                    evnts = 'delivered'

                    break;
                

                case 'dropped': 
                
                    evnts = 'dropped'

                    break;
                

                case 'bounce': 
        
                    evnts = 'bounce'

                    break;
            }

            await Stats.create({ email: p.email, 
                custom_mail_id: p.custom_mail_id , 
                event: evnts , 
                reason: p.reason , 
                sg_msg_id: p.sg_message_id, 
                timestamp: p.timestamp  
            })

        }catch(err){
            console.log(err)
        }
    }

    

    next()
}

exports.getReportbyEmailId =  async (req, res, next) => {

    try{
    
        const mail = await Mail.findById(req.params.emailId)

        const report = await Stats.find({ custom_mail_id: req.params.emailId })

        let failed = [], delivered = []

        report.map( doc => {
            if(doc.event === 'delivered') delivered.push(doc)

            else{
                failed.push(doc)
            }
        } )

        res.status(200).json({
            MailSubject: mail.subject,
            mailBody: mail.mailText,
            sentTo: mail.email,
            failed: {
                count: failed.length,
                data: failed
            },
            delivered: {
                count: delivered.length,
                data: delivered
            }

        })
    }catch(error){
        res.status(200).json({
            status: "fail",
            error
        })
    }

    next()
}

exports.deleteEmailAndRelatedStats = async (req, res, next) => {

    const mailId = req.params.emailId

    try{

        await Mail.findByIdAndDelete(mailId)

        await Stats.deleteMany({ custom_mail_id: mailId })

    }catch(err){
        console.log(err)
    }

    res.status(204).json({
        status: "success",
        data: null
    })

}

exports.updateEmail = async (req, res, next) => {

    try{

        const email = await Mail.findByIdAndUpdate(req.params.emailId, req.body, { new: true })

        res.status(200).json({
            status: "success",
            data: email
        })

    }catch(error){
        res.status(201).json({
            status: "fail",
            error
        })
    }
    next()

}
