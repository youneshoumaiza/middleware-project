const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendEmail(email) {
  // Configure Nodemailer with your email service provider's settings
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAILING_EMAIL,
      pass: process.env.MAILING_PASSWORD,
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.MAILING_EMAIL,
    to: email,
    subject: 'Confirmation de paiement de la commande',
    text: 'Votre paiement a été payé avec succès!',
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendEmail;