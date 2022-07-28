'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all([
      await queryInterface.addColumn('testimonials', 'status', {
        type: Sequelize.BOOLEAN,
      }),
    ]);
  },

  async down(queryInterface) {
    return await Promise.all([
      await queryInterface.removeColumn('testimonials', 'status'),
    ]);
  },
};
