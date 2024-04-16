import { v4 as uuid } from 'uuid';
import noProduct from '../../assets/images/noProducts.jpg';
import { ProductProp } from '../../types/product';
import ProductItem from './ProductItem';
import SkeletonProduct from './SkeletonProduct';

function ProductList({
  products,
  limit,
  loading,
}: {
  products: ProductProp[];
  limit: number;
  loading: boolean;
}) {
  return (
    <div>
      <div className='grid gap-[20px] grid-cols-2 sm:grid-cols-4 pr-4 pl-4 sm:p-4'>
        {!loading ? (
          products &&
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
      {!loading && products.length === 0 && <img className='mx-auto' src={noProduct} />}
    </div>
  );
}

export default ProductList;
