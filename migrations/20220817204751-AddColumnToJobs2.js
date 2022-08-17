'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all([

      await queryInterface.addColumn('jobs', 'recruiter', {
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

  async down(queryInterface, Sequelize) {
    return await Promise.all([
      await queryInterface.removeColumn('jobs', 'recruiter'),
      
    ]);
  },
};
