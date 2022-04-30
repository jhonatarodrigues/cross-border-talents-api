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
    observations: String

    userRecruiter: Recruiter
    userTeamLeader: TeamLeader
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
    lastName: String!,
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
    observations: String,

    recruiter: String,
    teamLeader: String,
    idInterestSkills: String!,
  ): ReturnCandidate

  removeCandidate(id: ID!): Boolean
  updateCandidate(
    id: ID!,
    name: String!, 
    lastName: String!,
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
    observations: String,

    recruiter: String,
    teamLeader: String,
    idInterestSkills: String!,
  ): ReturnCandidate
`;
