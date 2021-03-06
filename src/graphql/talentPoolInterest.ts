import { ITypedef } from 'graphql-tools';

export const TypeDefs: ITypedef = `
  type TalentPoolInterest {
    id: ID
    idTalentPool: ID
    idCompany: ID

    talentPool: UserTalentPool
    company: Companie
  }
`;

export const Query = `
  talentPoolInterests(
    idTalentPool: Int
  ): Boolean
`;

export const Mutation = `
  addTalentPoolInterest(
    idTalentPool: Int
  ): TalentPoolInterest
`;
