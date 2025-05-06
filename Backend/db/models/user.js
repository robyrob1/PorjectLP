'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Spot, {
        foreignKey: 'ownerId',
        onDelete: 'CASCADE'
      });

      User.hasMany(models.Review, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });

      /*implement later
      User.hasMany(models.Booking, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      });
      */
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          notEmpty: true,
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true,
          notEmpty: true
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
          notEmpty: true
        },
      },
      firstName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: [1, 30],
          isAlphanumeric: true,
          notEmpty: true
        },
      },
      lastName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: [1, 30],
          isAlphanumeric: true,
          notEmpty: true
        }
      }
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
      },
    }
  );
  return User;
};
