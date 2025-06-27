'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'guildmaster@eldoria.quest',
        firstName: 'Thalindra',
        lastName: 'Moonshade',
        username: 'GuildMaster',
        hashedPassword: bcrypt.hashSync('arcane123')
      },
      {
        email: 'ranger@forestwatch.org',
        firstName: 'Kaelen',
        lastName: 'Stormleaf',
        username: 'Wanderer1',
        hashedPassword: bcrypt.hashSync('shadowpath')
      },
      {
        email: 'alchemist@runestone.co',
        firstName: 'Elyra',
        lastName: 'Dawnroot',
        username: 'PotionCrafter',
        hashedPassword: bcrypt.hashSync('brewmagic')
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['GuildMaster', 'Wanderer1', 'PotionCrafter'] }
    }, {});
  }
};
