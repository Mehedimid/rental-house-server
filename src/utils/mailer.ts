import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.mail_host,
    port: Number(process.env.mail_port),
    secure: false,
    auth: {
      user: process.env.mail_user,
      pass: process.env.mail_pass,
    },
  });

  const info = await transporter.sendMail({
    from: `"BasaFinder 🏡" <${process.env.mail_user}>`,
    to,
    subject,
    html,
  });

  console.log('Email sent:', info.messageId);
};
