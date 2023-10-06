/* eslint-disable no-unused-vars */
'use strict';

const { OrderItem } = require('../models');
const { orderItemData } = require('../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all(orderItemData.map(async data => {
      try {
        await OrderItem.findOrCreate({
          where: { id: data.id },
          defaults: data,
        });
      } catch (error) {
        console.error(error);
      }
    }));
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('OrderItem', null, {});
  }
};
