const express = require('express')
const mailController = require('./../controllers/mailController')

const router = express.Router()

router.route('/saveEmail')
.post(mailController.saveEmail)

router.route('/getAllEmails')
.get(mailController.listAllEmails)

router
.route('/sendMail/:emailId')
.get(mailController.sendEmailByMailId)

router
.route('/sgEventNotification')
.post(mailController.sgEventNotification)

router
.route('/getReport/:emailId')
.get(mailController.getReportbyEmailId)

router
.route('/deleteMail&Stats/:emailId')
.delete(mailController.deleteEmailAndRelatedStats)

router
.route('/updateEmail/:emailId')
.patch(mailController.updateEmail)

module.exports = router