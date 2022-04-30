import Testimonials from '../models/testimonials';

interface ICreateTestimonials {
  name: string;
  picture: string;
  date: string;
  testimonial: string;
  observations: string;
  country: string;
}
interface IUpdateTestimonials extends ICreateTestimonials {
  id: string;
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
  removeTestimonial: async (_: any, { id }: { id: string }) => {
    try {
      const response = await Testimonials.destroy({
        where: {
          id,
        },
      });

      return true;
    } catch (error: any) {
      return false;
    }
  },
  updateTestimonial: async (
    _: any,
    {
      id,
      name,
      date,
      observations,
      country,
      testimonial,
      picture,
    }: IUpdateTestimonials,
  ) => {
    try {
      const testimonialItem = await Testimonials.findByPk(id);

      if (!testimonialItem) {
        return false;
      }

      const response = await testimonialItem.update({
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
