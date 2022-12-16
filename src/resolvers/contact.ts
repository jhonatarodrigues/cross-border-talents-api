import SendMail from '../functions/sendMail';

interface ISendContact {
  email: string;
  name: string;
  message: string;
  subject: string;
}

const Mutation = {
  sendContact: async (
    _: any,
    { name, email, message, subject }: ISendContact,
  ) => {
    try {
      const mail = await SendMail({
        to: 'info@cbtalents.com',
        subject: 'Contact Cross Border Talent - ' + subject,
        text: 'Welcome to Talent Pool',
        html: `

      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>
      `,
      });

      console.log('\n\n\n\n\n mail', mail);

      if (mail) {
        return true;
      }
    } catch {
      return false;
    }
  },
};

export { Mutation };
