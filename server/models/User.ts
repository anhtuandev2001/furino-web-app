import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize';

const User = sequelize.define(
  'users',
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, Infinity],
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10, 11],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
    },
    image: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    address: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

const Role = sequelize.define(
  'roles',
  {
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export { User, Role };
