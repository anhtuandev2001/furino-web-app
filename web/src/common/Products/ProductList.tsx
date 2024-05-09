import { v4 as uuid } from 'uuid';
import noProduct from '../../assets/images/noProducts.jpg';
import { ProductProp } from '../../types/product';
import ProductItem from './ProductItem';
import SkeletonProduct from './SkeletonProduct';

function ProductList({
  products,
  limit,
  status,
  productListRef
}: {
  products: ProductProp[];
  limit: number;
  status: string;
  productListRef?: any;
}) {
  if (
    status === 'failed' ||
    (status === 'succeeded' && products.length === 0)
  ) {
    return (
      <img
        className='mx-auto'
        src={noProduct}
      />
    );
  }

  return (
    <div ref={productListRef}>
      <div className='grid gap-[20px] grid-cols-2 sm:grid-cols-4 pr-4 pl-4 sm:p-4'>
        {status === 'succeeded' ? (
          products.map((item) => (
            <ProductItem
              key={uuid()}
              item={item}
            />
          ))
        ) : (
          <SkeletonProduct limit={limit} />
        )}
      </div>
    </div>
  );
}

export default ProductList;
