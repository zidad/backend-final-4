/* eslint-disable no-unused-vars */
'use strict';

const { RatingReview } = require('../models');
const { ratingReviewData } = require('../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await Promise.all(ratingReviewData.map(async data => {
      try {
        await RatingReview.findOrCreate({
          where: { id: data.id },
          defaults: data,
        });
      } catch (error) {
        console.error(error);
      }
    }));
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('RatingReview', null, {});
  }
};
