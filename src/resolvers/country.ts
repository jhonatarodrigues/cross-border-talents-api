import json from 'country-region-data/data.json';

const Query = {
  countries: async () => {
    return json;
  },
};

export { Query };
