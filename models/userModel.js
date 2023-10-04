const DataTypes = require('sequelize');
const sequelize = require('../utils/dataBaseConnection');
const bcrypt = require('bcrypt');


const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER(15),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(25),
    allowNull: false,
    validate: {
      isAlpha: {
        msg: 'First name must only contain letters',
      },
    },
    set(value) {
      // Convert the first name to lowercase before saving
      this.setDataValue('firstName', value.toLowerCase());
    },
  },
  lastName: {
    type: DataTypes.STRING(25),
    allowNull: false,
    validate: {
      isAlpha: {
        msg: 'Last name must only contain letters',
      },
    },
    set(value) {
      // Convert the last name to lowercase before saving
      this.setDataValue('lastName', value.toLowerCase());
    },
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Invalid email format',
      },
    },
  },
  mobile: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isNumeric: {
        msg: 'Mobile must only contain numbers',
      },
    },
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    validate: {
      isDate: {
        msg: 'Invalid date format',
      },
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    set(value) {
      const hashedPassword = bcrypt.hashSync(value, 10);
      this.setDataValue('password', hashedPassword);
    },
  },
  imageUrl: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Image URL cannot be empty',
      },
      isURL: {
        msg: 'Invalid URL format',
      },
    },
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
    },
  },
}, {
  freezeTableName: true,
  timestamps: false,
});


module.exports = User;


// To-Do
// Add role field
// Add imageUrl field


// mobile: {
//     type: DataTypes.STRING(20),
//     allowNull: false,
//     validate: {
//         is: {
//             args: /^(\+\d{1,})?\d{1,}$/, // Allows an optional '+' at the beginning
//             msg: 'Mobile must be a valid phone number',
//         },
//     },
// },
