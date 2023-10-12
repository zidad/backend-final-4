const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

sequelize
  .sync({ force: false })
  .then(() => {
    sequelize
      .authenticate()
      .then(() => {
        console.log('Database connection has been established successfully.');
      })
      .catch((error) => {
        console.error('Unable to authenticate with the database:', error);
      });
  })
  .catch((error) => {
    console.error('Unable to synchronize the database:', error);
  });

module.exports = sequelize;
