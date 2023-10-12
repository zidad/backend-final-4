/* eslint-disable no-unused-vars */
'use strict';

const { CartItem } = require('../models');
const { cartItemData } = require('../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all(cartItemData.map(async data => {
      try {
        await CartItem.findOrCreate({
          where: { id: data.id },
          defaults: data,
        });
      } catch (error) {
        console.error(error);
      }
    }));
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('CartItem', null, {});
  }
};
