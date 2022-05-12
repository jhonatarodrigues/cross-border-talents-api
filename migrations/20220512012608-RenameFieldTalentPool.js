'use strict';

module.exports = {
  async up(queryInterface) {
    return await Promise.all([
      await queryInterface.renameColumn('talentPool', 'createAt', 'createdAt'),
      await queryInterface.renameColumn('talentPool', 'updateAt', 'updatedAt'),
    ]);
  },

  async down() {
    throw new Error('Not implemented');
  },
};
