'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all([
      await queryInterface.addColumn('companies', 'facebook', {
        type: Sequelize.STRING,
      }),
      await queryInterface.addColumn('companies', 'instagram', {
        type: Sequelize.STRING,
      }),
      await queryInterface.addColumn('companies', 'linkedin', {
        type: Sequelize.STRING,
      }),
    ]);
  },

  async down(queryInterface) {
    return await Promise.all([
      await queryInterface.removeColumn('companies', 'facebook'),
      await queryInterface.removeColumn('companies', 'instagram'),
      await queryInterface.removeColumn('companies', 'linkedin'),
    ]);
  },
};
