'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all([
      await queryInterface.addColumn('jobs', 'teamLeader', {
        type: Sequelize.INTEGER,
        references: {
          model: 'teamLeaders',
          key: 'id',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        },
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await Promise.all([
      await queryInterface.removeColumn('jobs', 'teamLeader'),
    ]);
  },
};
