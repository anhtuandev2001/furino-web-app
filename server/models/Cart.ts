import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize';

const Cart = sequelize.define(
  'carts',
  {
    cartId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
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
  },
  {
    timestamps: false,
  }
);

export default Cart;
