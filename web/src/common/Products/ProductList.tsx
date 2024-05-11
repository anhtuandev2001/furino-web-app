import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuid } from 'uuid';
import noProduct from '../../assets/images/noProducts.jpg';
import { ProductProp } from '../../types/product';
import ProductItem from './ProductItem';
import SkeletonProduct from './SkeletonProduct';

function ProductList({
  products,
  limit,
  status,
  loadMoreData,
  hasMore = false,
}: {
  products: ProductProp[];
  limit: number;
  status: string;
  loadMoreData?: () => void;
  hasMore?: boolean;
}) {
  if (
    status === 'failed' ||
    (status === 'succeeded' && products.length === 0)
  ) {
    return (
      <img
        className='mx-auto'
        src={noProduct}
        alt='No products'
      />
    );
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={products.length}
        next={loadMoreData ? loadMoreData : () => {}}
        hasMore={hasMore}
        loader={
          status === 'loading' && (
            <div className='grid gap-[20px] grid-cols-2 mt-[20px] sm:grid-cols-4 pr-4 pl-4 sm:p-4'>
              <SkeletonProduct limit={2} />
            </div>
          )
        }
        // endMessage={
        //   status === 'succeeded' &&
        //   loadMoreData && (
        //     <p className='sm:hidden text-center mt-[10px]'>No more products</p>
        //   )
        // }
      >
        <div className='grid gap-[20px] grid-cols-2 sm:grid-cols-4 pr-4 pl-4 sm:p-4'>
          {(status === 'loading' && window.innerWidth > 600) ||
          (status === 'loading' && products.length === 0) ? (
            <SkeletonProduct limit={limit} />
          ) : (
            products.map((item) => (
              <ProductItem
                key={uuid()}
                item={item}
              />
            ))
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default ProductList;
