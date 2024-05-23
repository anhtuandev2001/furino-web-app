import sequelize from '../database/sequelize';
import Exception from '../exceptions/Exception';
import {
  Cart,
  Notification,
  Order,
  OrderItem,
  Product,
  ProductColor,
  ProductImage,
  ProductInventory,
  ProductSize,
  User,
} from '../models/index';
import { statusDefault } from '../utils/constants/status';

const insertOrder = async ({
  userId,
  address,
  province,
  district,
  ward,
  phone,
  carts,
  firstName,
  lastName,
  save,
}: {
  userId: number;
  address: string;
  province: string;
  district: string;
  ward: string;
  phone: string;
  carts: any[];
  firstName: string;
  lastName: string;
  save?: boolean;
}) => {
  const t = await sequelize.transaction();
  try {
    const cartFound: any = await Cart.findAll({
      where: {
        cartId: carts,
      },
      transaction: t,
    });

    if (cartFound.length !== carts.length) {
      throw new Error(Exception.CART_NOT_FOUND);
    }

    for (const cart of cartFound) {
      const product: any = await Product.findOne({
        where: {
          productId: cart.productId,
        },
        include: [
          {
            model: ProductInventory,
            where: {
              productSizeId: cart.productSizeId,
              productColorId: cart.productColorId,
            },
          },
        ],
        transaction: t,
      });

      product.productInventories[0].sold += cart.quantity;

      await product.save({ transaction: t });

      if (!product) {
        throw new Error(Exception.PRODUCT_NOT_FOUND);
      }

      if (cart.quantity > product.productInventories[0].quantity) {
        throw new Error(Exception.PRODUCT_OUT_OF_STOCK);
      }

      cart.price = product.productInventories[0].price;
      product.productInventories[0].quantity -= cart.quantity;
      await product.productInventories[0].save({ transaction: t });
    }

    const totalQuantity = cartFound.reduce(
      (quantity: number, cart: any) => quantity + cart.quantity,
      0
    );

    const totalPrice = cartFound.reduce(
      (total: number, cart: any) => Number(total) + Number(cart.price),
      0
    );

    const order: any = await Order.create(
      {
        userId,
        orderDate: new Date(),
        orderStatus: 0,
        address,
        province,
        district,
        ward,
        phone,
        quantity: totalQuantity,
        total: totalPrice,
        firstName,
        lastName,
      },
      { transaction: t }
    );

    await Promise.all(
      cartFound.map(async (cart: any) => {
        await OrderItem.create(
          {
            orderId: order.orderId,
            productId: cart.productId,
            productColorId: cart.productColorId,
            productSizeId: cart.productSizeId,
            quantity: cart.quantity,
            price: cart.price,
          },
          { transaction: t }
        );
        await cart.destroy({ transaction: t });
      })
    );

    if (save) {
      User.update(
        {
          address: JSON.stringify({
            firstName,
            lastName,
            address,
            province,
            district,
            ward,
            phone,
          }),
        },
        {
          where: {
            userId,
          },
        }
      );
    }

    await t.commit();

    return order;
  } catch (error: any) {
    await t.rollback();
    throw new Error(error.message);
  }
};

const getOrderByUserId = async ({
  userId,
  status,
}: {
  userId: number;
  status: number;
}) => {
  try {
    const statusQuery = statusDefault.find((s) => s.id === status);
    const order: any = await Order.findAll({
      where: {
        userId,
        orderStatus: statusQuery?.id,
      },
      include: [
        {
          model: OrderItem,
          attributes: ['orderId', 'productId', 'quantity', 'price'],
          include: [
            {
              model: ProductColor,
            },
            { model: ProductSize },
            {
              model: Product,
              attributes: ['productId', 'name'],
              include: [
                {
                  model: ProductImage,
                  attributes: ['image', 'productColorId'],
                },
              ],
            },
          ],
        },
      ],
    });

    const plainOrder = order.map(
      (o: { get: (arg0: { plain: boolean }) => any }) => o.get({ plain: true })
    );

    plainOrder.forEach(async (o: any) => {
      o.orderItems.forEach((item: any) => {
        item.product.productImages = item.product.productImages.find(
          (image: any) =>
            image.productColorId === item.productColor.productColorId
        ).image;
      });
    });

    return plainOrder;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getOrderById = async (orderId: number) => {
  try {
    const order: any = await Order.findByPk(orderId, {
      include: [
        {
          model: OrderItem,
          attributes: ['orderId', 'productId', 'quantity', 'price'],
          include: [
            {
              model: ProductColor,
            },
            { model: ProductSize },
            {
              model: Product,
              attributes: ['productId', 'name'],
              include: [
                {
                  model: ProductImage,
                  attributes: ['image', 'productColorId'],
                },
              ],
            },
          ],
        },
      ],
    });

    const plainOrder = order.get({ plain: true });

    plainOrder.orderItems.forEach((item: any) => {
      item.product.productImages = item.product.productImages.find(
        (image: any) =>
          image.productColorId === item.productColor.productColorId
      ).image;
    });

    return plainOrder;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const updateOrder = async ({
  orderId,
  status,
}: {
  orderId: number;
  status: number;
}) => {
  const t = await sequelize.transaction();
  try {
    const order: any = await Order.findByPk(orderId, {
      include: [
        {
          model: OrderItem,
        },
      ],
    });

    if (!order) {
      throw new Error(Exception.ORDER_NOT_FOUND);
    }

    if (order.orderStatus === 3) {
      throw new Error(Exception.ORDER_ALREADY_CANCELLED);
    }

    order.orderStatus = status;
    await order.save({ transaction: t });
    if (status === 3) {
      const plainOrder = order.get({ plain: true });

      await Promise.all(
        plainOrder.orderItems.map(async (item: any) => {
          const product: any = await Product.findByPk(item.productId, {
            include: [
              {
                model: ProductInventory,
                where: {
                  productColorId: item.productColorId,
                  productSizeId: item.productSizeId,
                },
              },
            ],
            transaction: t,
          });

          product.productInventories[0].quantity += item.quantity;
          product.productInventories[0].sold -= item.quantity;
          await product.productInventories[0].save({ transaction: t });
        })
      );
    }

    const notificationTitle = `Order #${order.orderId} has been ${
      statusDefault.find((s) => s.id === status)?.name
    }`;

    const notificationMessage = () => {
      switch (status) {
        case 2:
          return 'Your order has been delivered';
        case 3:
          return 'Your order has been cancelled';
        default:
          return '';
      }
    };

    await Notification.create(
      {
        userId: order.userId,
        orderId,
        title: notificationTitle,
        message: notificationMessage(),
        notificationDate: new Date(),
      },
      { transaction: t }
    );

    await t.commit();

    return order;
  } catch (error: any) {
    await t.rollback();
    throw new Error(error.message);
  }
};

export default {
  insertOrder,
  getOrderByUserId,
  getOrderById,
  updateOrder,
};
