import Cart from './Cart';
import Category from './Category';
import { Order, OrderItem } from './Order';
import {
  Product,
  ProductCategory,
  ProductColor,
  ProductGeneralImage,
  ProductImage,
  ProductInventory,
  ProductSize,
} from './Product';
import { Role, User } from './User';

export const relationship = () => {
  Product.hasMany(ProductGeneralImage, { foreignKey: 'productId' });
  Product.hasMany(ProductInventory, { foreignKey: 'productId' });
  Product.hasMany(ProductImage, { foreignKey: 'productId' });
  Product.hasMany(ProductCategory, { foreignKey: 'productId' });
  Product.hasMany(Cart, { foreignKey: 'productId' });

  Category.hasMany(ProductCategory, { foreignKey: 'categoryId' });

  ProductSize.hasMany(ProductInventory, { foreignKey: 'productSizeId' });
  ProductSize.hasMany(Cart, { foreignKey: 'productSizeId' });

  ProductColor.hasMany(ProductInventory, { foreignKey: 'productColorId' });
  ProductColor.hasMany(ProductImage, { foreignKey: 'productColorId' });
  ProductColor.hasMany(Cart, { foreignKey: 'productColorId' });

  ProductInventory.belongsTo(Product, {
    foreignKey: 'productId',
    onDelete: 'CASCADE',
  });
  ProductInventory.belongsTo(ProductColor, { foreignKey: 'productColorId' });
  ProductInventory.belongsTo(ProductSize, { foreignKey: 'productSizeId' });

  ProductGeneralImage.belongsTo(Product, {
    foreignKey: 'productId',
    onDelete: 'CASCADE',
  });

  ProductImage.belongsTo(Product, {
    foreignKey: 'productId',
    onDelete: 'CASCADE',
  });
  ProductImage.belongsTo(ProductColor, { foreignKey: 'productColorId' });

  ProductCategory.belongsTo(Product, {
    foreignKey: 'productId',
    onDelete: 'CASCADE',
  });
  ProductCategory.belongsTo(Category, { foreignKey: 'categoryId' });

  Cart.belongsTo(Product, { foreignKey: 'productId' });
  Cart.belongsTo(ProductColor, { foreignKey: 'productColorId' });
  Cart.belongsTo(ProductSize, { foreignKey: 'productSizeId' });

  User.belongsTo(Role, { foreignKey: 'roleId' });

  Role.hasMany(User, { foreignKey: 'roleId' });

  Order.belongsTo(User, { foreignKey: 'userId' });
  Order.hasMany(OrderItem, { foreignKey: 'orderId' });

  OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
  OrderItem.belongsTo(Product, { foreignKey: 'productId' });
  OrderItem.belongsTo(ProductColor, { foreignKey: 'productColorId' });
  OrderItem.belongsTo(ProductSize, { foreignKey: 'productSizeId' });

  Role.sync({ force: false });
  User.sync({ force: false });
  Category.sync({ force: false });
  ProductColor.sync({ force: false });
  ProductSize.sync({ force: false });
  Product.sync({ force: false });
  ProductCategory.sync({ force: false });
  ProductGeneralImage.sync({ force: false });
  ProductImage.sync({ force: false });
  ProductInventory.sync({ force: false });
  Cart.sync({ force: false });
  Order.sync({ force: false });
  OrderItem.sync({ force: false });
};
