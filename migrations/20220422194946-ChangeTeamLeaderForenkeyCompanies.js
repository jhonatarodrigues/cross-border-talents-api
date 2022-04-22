'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await Promise.all([
      await queryInterface.removeColumn('companies', 'teamLeader'),
      await queryInterface.addColumn('companies', 'teamLeader', {
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

  async down() {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    throw new Error('Not implemented');
  },
};
