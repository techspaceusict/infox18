const nodemailer = require("nodemailer"),
    xoauth2 = require("xoauth2"),
    config = require("../config/mail");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'helpinfoxpression@gmail.com',
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        refreshToken: '1/jrWlZNCQHoqJykZzAi1i8uJfAtpu5p6ypIBG4wHrST4',
    }
});

// var mailOptions = {
//     from: 'Infoxpression Website Enquiries <helpinfoxpression@gmail.com>',
//     to: 'sg384422@gmail.com',
//     subject: 'testing',
//     text: 'Hello'
// };
//
// transporter.sendMail(mailOptions, function (err, res) {
//     if(err)
//         console.log(err);
//     else
//         console.log("sent");
// });

module.exports = transporter;