'use strict';
const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        review: "A peaceful retreat in the Elderwood Realm. The view from the mage tower is divine!",
        stars: 5,
      },
      {
        spotId: 2,
        userId: 3,
        review: "Charming elven vineyard. We drank mead under starlight and watched fairies dance.",
        stars: 5,
      },
      {
        spotId: 3,
        userId: 1,
        review: "The bard guild was just a few steps away—perfect for post-quest revelry.",
        stars: 5,
      },
      {
        spotId: 5,
        userId: 2,
        review: "Lived like a forest ranger in a treehouse hideout—absolute dream!",
        stars: 5,
      },
      {
        spotId: 7,
        userId: 3,
        review: "Close to the town square—great place to rest between dungeon runs.",
        stars: 4,
      },
      {
        spotId: 1,
        userId: 3,
        review: "Caught legendary trout in the nearby Mystic Lake. Will bring the guild next time!",
        stars: 4,
      },
      {
        spotId: 2,
        userId: 1,
        review: "Moonlit vineyard strolls were enchanting. Got a bottle of enchanted elderberry wine!",
        stars: 5,
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 5, 7] }
    }, {});
  }
};
