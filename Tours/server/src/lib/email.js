//Requere el paquete para enviar email
var nodemailer = require('nodemailer');

//Crea el objeto de transporte
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'happypoollimpieza@gmail.com',
        pass: 'XiuHotjeje'
    }
});

const helpers = {};

helpers.sendEmail = async (newEmail) => {
    var contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Username: ${newEmail.nombre_titular}</li>
            <li>User Email: ${newEmail.correo_electronico}</li>
            <li>PhoneNumber: ${newEmail.telefono}</li>
            <li> Reserva para : ${newEmail.personas}</li>
            <li> precio : ${newEmail.precio}</li>
            
            
        </ul>
        <p>${newEmail}</p>`;
        
    var mailOptions = {
        from: 'happypoollimpieza@gmail.com',
        to: newEmail.correo_electronico,
        subject: "Reserva exitosa",
        html: contentHTML
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });
};

module.exports = helpers;