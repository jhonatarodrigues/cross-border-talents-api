import { ITypedef } from 'graphql-tools';

export const TypeDefs: ITypedef = `
  type Country {
    
      code: String
      code3: String
      name: String
      number: String
    
  }

`;

export const Query = `
  countries: [Country]
`;
