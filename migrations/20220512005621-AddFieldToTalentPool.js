'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all([
      await queryInterface.addColumn('talentPool', 'idCandidate', {
        type: Sequelize.INTEGER,
        references: {
          model: 'candidates',
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
