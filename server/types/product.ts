// insert product
export interface ProductInsert {
  name: string;
  price: number;
  description: string;
  productCategories: number[];
  productGeneralImages: string[];
  productImages: ProductImageProps[];
  productInventories: ProductInventoryProps[];
}

// update product
export interface ProductUpdate {
  productId: number;
  name: string;
  price: number;
  description: string;
  productCategories: number[];
  productGeneralImages: string[];
  productImages: ProductImageProps[];
  productInventories: ProductInventoryUpdateProps[];
}

export interface ProductInventoryProps {
  productSizeId: number;
  productColorId: number;
  quantity: number;
  price: number;
  priceDiscount?: number;
}

export interface ProductImageProps {
  image: string;
  productColorId: number;
}

export interface ProductInventoryUpdateProps {
  productSizeId: number;
  productColorId: number;
  quantity: number;
  price: number;
  priceDiscount?: number;
  sold: number;
}

export interface CartProp {
  productId: number;
  quantity: number;
  productColorId: number;
  productSizeId: number;
}