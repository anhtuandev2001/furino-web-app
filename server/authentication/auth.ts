import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpStatusCode from '../exceptions/HttpStatusCode';

export default function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const unauthenticatedUrls = [
    '/users/login',
    '/users/register',
    '/products',
    '/categories',
    '/products/getcount',
    '/'
  ];

  const url = req.url.toLowerCase().trim();

  if (unauthenticatedUrls.includes(url) || url.startsWith('/products')) {
    next();
    return;
  }

  const token = req.headers?.authorization?.split(' ')[1];
  try {
    const jwtObject = jwt.verify(
      token || '',
      process.env.JWT_SECRET ?? ''
    ) as jwt.JwtPayload;

    const isExpired = Date.now() >= jwtObject?.exp! * 1000;

    if (isExpired) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: 'Token is expired',
      });
      res.end();
    } else {
      next();
    }
  } catch (exception: any) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: exception.message,
    });
  }
}
