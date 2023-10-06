/* eslint-disable no-unused-vars */
'use strict';

const { Discount } = require('../models');
const { discountData } = require('../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all(discountData.map(async data => {
      try {
        await Discount.findOrCreate({
          where: { id: data.id },
          defaults: data,
        });
      } catch (error) {
        console.error(error);
      }
    }));
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Discount', null, {});
  }
};
