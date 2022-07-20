'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all([
      await queryInterface.addColumn('interestSkills', 'internal', {
        type: Sequelize.BOOLEAN,
      }),
    ]);
  },

  async down(queryInterface) {
    return await Promise.all([
      await queryInterface.removeColumn('interestSkills', 'internal'),
    ]);
  },
};
