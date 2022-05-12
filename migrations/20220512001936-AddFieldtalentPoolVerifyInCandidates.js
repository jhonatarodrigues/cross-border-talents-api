'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all([
      await queryInterface.addColumn('candidates', 'talentPoolVerify', {
        type: Sequelize.BOOLEAN,
      }),
    ]);
  },

  async down(queryInterface) {
    return await Promise.all([
      await queryInterface.removeColumn('candidates', 'talentPoolVerify'),
    ]);
  },
};
