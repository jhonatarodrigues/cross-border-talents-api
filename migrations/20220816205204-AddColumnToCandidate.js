'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all([
      await queryInterface.addColumn('companies', 'requirements', {
        type: Sequelize.TEXT,
      }),
      await queryInterface.addColumn('companies', 'benefits', {
        type: Sequelize.TEXT,
      }),
    ]);
  },

  async down(queryInterface) {
    return await Promise.all([
      await queryInterface.removeColumn('candidates', 'requirements'),
      await queryInterface.removeColumn('candidates', 'benefits'),
    ]);
  },
};
