import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

function createTransporter(user, pass) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.error(`SMTP connection error for ${user}:`, error);
    } else {
      console.log(`SMTP server for ${user} is ready`);
    }
  });

  return transporter;
}

const providerTransporter = createTransporter(
  process.env.PROVIDER_EMAIL,
  process.env.PROVIDER_PASSWORD
);

const clientTransporter = createTransporter(
  process.env.CLIENT_EMAIL,
  process.env.CLIENT_PASSWORD
);

export { providerTransporter, clientTransporter };
