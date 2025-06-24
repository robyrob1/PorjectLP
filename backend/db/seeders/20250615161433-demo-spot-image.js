'use strict';

const { SpotImage } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://cdn.pixabay.com/photo/2023/05/10/06/12/fantasy-cottage-1234567_1280.jpg',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://cdn.pixabay.com/photo/2022/11/15/10/00/medieval-castle-7654321_1280.jpg',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://cdn.pixabay.com/photo/2024/01/20/08/45/fantasy-map-2345678_1280.png',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://cdn.pixabay.com/photo/2023/08/05/14/20/forest-cottage-3456789_1280.jpg',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://cdn.pixabay.com/photo/2024/02/11/09/30/rpg-landscape-4567890_1280.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://cdn.pixabay.com/photo/2023/12/01/12/00/dragon-cave-5678901_1280.jpg',
        preview: false,
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
