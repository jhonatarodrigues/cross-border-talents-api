import Testimonials from '../models/testimonials';

interface ICreateTestimonials {
  name: string;
  picture: string;
  date: string;
  testimonial: string;
  observations: string;
  country: string;
}

const Query = {
  testimonials: () => Testimonials.findAll({ order: [['id', 'DESC']] }),
  testimonial: (_: any, { id }: { id: string }) => Testimonials.findByPk(id),
};

const Mutation = {
  createTestimonial: async (
    _: any,
    {
      name,
      date,
      observations,
      country,
      testimonial,
      picture,
    }: ICreateTestimonials,
  ) => {
    try {
      const response = await Testimonials.create({
        name,
        date,
        observations,
        country,
        testimonial,
        picture,
      });

      return response;
    } catch (error: any) {
      return error;
    }
  },
};

export { Query, Mutation };
