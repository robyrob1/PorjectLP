'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;   
}
module.exports = {
  async up() {
    await SpotImage.bulkCreate([
      // Spot 1 – Mage's Lakeside Cabin
      { spotId: 1, url: '/spot1image1.jpg', preview: true },
      { spotId: 1, url: '/spot1image2.jpg', preview: false },
      { spotId: 1, url: '/spot1image3.jpg', preview: false },

      // Spot 2 – Elven Vineyard Retreat
      { spotId: 2, url: '/spot2image1.jpg', preview: true },
      { spotId: 2, url: '/spot2image2.jpg', preview: false },
      { spotId: 2, url: '/spot2image3.jpg', preview: false },

      // Spot 3 – Tavern Above The Guildhall
      { spotId: 3, url: '/spot3image1.jpg', preview: true },
      { spotId: 3, url: '/spot3image2.jpg', preview: false },
      { spotId: 3, url: '/spot3image3.jpg', preview: false },

      // Spot 4 – Druid’s Wildflower Haven
      { spotId: 4, url: '/spot4image1.jpg', preview: true },
      { spotId: 4, url: '/spot4image2.jpg', preview: false },
      { spotId: 4, url: '/spot4image3.jpg', preview: false },

      // Spot 5 – Canopy Treefolk Sanctuary
      { spotId: 5, url: '/spot5image1.jpg', preview: true },
      { spotId: 5, url: '/spot5image2.jpg', preview: false },
      { spotId: 5, url: '/spot5image3.jpg', preview: false },

      // Spot 6 – Seashell Siren’s Bungalow
      { spotId: 6, url: '/spot6image1.jpg', preview: true },
      { spotId: 6, url: '/spot6image2.jpg', preview: false },
      { spotId: 6, url: '/spot6image3.jpg', preview: false },

      // Spot 7 – Alchemist’s Roost in Wyrmsgate
      { spotId: 7, url: '/spot7image1.jpg', preview: true },
      { spotId: 7, url: '/spot7image2.jpg', preview: false },
      { spotId: 7, url: '/spot7image3.jpg', preview: false },
    ]);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const { Op } = Sequelize;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
