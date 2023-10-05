/* eslint-disable no-unused-vars */
'use strict';

const { Product } = require('../models');
const { productData } = require('../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all(productData.map(async data => {
      try {
        await Product.findOrCreate({
          where: { id: data.id },
          defaults: data,
        });
      } catch (error) {
        console.error(error);
      }
    }));
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Product', null, {});
  }
};
