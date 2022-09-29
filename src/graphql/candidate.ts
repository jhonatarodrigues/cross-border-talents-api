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
    talentPoolVerify: Boolean
    
    createdAt: String
    updatedAt: String

    userRecruiter: Recruiter
    userTeamLeader: TeamLeader
    user: User
    interestSkills: InterestSkills
  }
  type ReturnCandidate {
    user: User
    candidate: Candidate
  }
  type SearchCandidates {
    candidates: [Candidate]
    infoPage: InfoPage
    numberAllCandidates: Int
  }

`;

export const Query = `
  candidates(candidate: String,department: String, recruiter: String, teamLeader: String, search: String): [Candidate]
  candidate(id: ID): Candidate
  searchCandidates(page: Int, itensPerPage: Int, search: String): SearchCandidates
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
    talentPoolVerify: Boolean,
  ): ReturnCandidate

  removeCandidate(id: ID!): Boolean
  addTeamLeader(id: ID!): Boolean
  addRecruiter(id: ID!): Boolean
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
    talentPoolVerify: Boolean,
  ): ReturnCandidate


  importCandidateFromCSV: String
`;
