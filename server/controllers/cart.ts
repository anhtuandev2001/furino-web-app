import { Request, Response } from 'express';
import HttpStatusCode from '../exceptions/HttpStatusCode';
import { cartRepository } from '../repositories/index';

async function getCarts(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const carts = await cartRepository.getCarts({ userId: Number(userId) });
    res.status(HttpStatusCode.OK).json(carts);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

async function insertCart(req: Request, res: Response) {
  try {
    const { userId, productId, quantity, productColorId, productSizeId } =
      req.body;
    const cart = await cartRepository.insertCart({
      userId,
      productId,
      quantity,
      productColorId,
      productSizeId,
    });
    res.status(HttpStatusCode.INSERT_OK).json(cart);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

async function deleteCart(req: Request, res: Response) {
  try {
    const { cartId } = req.params;
    const cart = await cartRepository.deleteCart(Number(cartId));
    res.status(HttpStatusCode.DELETE_OK).json(cart);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

async function updateCart(req: Request, res: Response) {
  try {
    const { cartId } = req.params;
    const { quantity } = req.body;
    const cart = await cartRepository.updateCart({
      cartId: Number(cartId),
      quantity,
    });
    res.status(HttpStatusCode.UPDATE_OK).json(cart);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

const getTotalCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const totalCart = await cartRepository.getTotalCart(Number(userId));
    res.status(HttpStatusCode.OK).json(totalCart);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

export default {
  getCarts,
  insertCart,
  deleteCart,
  updateCart,
  getTotalCart,
};
