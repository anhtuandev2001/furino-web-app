import { Category } from '../models/index';

const getCategories = async (limit: number, page: number) => {
  try {
    const categories = await Category.findAll({
      limit: limit,
      offset: (page - 1) * limit,
    });

    return categories;
  } catch (exception: any) {
    throw new Error(exception.message);
  }
};

const insertCategory = async (name: string, image: string) => {
  try {
    const newCategory = await Category.create({
      name,
      image,
    });

    return newCategory;
  } catch (exception: any) {
    throw new Error(exception.message);
  }
}


export default {
  getCategories,
  insertCategory,
};
