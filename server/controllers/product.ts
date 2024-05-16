import { Request, Response } from 'express';
import HttpStatusCode from '../exceptions/HttpStatusCode';
import { productRepository } from '../repositories/index';
import { ProductInsert, ProductUpdate } from './../types/product';

async function getProducts(req: Request, res: Response) {
  try {
    const {
      limit = 10,
      page = 1,
      keyword = '',
      categoryIds = '',
      sort = 'productId',
    } = req.query;

    const products = await productRepository.getProducts(
      Number(limit),
      Number(page),
      keyword.toString(),
      sort.toString(),
      categoryIds
        .toString()
        .split(',')
        .filter((id) => id.trim() !== '')
        .map((id: string) => Number(id))
    );
    res.status(HttpStatusCode.OK).json(products);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

async function getProductById(req: Request, res: Response) {
  try {
    const productId = Number(req.params.productId);
    const product = await productRepository.getProductById(productId);
    res.status(HttpStatusCode.OK).json(product);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

const insertProduct = async (req: Request, res: Response) => {
  try {
    debugger;
    const {
      name,
      description,
      productCategories,
      productGeneralImages,
      productImages,
      productInventories,
    } = req.body;

    const product = await productRepository.insertProduct({
      name,
      description,
      productCategories,
      productGeneralImages,
      productImages,
      productInventories,
    } as ProductInsert);
    res.status(HttpStatusCode.INSERT_OK).json(product);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
};

async function updateProduct(req: Request, res: Response) {
  try {
    debugger;
    const {
      productId,
      name,
      description,
      productCategories,
      productGeneralImages,
      productImages,
      productInventories,
    } = req.body;
    const updateProduct = await productRepository.updateProduct({
      productId,
      name,
      description,
      productCategories,
      productGeneralImages,
      productImages,
      productInventories,
    } as ProductUpdate);
    res.status(HttpStatusCode.OK).json(updateProduct);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

async function deleteProduct(req: Request, res: Response) {
  try {
    const productId = Number(req.params.productId);
    const deleteProduct = await productRepository.deleteProduct(productId);
    res.status(HttpStatusCode.OK).json(deleteProduct);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

async function getCount(req: Request, res: Response) {
  try {
    const { keyword = '', categoryIds = '' } = req.query;
    const count = await productRepository.getCount(
      keyword.toString(),
      categoryIds
        .toString()
        .split(',')
        .filter((id) => id.trim() !== '')
        .map((id: string) => Number(id))
    );
    res.status(HttpStatusCode.OK).json(count);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

async function getCarts(req: Request, res: Response) {
  try {
    const carts = req.body.carts;
    const data = await productRepository.getCarts(carts);
    res.status(HttpStatusCode.OK).json(data);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
}

const searchProduct = async (req: Request, res: Response) => {
  try {
    const keyword = req.params.keyword;
    const { limit } = req.query;
    const products = await productRepository.searchProduct({
      keyword,
      limit: Number(limit),
    });
    res.status(HttpStatusCode.OK).json(products);
  } catch (exception: any) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(exception.toString());
  }
};

export default {
  getProducts,
  updateProduct,
  deleteProduct,
  insertProduct,
  getProductById,
  getCount,
  getCarts,
  searchProduct,
};
