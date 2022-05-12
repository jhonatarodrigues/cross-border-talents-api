'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all([
      await queryInterface.addColumn('talentPoolInterest', 'createdAt', {
        type: Sequelize.DATE,
      }),
      await queryInterface.addColumn('talentPoolInterest', 'updatedAt', {
        type: Sequelize.DATE,
      }),
    ]);
  },

  async down(queryInterface) {
    return await Promise.all([
      await queryInterface.removeColumn('talentPool', 'createdAt'),
      await queryInterface.removeColumn('talentPool', 'updatedAt'),
    ]);
  },
};
