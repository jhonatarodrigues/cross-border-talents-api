'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all([
      await queryInterface.addColumn('talentPool', 'createAt', {
        type: Sequelize.DATE,
      }),
      await queryInterface.addColumn('talentPool', 'updateAt', {
        type: Sequelize.DATE,
      }),
    ]);
  },

  async down(queryInterface) {
    return await Promise.all([
      await queryInterface.removeColumn('talentPool', 'createAt'),
      await queryInterface.removeColumn('talentPool', 'updateAt'),
    ]);
  },
};
