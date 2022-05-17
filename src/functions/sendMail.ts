import nodemailer from 'nodemailer';

export interface ISendMail {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export default async function SendMail({ to, subject, text, html }: ISendMail) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'in-v3.mailjet.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'f4910abe79eb398d63b3e2bcdec74092', // generated ethereal user
        pass: '3f268b4921c16965f03a23c9872a0e87', // generated ethereal password
      },
    });

    const info = await transporter.sendMail({
      from: 'mail@cloubox.com.br', // sender address
      to: `${to},jhonata.a.r@hotmail.com`, // list of receivers
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
