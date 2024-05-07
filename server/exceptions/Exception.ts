import { print, OutputType } from '../helpers/print';

export default class Exception extends Error {
  static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username and password";
  static WRONG_CONNECTION_STRING = 'Wrong server name/connection string';
  static CANNOT_CONNECT_MONGODB = 'Cannot connect to Mongoose';

  static CANNOT_REGISTER_USER = 'Cannot register user';
  static WRONG_EMAIL_OR_PASSWORD = 'Wrong email or password';
  static CANNOT_FIND_USER_BY_ID = 'Cannot find user with id';
  static USER_NOT_FOUND = 'User not found';
  static USER_EXIST = 'User already exists';

  static CANNOT_FIND_PRODUCT_BY_ID = 'Cannot find product with id';
  static PRODUCT_NOT_FOUND = 'Product not found';
  static CANNOT_CREATE_PRODUCT = 'Cannot create product';
  static PRODUCT_NOT_ENOUGH = 'Product not enough';
  static PRODUCT_OUT_OF_STOCK = 'Product out of stock';

  static CANNOT_FIND_CART_BY_ID = 'Cannot find cart with id';
  static CART_NOT_FOUND = 'Cart not found';

  static CANNOT_FIND_FAVORITE_BY_USER_ID = 'Cannot find favorite with userId';
  static FAVORITE_NOT_FOUND = 'Favorite not found';

  static CANNOT_FIND_ORDER_BY_USER_ID = 'Cannot find order with userId';
  static ORDER_NOT_FOUND = 'Order not found';

  static CANNOT_INSERT_ORDER = 'Cannot insert order';

  static CANNOT_FIND_ADDRESS_BY_ID = 'Cannot find address with id';
  static ADDRESS_NOT_FOUND = 'Address not found';
  static CANNOT_INSERT_ADDRESS = 'Cannot insert address';

  static CANNOT_FIND_CATEGORY_BY_ID = 'Cannot find category with id';
  static CATEGORY_NOT_FOUND = 'Category not found';
  static CANNOT_INSERT_CATEGORY = 'Cannot insert category';

  static CANNOT_FIND_DEFAULT_ADDRESS = 'Cannot find default address';
  static WRONG_PASSWORD = 'Wrong password';

  static WRONG_ROLE = 'Wrong role';

  static USER_DISABLE = 'User disable';
  static CART_ITEM_NOT_FOUND: any;
  static CANNOT_CONNECT_POSTGRESQL: any;

  static ORDER_ALREADY_CANCELLED = 'Order already cancelled';
  validationErrors: {};

  constructor(message: string | undefined, validationErrors = {}) {
    super(message); //call constructor of parent class(Error)
    print(message || '', OutputType.ERROR);
    this.validationErrors = validationErrors;
  }
}
