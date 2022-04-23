'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('candidates', 'observations', {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface) {
    return queryInterface.removeColumn('candidates', 'observations');
  },
};
