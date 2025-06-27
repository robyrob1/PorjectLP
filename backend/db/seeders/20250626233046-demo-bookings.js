'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        startDate: '2025-07-10',
        endDate: '2025-07-15'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2025-08-01',
        endDate: '2025-08-05'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2025-09-20',
        endDate: '2025-09-25'
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
