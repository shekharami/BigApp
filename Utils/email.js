const nodemailer = require('nodemailer');
// const pug = require('pug');
// const htmlToText = require('html-to-text');

module.exports = class Email{
  constructor(user, url){

    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = 'shekharAmit <shekhara128@gmail.com>'; 
  }

  newTransport(){
    // if(process.env.NODE_ENV == 'DEVELOPMENT'){
    // } or Production.
    return nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASS
        }
    });
  }

  async send(template, subject){
    //1. render HTML based on a pug template

    const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
      firstName : this.firstName,
      url : this.url,
      subject
    });

    //2. define mail options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: htmlToText.fromString(html)
      // html:
    };

    //3. Create transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome(){
    await this.send('welcome', 'Welcome to Natours!');
  }

  async sendResetToken(){
    await this.send('passwordReset', 'Your Password Reset Token (Valid for 10 mins)');
  }
};

// const sendEmail = async options => {
//   // 1) Create a transporter
//   const transporter = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "cb29c9bf4852e9",
//       pass: "ee14ddac2caa44"
//     }
//   });

//   // 2) Define the email options
//   const mailOptions = {
//     from: 'shekharAmit <shekhara128@gmail.com>',
//     to: options.email,
//     subject: 'Your password reset token',
//     text: options.message
//     // html:
//   };

//   // 3) Actually send the email
//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;
