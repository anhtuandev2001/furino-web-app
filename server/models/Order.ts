import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize';

const Order = sequelize.define(
  'orders',
  {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    orderStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ward: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

const OrderItem = sequelize.define(
  'orderItems',
  {
    orderItemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productColorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productSizeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export { Order, OrderItem };
