import { Op } from 'sequelize';

import Testimonials from '../models/testimonials';

interface ICreateTestimonials {
  name: string;
  picture: string;
  date: string;
  testimonial: string;
  observations: string;
  country: string;
  status: boolean;
}
interface IUpdateTestimonials extends ICreateTestimonials {
  id: string;
}

const Query = {
  testimonials: (_: any, { id }: { id: string }) =>
    Testimonials.findAll({
      order: [['id', 'DESC']],
      where: {
        ...(id ? { id: id } : {}),
      },
    }),
  testimonial: (_: any, { id }: { id: string }) => Testimonials.findByPk(id),

  testimonialsSearch: async (
    _: any,
    {
      page,
      itensPerPage,
      search = '',
    }: { page: number; itensPerPage: number; search: string },
  ) => {
    const total = await Testimonials.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { country: { [Op.like]: `%${search}%` } },
          { testimonial: { [Op.like]: `%${search}%` } },
        ],
        status: true,
      },
      order: [['id', 'DESC']],
      offset: page ? (page - 1) * itensPerPage : undefined,
      limit: itensPerPage || undefined,
    });

    return {
      testimonials: total.rows,
      infoPage: {
        currentPage: page,
        maxPage: Math.ceil(total.count / itensPerPage),
      },
    };
  },
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
      status,
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
        status,
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
      status,
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
        status,
      });

      return response;
    } catch (error: any) {
      return error;
    }
  },
};

export { Query, Mutation };
