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
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'gabriel@minarello.com', // generated ethereal user
        pass: 'xsmtpsib-eaf3ae32e32adfeed81bd7f4ce50b71d0b0dc01a20cfe2b74591a0a96458bc6c-IbvA8nYSPBKVwCTJ', // generated ethereal password
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
