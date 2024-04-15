import Cart from './Cart';
import Category from './Category';
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

  User.sync({ force: false });
  Role.sync({ force: false });
  ProductCategory.sync({ force: false });
  ProductColor.sync({ force: false });
  ProductGeneralImage.sync({ force: false });
  ProductImage.sync({ force: false });
  ProductInventory.sync({ force: false });
  Product.sync({ force: false });
  ProductSize.sync({ force: false });
  Category.sync({ force: false });
  Cart.sync({ force: false });
};
