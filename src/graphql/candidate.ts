import { ITypedef } from 'graphql-tools';

export const TypeDefs: ITypedef = `
  type Candidate {
    id: ID!
    idUser: ID!
    idInterestSkills: ID!

    profilePicture: String
    socialMedia: String
    birthDate: String
    country: String
    gender: String
    nativeLanguage: String
    cvUpload: String
    allowTalentPool: Boolean
    allowContactMe: Boolean
    privacityPolicy: Boolean
    englishLevel: String

    userRecruiter: User
    userTeamLeader: User
    user: User
    interestSkills: InterestSkills
  }
  type ReturnCandidate {
    user: User
    candidate: Candidate
  }

`;

export const Query = `
  candidates: [Candidate]
  candidate(id: ID): Candidate
`;

export const Mutation = `
  createCandidate(
    name: String!, 
    email: String!, 
    phone: String, 
    status: Boolean, 

    profilePicture: String,
    socialMedia: String,
    birthDate: String,
    country: String,
    gender: String,
    nativeLanguage: String,
    cvUpload: String,
    allowTalentPool: Boolean,
    allowContactMe: Boolean,
    privacityPolicy: Boolean,
    englishLevel: String,

    recruiter: String,
    teamLeader: String,
    idInterestSkills: String!,
  ): ReturnCandidate
`;
