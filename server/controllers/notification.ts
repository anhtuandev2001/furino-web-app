import { Request, Response } from 'express';
import HttpStatusCode from '../exceptions/HttpStatusCode';
import { notificationRepository } from '../repositories/index';

async function getNotifications(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const carts = await notificationRepository.getNotifications({ userId: Number(userId) });
    res.status(HttpStatusCode.OK).json(carts);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

const updateNotification = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params;
    await notificationRepository.updateNotification({ notificationId: Number(notificationId) });
    res.status(HttpStatusCode.OK).json('Notification updated');
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

export default {
  getNotifications,
  updateNotification
};
