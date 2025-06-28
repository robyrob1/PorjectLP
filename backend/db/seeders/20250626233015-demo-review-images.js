'use strict';


//Sourced ai for images


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
        url: '/image7.jpg'
      },
      {
        reviewId: 2,
        url: '/image8.jpg'
      },
      {
        reviewId: 3,
        url: '/image9.jpg'
      },
      {
        reviewId: 4,
        url: '/image10.jpg'
      },
      {
        reviewId: 5,
        url: '/image11.jpg'
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
