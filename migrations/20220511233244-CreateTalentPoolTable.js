'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('talentPool', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      idUser: Sequelize.INTEGER,
      idTeamLeader: Sequelize.INTEGER,
      data: Sequelize.DATE,
      charge: Sequelize.STRING,
      profile: Sequelize.STRING(300),
      observation: Sequelize.TEXT,
      softwares: Sequelize.TEXT,
      education: Sequelize.TEXT,
      experience: Sequelize.TEXT,
      languages: Sequelize.TEXT,
      status: Sequelize.BOOLEAN,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('talentPool');
  },
};
