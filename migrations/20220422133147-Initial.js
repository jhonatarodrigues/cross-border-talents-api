'use strict';

module.exports = {
  async up(queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const users = `
    CREATE TABLE IF NOT EXISTS \`users\` (\`id\` INTEGER NOT NULL auto_increment , \`name\` VARCHAR(255), \`lastName\` VARCHAR(255), \`email\` VARCHAR(255), \`phone\` VARCHAR(255), \`status\` TINYINT(1), \`password\` VARCHAR(255), \`accessLevel\` INTEGER, \`createdAt\` DATETIME NOT NULL, \`updatedAt\` DATETIME NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB;
    `;
    const interestSkills = `CREATE TABLE IF NOT EXISTS \`interestSkills\` (\`id\` INTEGER NOT NULL auto_increment , \`name\` VARCHAR(255), \`createdAt\` DATETIME NOT NULL, \`updatedAt\` DATETIME NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB;
    `;
    const candidates = `CREATE TABLE IF NOT EXISTS \`candidates\` (\`id\` INTEGER NOT NULL auto_increment , \`teamLeader\` INTEGER NOT NULL, \`idUser\` INTEGER, \`idInterestSkills\` INTEGER, \`profilePicture\` VARCHAR(255), \`socialMedia\` VARCHAR(255), \`birthDate\` DATE, \`country\` VARCHAR(255), \`gender\` VARCHAR(255), \`nativeLanguage\` VARCHAR(255), \`cvUpload\` VARCHAR(255), \`allowTalentPool\` TINYINT(1), \`allowContactMe\` TINYINT(1), \`privacityPolicy\` TINYINT(1), \`englishLevel\` VARCHAR(255), \`recruiter\` INTEGER NOT NULL, \`createdAt\` DATETIME NOT NULL, \`updatedAt\` DATETIME NOT NULL, PRIMARY KEY (\`id\`), FOREIGN KEY (\`teamLeader\`) REFERENCES \`users\` (\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (\`idUser\`) REFERENCES \`users\` (\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (\`idInterestSkills\`) REFERENCES \`interestSkills\` (\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (\`recruiter\`) REFERENCES \`users\` (\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;
    `;
    const companies = `CREATE TABLE IF NOT EXISTS \`companies\` (\`id\` INTEGER NOT NULL auto_increment , \`teamLeader\` INTEGER NOT NULL, \`idUser\` INTEGER, \`idInterestSkills\` INTEGER, \`companyLogo\` VARCHAR(255), \`country\` VARCHAR(255), \`companyName\` VARCHAR(255), \`createdAt\` DATETIME NOT NULL, \`updatedAt\` DATETIME NOT NULL, PRIMARY KEY (\`id\`), FOREIGN KEY (\`teamLeader\`) REFERENCES \`users\` (\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (\`idUser\`) REFERENCES \`users\` (\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (\`idInterestSkills\`) REFERENCES \`interestSkills\` (\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;
    `;
    const jobs = `CREATE TABLE IF NOT EXISTS \`jobs\` (\`id\` INTEGER NOT NULL auto_increment , \`idInterestSkills\` INTEGER, \`jobTitle\` VARCHAR(255), \`level\` VARCHAR(255), \`country\` VARCHAR(255), \`description\` TEXT, \`createdAt\` DATETIME NOT NULL, \`updatedAt\` DATETIME NOT NULL, PRIMARY KEY (\`id\`), FOREIGN KEY (\`idInterestSkills\`) REFERENCES \`interestSkills\` (\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;
    `;
    const recruiters = `CREATE TABLE IF NOT EXISTS \`recruiters\` (\`id\` INTEGER NOT NULL auto_increment , \`idUser\` INTEGER, \`teamLeader\` INTEGER NOT NULL, \`createdAt\` DATETIME NOT NULL, \`updatedAt\` DATETIME NOT NULL, PRIMARY KEY (\`id\`), FOREIGN KEY (\`idUser\`) REFERENCES \`users\` (\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE, FOREIGN KEY (\`teamLeader\`) REFERENCES \`users\` (\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;
    `;
    const teamLeaders = `CREATE TABLE IF NOT EXISTS \`teamLeaders\` (\`id\` INTEGER NOT NULL auto_increment , \`idUser\` INTEGER, \`department\` VARCHAR(255), \`createdAt\` DATETIME NOT NULL, \`updatedAt\` DATETIME NOT NULL, PRIMARY KEY (\`id\`), FOREIGN KEY (\`idUser\`) REFERENCES \`users\` (\`id\`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;
    `;
    const testimonials = `CREATE TABLE IF NOT EXISTS \`testimonials\` (\`id\` INTEGER NOT NULL auto_increment , \`name\` VARCHAR(255), \`picture\` VARCHAR(255), \`testimonial\` TEXT, \`date\` DATETIME, \`observations\` VARCHAR(255), \`country\` VARCHAR(255), \`createdAt\` DATETIME NOT NULL, \`updatedAt\` DATETIME NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB;
    `;

    queryInterface.sequelize.query(users);
    queryInterface.sequelize.query(interestSkills);
    queryInterface.sequelize.query(candidates);
    queryInterface.sequelize.query(companies);
    queryInterface.sequelize.query(jobs);
    queryInterface.sequelize.query(recruiters);
    queryInterface.sequelize.query(teamLeaders);

    return queryInterface.sequelize.query(testimonials);
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    const sql = `DROP TABLE IF EXISTS 'users';
    DROP TABLE IF EXISTS 'interestSkills';
    DROP TABLE IF EXISTS 'candidates';
    DROP TABLE IF EXISTS 'companies';
    DROP TABLE IF EXISTS 'jobs';
    DROP TABLE IF EXISTS 'recruiters';
    DROP TABLE IF EXISTS 'teamLeaders';
    DROP TABLE IF EXISTS 'testimonials';`;

    return queryInterface.sequelize.query(sql);
  },
};
