import { Request, Response } from 'express';
import HttpStatusCode from '../exceptions/HttpStatusCode';
import { userRepository } from '../repositories/index';

async function login(req: Request, res: Response) {
  try {
    const { email, password, loginType } = req.body;
    const user = await userRepository.login({
      email,
      password,
    });
    res.status(HttpStatusCode.OK).json(user);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

async function register(req: Request, res: Response) {
  try {
    const { name, email, password, roleId, phone } = req.body;
    const user = await userRepository.register({
      name,
      email,
      password,
      phone,
    });
    res.status(HttpStatusCode.OK).json(user);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId, address } = req.body;
    const user = await userRepository.updateUser({
      userId,
      address,
    });
    res.status(HttpStatusCode.OK).json(user);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await userRepository.getUserById(Number(userId));
    res.status(HttpStatusCode.OK).json(user);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
};

export default {
  login,
  register,
  updateUser,
  getUserById,
};
