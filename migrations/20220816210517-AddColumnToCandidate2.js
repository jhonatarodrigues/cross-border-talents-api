'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all([
      await queryInterface.removeColumn('companies', 'requirements'),
      await queryInterface.removeColumn('companies', 'benefits'),
      await queryInterface.addColumn('candidates', 'requirements', {
        type: Sequelize.TEXT,
      }),
      await queryInterface.addColumn('candidates', 'benefits', {
        type: Sequelize.TEXT,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await Promise.all([
      await queryInterface.removeColumn('candidates', 'requirements'),
      await queryInterface.removeColumn('candidates', 'benefits'),
      await queryInterface.addColumn('companies', 'requirements', {
        type: Sequelize.TEXT,
      }),
      await queryInterface.addColumn('companies', 'benefits', {
        type: Sequelize.TEXT,
      }),
    ]);
  },
};
