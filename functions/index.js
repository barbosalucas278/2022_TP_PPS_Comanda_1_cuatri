const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp();


const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'comandappsbc@gmail.com',
    pass: 'bwgilqhydotxvaoy'
  }
});

exports.sendEmail = functions.firestore
    .document('mails/{mailId}')
    .onCreate((snap) => {
      let mailOptions = {}
      if(snap.data().isApproved){
        mailOptions = {
          from: 'comandappsbc@gmail.com',
          to: snap.data().email,
          subject: '¡Tu usuario fue aprobado!',
          html:
              `<p style="font-size: 18px; color: 'red'; font-weight: 'bold'; ">¡Tenemos buenas noticias!</p>
              <p style="font-size: 14px;">Tu perfil fue aprobado por un supervisor. ¡Ya podes comenzar a operar en la app!</p>
              <p style="font-size: 14px;">Saludos, </p>
              <p style="font-size: 14px;">-Comand-Da Team</p>
              `
        };
      } else {
        mailOptions = {
          from: 'comandappsbc@gmail.com',
          to: snap.data().email,
          subject: 'No pudimos aprobar tu usuario',
          html:
              `<p style="font-size: 18px; color: 'red'; font-weight: 'bold'; ">¡Lo sentimos!</p>
              <p style="font-size: 14px;">Tu perfil no pudo ser aprobado por un supervisor. ¡Registrate nuevamente!</p>
              <p style="font-size: 14px;">El equipo de, </p>
              <p style="font-size: 14px;">-Comand-Da</p>
              `
        };
      }

      return mailTransport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error)
            return
        }
        console.log("Sent!")
    });
});
