const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "mailhog",
    port: 1025
});

exports.sendMail = (to, subject, text) => {
    return transporter.sendMail({
        from: "contact@serverapi.com",
        to: to,
        subject: subject,
        text: text,
    });
}
