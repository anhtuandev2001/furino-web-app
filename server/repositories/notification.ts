import sequelize from '../database/sequelize';
import {
  Notification,
  Order,
  OrderItem,
  Product,
  ProductImage,
} from '../models';

const getNotifications = async ({ userId }: { userId: number }) => {
  const t = await sequelize.transaction();
  try {
    const notifications: any = await Notification.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: Order,
          include: [
            {
              model: OrderItem,
            },
          ],
        },
      ],
      order: [['notificationId', 'DESC']],
      transaction: t,
    });

    const plainNotifications = notifications.map(
      (o: { get: (arg0: { plain: boolean }) => any }) => o.get({ plain: true })
    );

    await Promise.all(
      plainNotifications.map(async (notification: any) => {
        if (notification.order && notification.order.orderItems.length > 0) {
          const productImage: any = await ProductImage.findOne({
            where: {
              productId: notification.order.orderItems[0].productId,
              productColorId: notification.order.orderItems[0].productColorId,
            },
            transaction: t,
          });
          
          notification.image = productImage?.image;
          console.log('Notification Image:', notification.image);
        }
      })
    );

    await t.commit();

    return plainNotifications;
  } catch (exception: any) {
    await t.rollback();
    throw new Error(exception.message);
  }
};


export default { getNotifications };
