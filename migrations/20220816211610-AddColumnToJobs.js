'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all([
      await queryInterface.removeColumn('candidates', 'requirements'),
      await queryInterface.removeColumn('candidates', 'benefits'),
      await queryInterface.addColumn('jobs', 'requirements', {
        type: Sequelize.TEXT,
      }),
      await queryInterface.addColumn('jobs', 'benefits', {
        type: Sequelize.TEXT,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await Promise.all([
      await queryInterface.removeColumn('jobs', 'requirements'),
      await queryInterface.removeColumn('jobs', 'benefits'),
      await queryInterface.addColumn('candidates', 'requirements', {
        type: Sequelize.TEXT,
      }),
      await queryInterface.addColumn('candidates', 'benefits', {
        type: Sequelize.TEXT,
      }),
    ]);
  },
};
