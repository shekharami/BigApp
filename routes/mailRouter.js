const express = require('express')
const mailController = require('./../controllers/mailController')

const router = express.Router()

router
.route('/create')
.post(mailController.sendPersonalisedEmail)

module.exports = router