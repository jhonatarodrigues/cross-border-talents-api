'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('talentPoolInterest', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      idTalentPool: {
        type: Sequelize.INTEGER,
        references: {
          model: 'talentPool',
          key: 'id',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        },
      },
      idCompany: {
        type: Sequelize.INTEGER,
        references: {
          model: 'companies',
          key: 'id',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('talentPoolInterest');
  },
};
