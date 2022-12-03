const nodemailer = require('nodemailer')
const nodemailerSendgrid = require('nodemailer-sendgrid')

const createTransport = () => {
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "ee1ca0a042c33f",
          pass: "11f34a16c5cace"
        }
      }); 
      
      return transport
}

const sendRegistrationMail = async (user) => {
    const transporter = createTransport()
    const info = await transporter.sendMail({
        from: '"H-COUTER Administration 👻" <pfweb30bgrupo19@gmail.com>',
        to: `${user.email}`,
        subject: `${user.username}! Bienvenido a H-COUTURE`,
        html: "<b>Bienvenido!</b>",
    })
    console.log("Message sent: %s", info.messageId);
    return
}

exports.sendRegistrationMail = (user) => sendRegistrationMail(user)