const nodeMailer = require('nodemailer');

function mail(option, subject, body){
    let transporter = nodeMailer.createTransport({
        host: 'in-v3.mailjet.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    let mailOptions = {};

    if(option.attachments != null) {
        mailOptions = {
            to: option.receiver,
            from: 'team@fastblock.fr',
            subject: subject,
            html: body,
            attachments: [ option.attachments.forEach( el => {path: el}) ]
        }
    } else{
        mailOptions = {
            to: option.receiver,
            from: 'team@fastblock.fr',
            subject: subject,
            html: body,
        }
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}

module.exports = mail;