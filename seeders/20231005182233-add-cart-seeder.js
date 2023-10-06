/* eslint-disable no-unused-vars */
'use strict';

const { Cart } = require('../models');
const { cartData } = require('../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all(cartData.map(async data => {
      try {
        await Cart.findOrCreate({
          where: { id: data.id },
          defaults: data,
        });
      } catch (error) {
        console.error(error);
      }
    }));
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Cart', null, {});
  }
};
