/* eslint-disable no-unused-vars */
'use strict';

const { Order } = require('../models');
const { orderData } = require('../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all(orderData.map(async data => {
      try {
        await Order.findOrCreate({
          where: { id: data.id },
          defaults: data,
        });
      } catch (error) {
        console.error(error);
      }
    }));
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Order', null, {});
  }
};
