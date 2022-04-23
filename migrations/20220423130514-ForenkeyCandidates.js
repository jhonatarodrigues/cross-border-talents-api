'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all([
      await queryInterface.removeColumn('candidates', 'teamLeader'),
      await queryInterface.removeColumn('candidates', 'recruiter'),
      await queryInterface.addColumn('candidates', 'teamLeader', {
        type: Sequelize.INTEGER,
        references: {
          model: 'teamLeaders',
          key: 'id',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        },
      }),
      await queryInterface.addColumn('candidates', 'recruiter', {
        type: Sequelize.INTEGER,
        references: {
          model: 'recruiters',
          key: 'id',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        },
      }),
    ]);
  },

  async down() {
    throw new Error('Not implemented');
  },
};
