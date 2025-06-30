'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      // Review 1 – Spot 1
      { reviewId: 1, url: '/spot1image2.jpg' },
      { reviewId: 1, url: '/spot1image3.jpg' },

      // Review 2 – Spot 2
      { reviewId: 2, url: '/spot2image2.jpg' },
      { reviewId: 2, url: '/spot2image3.jpg' },

      // Review 3 – Spot 3
      { reviewId: 3, url: '/spot3image2.jpg' },
      { reviewId: 3, url: '/spot3image3.jpg' },

      // Review 4 – Spot 4
      { reviewId: 4, url: '/spot4image2.jpg'},
      { reviewId: 4, url: '/spot4image3.jpg' },

      // Review 5 – Spot 5
      { reviewId: 5, url: '/spot5image2.jpg' },
      { reviewId: 5, url: '/spot5image3.jpg' },

      // Review 6 – Spot 6
      { reviewId: 6, url: '/spot6image2.jpg' },
      { reviewId: 6, url: '/spot6image3.jpg' },

      // Review 7 – Spot 7
      { reviewId: 7, url: '/spot7image2.jpg' },
      { reviewId: 7, url: '/spot7image3.jpg' },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const { Op } = Sequelize;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] }
    }, {});
  }
};
