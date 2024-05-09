import Cart from '../models/Cart';
import {
  Product,
  ProductColor,
  ProductImage,
  ProductInventory,
  ProductSize,
} from '../models/index';

const getCarts = async ({ userId }: { userId: number }) => {
  try {
    const carts = await Cart.findAll({
      where: {
        userId,
      },
      order: [['cartId', 'DESC']],
    });

    const newCarts = await Promise.all(
      carts.map(async (cart: any) => {
        const product: any = await Product.findByPk(cart.productId, {
          include: [
            {
              where: {
                productColorId: cart.productColorId,
                productSizeId: cart.productSizeId,
              },
              model: ProductInventory,
              as: 'productInventories',
              include: [
                { model: ProductColor, as: 'productColor' },
                { model: ProductSize, as: 'productSize' },
              ],
            },
            {
              model: ProductImage,
              as: 'productImages',
              where: { productColorId: cart.productColorId },
            },
          ],
        });

        return {
          cartId: cart.cartId,
          quantity: cart.quantity,
          productId: product.productId,
          productName: product.name,
          productImage: product.productImages[0].image,
          price: product.productInventories[0].price,
          priceDiscount: product.productInventories[0].priceDiscount,
          productColor: product.productInventories[0].productColor,
          productSize: product.productInventories[0].productSize,
        };
      })
    );

    return newCarts;
  } catch (exception: any) {
    throw new Error(exception.message);
  }
};

const insertCart = async ({
  userId,
  productId,
  quantity,
  productColorId,
  productSizeId,
}: {
  userId: number;
  productId: number;
  quantity: number;
  productColorId: number;
  productSizeId: number;
}) => {
  try {
    const product: any = await Product.findByPk(productId, {
      include: [
        {
          where: {
            productColorId: productColorId,
            productSizeId: productSizeId,
          },
          model: ProductInventory,
          as: 'productInventories',
          include: [
            { model: ProductColor, as: 'productColor' },
            { model: ProductSize, as: 'productSize' },
          ],
        },
        {
          model: ProductImage,
          as: 'productImages',
          where: { productColorId: productColorId },
        },
      ],
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const cartExist: any = await Cart.findOne({
      where: {
        userId,
        productId,
        productColorId,
        productSizeId,
      },
    });

    if (cartExist) {
      if (
        cartExist.quantity + quantity >
        product.productInventories[0].quantity
      ) {
        throw new Error('Quantity is not enough');
      }
      cartExist.quantity += quantity;
      await cartExist.save();
      return {
        cartId: cartExist.cartId,
        quantity: cartExist.quantity,
        productId: product.productId,
        productName: product.name,
        productImage: product.productImages[0].image,
        price: product.productInventories[0].price,
        priceDiscount: product.productInventories[0].priceDiscount,
        productColor: product.productInventories[0].productColor,
        productSize: product.productInventories[0].productSize,
      };
    }

    if (quantity > product.productInventories[0].quantity) {
      throw new Error('Quantity is not enough');
    }

    const cart: any = await Cart.create({
      userId,
      productId,
      quantity,
      productColorId,
      productSizeId,
    });

    return {
      cartId: cart.cartId,
      quantity: cart.quantity,
      productId: product.productId,
      productName: product.name,
      productImage: product.productImages[0].image,
      price: product.productInventories[0].price,
      priceDiscount: product.productInventories[0].priceDiscount,
      productColor: product.productInventories[0].productColor,
      productSize: product.productInventories[0].productSize,
    };

    // return {
    //   cartId: cart.cartId,
    //   quantity: cart.quantity,
    //   productId: product.productId,
    //   productName: product.name,
    //   productImage: product.productImages[0].image,
    //   price: product.productInventories[0].price,
    //   priceDiscount: product.productInventories[0].priceDiscount,
    //   productColor: product.productInventories[0].productColor,
    //   productSize: product.productInventories[0].productSize,
    // };
  } catch (exception: any) {
    throw new Error(exception.message);
  }
};

const deleteCart = async (cartId: number) => {
  try {
    const cart = await Cart.findByPk(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }
    await cart.destroy();
    return cart;
  } catch (exception: any) {
    throw new Error(exception.message);
  }
};

const updateCart = async ({
  cartId,
  quantity,
}: {
  cartId: number;
  quantity: number;
}) => {
  try {
    const cart: any = await Cart.findByPk(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }
    const product: any = await Product.findByPk(cart.productId, {
      include: [
        {
          where: {
            productColorId: cart.productColorId,
            productSizeId: cart.productSizeId,
          },
          model: ProductInventory,
          as: 'productInventories',
        },
      ],
    });
    if (quantity > product.productInventories[0].quantity) {
      throw new Error('Quantity is not enough');
    }
    cart.quantity = quantity;
    await cart.save();
    return cart;
  } catch (exception: any) {
    throw new Error(exception.message);
  }
};

const getTotalCart = async (userId: number) => {
  try {
    const carts: any = await Cart.findAll({
      where: {
        userId,
      },
    });

    const total = carts.reduce((total: any, cart: any) => {
      return total + cart.quantity;
    }, 0);

    return total;
  } catch (exception: any) {
    throw new Error(exception.message);
  }
};

export default {
  insertCart,
  getCarts,
  deleteCart,
  updateCart,
  getTotalCart,
};
