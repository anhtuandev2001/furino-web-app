import ProductItem from './ProductItem';
import { ProductProp } from '../../types/product';
import { v4 as uuid } from 'uuid';
import SkeletonProduct from './SkeletonProduct';

function ProductList({ products, limit }: { products: ProductProp[], limit: number}) {
  return (
    <div className='grid gap-[20px] grid-cols-4'>
      {products ? (
        products.map((item) => (
          <ProductItem
            key={uuid()}
            item={item}
          />
        ))
      ) : (
        <SkeletonProduct limit={limit}/>
      )}
    </div>
  );
}

export default ProductList;
