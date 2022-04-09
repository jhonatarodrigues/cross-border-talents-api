import { ITypedef } from 'graphql-tools';

export const TypeDefs: ITypedef = `
  type Testimonial {
    id: ID!
    name: String!
    picture: String!
    date: String!
    testimonial: String!
    observations: String
    country: String!
  }
`;

export const Query = `
  testimonials: [Testimonial!]!
  testimonial(id: ID): Testimonial
`;

export const Mutation = `
  createTestimonial(name: String!, picture: String!, date: String!, testimonial: String!, observations: String, country: String!): Testimonial
`;
