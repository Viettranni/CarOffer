const nodemailer = require('nodemailer');

const sendEmail = async (vehicle) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const partnerEmails = ['partner1@example.com', 'partner2@example.com']; // Add partner emails

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: partnerEmails,
    subject: 'New Vehicle Details',
    text: JSON.stringify(vehicle, null, 2), // Format the vehicle details
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
