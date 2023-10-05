/* eslint-disable no-unused-vars */
'use strict';

const { Payment } = require('../models');
const { paymentData } = require('../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all(paymentData.map(async data => {
      try {
        await Payment.findOrCreate({
          where: { id: data.id },
          defaults: data,
        });
      } catch (error) {
        console.error(error);
      }
    }));
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Payment', null, {});
  }
};
