import { ITypedef } from 'graphql-tools';

export const TypeDefs: ITypedef = `
 type Region {
    name: String
    shortCode: String
 }
  type Country {
    countryName: String
    countryShortCode: String
    regions: [Region]
  }

`;

export const Query = `
  countries: [Country]
`;
