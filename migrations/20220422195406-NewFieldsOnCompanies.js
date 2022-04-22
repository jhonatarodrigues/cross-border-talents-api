'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all([
      await queryInterface.addColumn('companies', 'industry', {
        type: Sequelize.STRING,
      }),
      await queryInterface.addColumn('companies', 'site', {
        type: Sequelize.STRING,
      }),
      await queryInterface.addColumn('companies', 'size', {
        type: Sequelize.STRING,
      }),
      await queryInterface.addColumn('companies', 'address1', {
        type: Sequelize.STRING,
      }),
      await queryInterface.addColumn('companies', 'address2', {
        type: Sequelize.STRING,
      }),
      await queryInterface.addColumn('companies', 'city', {
        type: Sequelize.STRING,
      }),
    ]);
  },

  async down(queryInterface) {
    return await Promise.all([
      await queryInterface.removeColumn('companies', 'industry'),
      await queryInterface.removeColumn('companies', 'site'),
      await queryInterface.removeColumn('companies', 'size'),
      await queryInterface.removeColumn('companies', 'address1'),
      await queryInterface.removeColumn('companies', 'address2'),
      await queryInterface.removeColumn('companies', 'city'),
    ]);
  },
};
