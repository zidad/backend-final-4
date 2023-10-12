/* eslint-disable no-unused-vars */
'use strict';

const { Category } = require('../models');
const { categoryData } = require('../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all(categoryData.map(async data => {
      try {
        await Category.findOrCreate({
          where: { id: data.id },
          defaults: data,
        });
      } catch (error) {
        console.error(error);
      }
    }));
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Category', null, {});
  }
};
