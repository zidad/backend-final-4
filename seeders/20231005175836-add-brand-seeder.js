/* eslint-disable no-unused-vars */
'use strict';

const { Brand } = require('../models');
const { brandData } = require('../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all(brandData.map(async data => {
      try {
        await Brand.findOrCreate({
          where: { id: data.id },
          defaults: data,
        });
      } catch (error) {
        console.error(error);
      }
    }));
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Brand', null, {});
  }
};
