import nodemailer from 'nodemailer';

export interface ISendMail {
  to: string;
  subject: string;
  text: string;
  html: string;
  bcc?: string;
}

export default async function SendMail({
  to,
  subject,
  text,
  html,
  bcc,
}: ISendMail) {
  try {
    const transporter = nodemailer.createTransport({
      host: String(process.env.SMTP_HOST),
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: String(process.env.SMTP_USER), // generated ethereal user
        pass: String(process.env.SMTP_PASSWORD), // generated ethereal password
      },
    });

    const info = await transporter.sendMail({
      from: 'mail@cloubox.com.br', // sender address
      to: `${to}`, // list of receivers
      bcc,
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('\n\n\nMessage sent: %s', info.messageId);

    console.log('\n\n\n\nPreview URL: %s', nodemailer.getTestMessageUrl(info));
    return true;
  } catch {
    return false;
  }
}
