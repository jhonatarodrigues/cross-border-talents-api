import MailChimp from '@mailchimp/mailchimp_marketing';

const Query = {
  mailchimp: async () => {
    MailChimp.setConfig({
      apiKey: '303afcfc4cc70a58edb14ebfb2351686-us12',
      server: 'us12',
    });

    // @ts-ignore-start

    const opa = await MailChimp.lists.getAllLists();
    console.log('\n\n --', opa);

    // @ts-ignore-end

    return true;
  },
};

const Mutation = {};

export { Query, Mutation };
