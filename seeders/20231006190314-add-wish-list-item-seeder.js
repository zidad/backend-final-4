/* eslint-disable no-unused-vars */
'use strict';

const { WishListItem } = require('../models');
const { wishListItemData } = require('../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all(wishListItemData.map(async data => {
      try {
        await WishListItem.findOrCreate({
          where: { id: data.id },
          defaults: data,
        });
      } catch (error) {
        console.error(error);
      }
    }));
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('WishListItem', null, {});
  }
};
