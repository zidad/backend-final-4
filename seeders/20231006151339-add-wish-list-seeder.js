/* eslint-disable no-unused-vars */
'use strict';

const { WishList } = require('../models');
const { wishListData } = require('../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all(wishListData.map(async data => {
      try {
        await WishList.findOrCreate({
          where: { id: data.id },
          defaults: data,
        });
      } catch (error) {
        console.error(error);
      }
    }));
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('WishList', null, {});
  }
};
