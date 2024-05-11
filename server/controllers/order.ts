import { Request, Response } from 'express';
import HttpStatusCode from '../exceptions/HttpStatusCode';
import { orderRepository } from '../repositories/index';

async function insertOrder(req: Request, res: Response) {
  try {
    const {
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
    } = req.body;
    const order = await orderRepository.insertOrder({
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
    });
    res.status(HttpStatusCode.OK).json(order);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

async function getOrderByUserId(req: Request, res: Response) {
  try {
    const { userId, status } = req.params;
    const order = await orderRepository.getOrderByUserId({
      userId: Number(userId),
      status: Number(status),
    });
    res.status(HttpStatusCode.OK).json(order);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

const getOrderById = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await orderRepository.getOrderById(Number(orderId));
    res.status(HttpStatusCode.OK).json(order);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;
    const order = await orderRepository.updateOrder({
      orderId,
      status,
    });
    res.status(HttpStatusCode.OK).json(order);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
};

export default {
  insertOrder,
  getOrderByUserId,
  getOrderById,
  updateOrder,
};
