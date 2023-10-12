/* eslint-disable no-unused-vars */
'use strict';

const { User } = require('../models');
const { userData } = require('../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all(userData.map(async data => {
      try {
        await User.findOrCreate({
          where: { email: data.email },
          defaults: data,
        });
      } catch (error) {
        console.error(error);
      }
    }));
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('User', null, {});
  }
};
