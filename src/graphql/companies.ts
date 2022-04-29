import { ITypedef } from 'graphql-tools';

export const TypeDefs: ITypedef = `
  type Companie {
    id: ID!
    idUser: ID!
    idInterestSkills: ID!
    
    companyLogo: String
    country: String
    companyName: String

    industry: String
    site: String
    size: String
    address1: String
    address2: String
    city: String
    facebook: String
    instagram: String
    linkedin: String

    interestSkills: InterestSkills
    userTeamLeader: TeamLeader
    user: User
  }
  type ReturnCompanie {
    user: User
    companie: Companie
  }

`;

export const Query = `
  companies: [Companie]
  companie(id: ID): Companie
`;

export const Mutation = `
  createCompanie(
    name: String!, 
    lastName: String!,
    email: String!, 
    phone: String, 
    status: Boolean, 

    country: String, 
    companyName: String, 
    companyLogo: String, 

    industry: String,
    site: String,
    size: String,
    address1: String,
    address2: String,
    city: String,
    facebook: String,
    instagram: String,
    linkedin: String,
    
    teamLeader: String, 
    idInterestSkills: String!
  ): ReturnCompanie

  removeCompanie(id: ID!): Boolean
  updateCompanie(
    id: ID!,
    name: String!, 
    lastName: String!,
    phone: String, 
    status: Boolean, 

    country: String, 
    companyName: String, 
    companyLogo: String, 

    industry: String,
    site: String,
    size: String,
    address1: String,
    address2: String,
    city: String,
    facebook: String,
    instagram: String,
    linkedin: String,
    
    teamLeader: String, 
    idInterestSkills: String!
  ): ReturnCompanie
`;
