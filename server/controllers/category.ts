import { Request, Response } from 'express';
import HttpStatusCode from '../exceptions/HttpStatusCode';
import { categoryRepository } from '../repositories/index';

async function getCategories(req: Request, res: Response) {
  try {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    const categories = await categoryRepository.getCategories(limit, page);
    res.status(HttpStatusCode.OK).json(categories);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

async function insertCategory(req: Request, res: Response) {
  try {
    const { name, image } = req.body;
    const newCategory = await categoryRepository.insertCategory(name, image);
    res.status(HttpStatusCode.INSERT_OK).json(newCategory);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

// async function getProductById(req: Request, res: Response) {
//   try {
//     const productId = Number(req.params.productId);
//     const product = await productRepository.getProductById(productId);
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
//     const newName = name.toLowerCase();

//     const product = await productRepository.insertProduct({
//       name: newName,
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
//     const count = await productRepository.getCount();
//     res.status(HttpStatusCode.OK).json(count);
//   } catch (exception: any) {
//     res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
//   }
// }

export default {
  getCategories,
  insertCategory,
};
