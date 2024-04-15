import { Request, Response } from 'express';
import HttpStatusCode from '../exceptions/HttpStatusCode';
import { userRepository } from '../repositories/index';

async function login(req: Request, res: Response) {
  try {
    const { email, password, loginType } = req.body;
    const user = await userRepository.login({
      email,
      password,
      loginType,
    });
    res.status(HttpStatusCode.OK).json(user);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

async function register(req: Request, res: Response) {
  try {
    const { name, email, password, roleId, phoneNumber } = req.body;
    const user = await userRepository.register({
      name,
      email,
      password,
      roleId,
      phoneNumber,
    });
    res.status(HttpStatusCode.OK).json(user);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

// async function getProductById(req: Request, res: Response) {
//   try {
//     const productId = Number(req.params.productId);
//     const product = await userRepository.getProductById(productId);
//     res.status(HttpStatusCode.OK).json(product);
//   } catch (exception: any) {
//     res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
//   }
// }

// const insertProduct = async (req: Request, res: Response) => {
//   try {
//     debugger;
//     const {
//       name,
//       description,
//       productCategories,
//       productGeneralImages,
//       productImages,
//       productInventories,
//     } = req.body;

//     const product = await productRepository.insertProduct({
//       name,
//       description,
//       productCategories,
//       productGeneralImages,
//       productImages,
//       productInventories,
//     } as ProductInsert);
//     res.status(HttpStatusCode.INSERT_OK).json(product);
//   } catch (exception: any) {
//     res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
//   }
// };

// async function updateProduct(req: Request, res: Response) {
//   try {
//     debugger;
//     const {
//       productId,
//       name,
//       description,
//       productCategories,
//       productGeneralImages,
//       productImages,
//       productInventories,
//     } = req.body;
//     const updateProduct = await productRepository.updateProduct({
//       productId,
//       name,
//       description,
//       productCategories,
//       productGeneralImages,
//       productImages,
//       productInventories,
//     } as ProductUpdate);
//     res.status(HttpStatusCode.OK).json(updateProduct);
//   } catch (exception: any) {
//     res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
//   }
// }

// async function deleteProduct(req: Request, res: Response) {
//   try {
//     const productId = Number(req.params.productId);
//     const deleteProduct = await productRepository.deleteProduct(productId);
//     res.status(HttpStatusCode.OK).json(deleteProduct);
//   } catch (exception: any) {
//     res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
//   }
// }

// async function getCount(req: Request, res: Response) {
//   try {
//     const { keyword = '', categoryIds = '' } = req.query;
//     const count = await productRepository.getCount(
//       keyword.toString(),
//       categoryIds
//         .toString()
//         .split(',')
//         .filter((id) => id.trim() !== '')
//         .map((id: string) => Number(id))
//     );
//     res.status(HttpStatusCode.OK).json(count);
//   } catch (exception: any) {
//     res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
//   }
// }

// async function login(req: Request, res: Response) {
//   try {
//     const carts = req.body.carts;
//     const data = await productRepository.login(carts);
//     res.status(HttpStatusCode.OK).json(data);
//   } catch (exception: any) {
//     res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
//   }
// }

export default {
  login,
  register,
  // updateProduct,
  // deleteProduct,
  // insertProduct,
  // getProductById,
  // getCount,
  // login,
};
