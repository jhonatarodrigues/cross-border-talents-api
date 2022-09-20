import nodemailer from 'nodemailer';

export interface ISendMail {
  to: string;
  subject: string;
  text: string;
  html: string;
  bcc?: string;
  cc?: string;
  template?: boolean;
}

export default async function SendMail({
  to,
  subject,
  text,
  html,
  bcc,
  cc,
  template = true,
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

    let htmlSend = html;

    if (template) {
      htmlSend = `
        <!DOCTYPE html>
        <html>
        <style>div {position:absolute;}</style>
        <head></head>
        <body>
        <div style="background-image:url('https://api.cbtalents.com/assets/newsLetter/img1.jpg'); left:0px; top:0px; width:900px; height:156px"></div>
        <div style="background-image:url('https://api.cbtalents.com/assets/newsLetter/img2.jpg'); left:0px; top:156px; width:900px; height:64px"></div>
        <div style=" left:0px; top:220px; width:900px; height:550px; text-align: center;">${html}</div>
        <div style="background-image:url('https://api.cbtalents.com/assets/newsLetter/img4.jpg'); left:0px; top:770px; width:900px; height:2px"></div>
        <div style="background-image:url('https://api.cbtalents.com/assets/newsLetter/img5.jpg'); left:0px; top:772px; width:900px; height:210px"></div>
        <div style="background-image:url('https://api.cbtalents.com/assets/newsLetter/img6.jpg'); left:0px; top:982px; width:900px; height:252px"></div>
        <div style="background-image:url('https://api.cbtalents.com/assets/newsLetter/img7.jpg'); left:0px; top:1234px; width:900px; height:4px"></div>
        <div style="background-image:url('https://api.cbtalents.com/assets/newsLetter/img8.jpg'); left:0px; top:1238px; width:900px; height:192px"></div>
        <div style="background-image:url('https://api.cbtalents.com/assets/newsLetter/img9.jpg'); left:0px; top:1430px; width:900px; height:2px"></div>
        <div style="background-image:url('https://api.cbtalents.com/assets/newsLetter/img10.jpg'); left:0px; top:1432px; width:900px; height:96px"></div>
        <div style="background-image:url('https://api.cbtalents.com/assets/newsLetter/img11.jpg'); left:0px; top:1528px; width:900px; height:147px"></div>
        </body>
        </html>
      `;
    }

    const info = await transporter.sendMail({
      from: 'noreply@cbtalents.com', // sender address
      to: `${to}`, // list of receivers
      cc,
      bcc,
      subject, // Subject line
      text, // plain text body
      html: htmlSend, // html body
    });

    console.log('\n\n\nMessage sent: %s', info.messageId);

    console.log('\n\n\n\nPreview URL: %s', nodemailer.getTestMessageUrl(info));
    return true;
  } catch {
    return false;
  }
}
