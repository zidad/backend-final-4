/* eslint-disable no-unused-vars */
'use strict';

const { Address } = require('../models');
const { addressData } = require('../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all(addressData.map(async data => {
      try {
        await Address.findOrCreate({
          where: { id: data.id },
          defaults: data,
        });
      } catch (error) {
        console.error(error);
      }
    }));
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Address', null, {});
  }
};
