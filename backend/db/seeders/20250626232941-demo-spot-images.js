'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;   
}

module.exports = {
  async up () {
    await SpotImage.bulkCreate([

      {
        spotId: 1,
        url: 'https://cdn.pixabay.com/photo/2025/06/25/11/41/cottage-9679754_1280.png', 
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://cdn.pixabay.com/photo/2022/08/13/18/25/river-7384240_640.jpg',   
        preview: false,
      },


      {
        spotId: 2,
        url: 'https://cdn.pixabay.com/photo/2024/04/05/12/20/ai-generated-8677313_1280.jpg', 
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://cdn.pixabay.com/photo/2019/12/14/19/18/sunset-4695551_1280.jpg',      
        preview: false,
      },


      {
        spotId: 3,
        url: 'https://cdn.pixabay.com/photo/2017/08/14/14/34/fantasy-2640686_1280.jpg',      // dragon-guarded cave entrance
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://cdn.pixabay.com/photo/2023/03/29/15/49/fantasy-7885836_1280.jpg',      // bottled arcane landscape
        preview: false,
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const { Op } = Sequelize;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
