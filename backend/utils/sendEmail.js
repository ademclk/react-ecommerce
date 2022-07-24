const nodemailer = require('nodemailer');

const sendEmail = async options => {
    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    
    const message = { 
        from: `${process.env.SMTP_MAIL_NAME} <${process.env.SMTP_MAIL_FROM}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    await transport.sendMail(message);
}

module.exports = sendEmail;