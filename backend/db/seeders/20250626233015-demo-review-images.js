'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'https://cdn.pixabay.com/photo/2024/07/01/04/28/mountain-8864325_1280.jpg'
      },
      {
        reviewId: 2,
        url: 'https://cdn.pixabay.com/photo/2023/11/15/18/10/fantasy-8389437_1280.jpg'
      },
      {
        reviewId: 3,
        url: 'https://cdn.pixabay.com/photo/2024/04/14/03/15/ai-generated-8694734_1280.jpg'
      },
      {
        reviewId: 4,
        url: 'https://cdn.pixabay.com/photo/2024/06/18/21/14/magic-8849017_1280.jpg'
      },
      {
        reviewId: 5,
        url: 'https://cdn.pixabay.com/photo/2024/05/10/10/13/ai-generated-8752761_1280.jpg'
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
