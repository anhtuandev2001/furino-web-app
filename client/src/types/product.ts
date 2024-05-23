export interface ProductProp {
  productId: number;
  name: string;
  price: number;
  description: string;
  productCategories: ProductCategoryProp[];
  productGeneralImages: ProductGeneralImageProp[];
  productImages: ProductImageProps[];
  productInventories: ProductInventoryProps[];
}

export interface ProductImageProps {
  image: string;
  productColorId: number;
}

export interface ProductInventoryProps {
  productSize: ProductSize;
  productColor: ProductColor;
  quantity: number;
  price: number;
  priceDiscount?: number;
  sold: number;
}

export interface ProductGeneralImageProp {
  image: string;
}

export interface ProductCategoryProp {
  categoryId: number;
  category: CategoryProp;
}

export interface CategoryProp {
  name: string;
  products: ProductProp[];
}

export interface ProductSize {
  productSizeId: number;
  name: string;
}

export interface ProductColor {
  productColorId: number;
  name: string;
  hex: string;
}
