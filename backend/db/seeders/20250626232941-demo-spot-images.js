'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;   
}

module.exports = {
  async up() {
    try {
      const images = [
        { spotId: 1, url: '/image1.jpg', preview: true },
        { spotId: 1, url: '/image2.jpg', preview: false },
        { spotId: 2, url: '/image3.jpg', preview: true },
        { spotId: 2, url: '/image4.jpg', preview: false },
        { spotId: 3, url: '/image5.jpg', preview: true },
        { spotId: 3, url: '/image6.jpg', preview: false }
      ];

      console.log("Attempting to insert spot images:", images);
      await SpotImage.bulkCreate(images); // Removed `validate: true`
    } catch (err) {
      console.error("❌ Seeding SpotImages failed:", err);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const { Op } = Sequelize;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
