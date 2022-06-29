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
  type SearchTestimonials {
    testimonials: [Testimonial]
    infoPage: InfoPage
  }
`;

export const Query = `
  testimonials(id: ID): [Testimonial!]!
  testimonial(id: ID): Testimonial
  testimonialsSearch(page: Int, itensPerPage: Int, search: String): SearchTestimonials
`;

export const Mutation = `
  createTestimonial(name: String!, picture: String!, date: String!, testimonial: String!, observations: String, country: String!): Testimonial
  removeTestimonial(id: ID!): Boolean
  updateTestimonial(id: ID!, name: String!, picture: String!, date: String!, testimonial: String!, observations: String, country: String!): Testimonial
`;
