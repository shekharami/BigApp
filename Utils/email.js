const nodemailer = require('nodemailer');
const Headers = require('node-sendgrid').Headers;


exports.sendEmail = async ( msg ) => {

  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
        user: process.env.SGUSER,
        pass: process.env.SGPASS
    }
    });

    //2) Set Custom arguments for Email Events

    const headers = new Headers();

    headers.setUniqueArgs({ "custom_mail_id": msg._id })

    // console.log(headers.headers)

    // // 2) Define the email options
    const mailOptions = {
    from: 'shekharAmit <shekhara128@gmail.com>',
    to: msg.email.join(', '),
    subject: msg.subject,
    text: msg.mailText,
    headers : { 'X-SMTPAPI': headers.toString() }
    // html:
    };

    // // 3) Actually send the email
    
    await transporter.sendMail(mailOptions);

}

