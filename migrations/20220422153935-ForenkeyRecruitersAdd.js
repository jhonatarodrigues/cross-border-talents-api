'use strict';

module.exports = {
  async up(queryInterface, sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return await Promise.all([
      await queryInterface.removeColumn('recruiters', 'teamLeader'),
      await queryInterface.addColumn('recruiters', 'teamLeader', {
        type: sequelize.INTEGER,
        references: {
          model: 'teamLeaders',
          key: 'id',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        },
      }),
    ]);
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
