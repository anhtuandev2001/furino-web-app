import { Button } from '@mui/material';
import 'animate.css';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { ProductProp } from '../../types/product';
import { ProductSkeleton, ProductItem } from '../index';
import { useAppDispatch } from '../../store/root/hooks';
import noProduct from '../../assets/images/noProducts.png'; 
import { productDetailActions } from '../../store/productDetail/slice';

function Products({
  title,
  products,
  limit,
  status,
  showMore = true,
}: {
  title?: string;
  products: ProductProp[];
  limit: number;
  status: string;
  showMore?: boolean;
}) {
  const dispatch = useAppDispatch();
  const handleSetProductDetail = (item: ProductProp) => {
    dispatch(productDetailActions.onSetProductDetail(item));
  };
  if(status === 'failed' || (status === 'succeeded' && products.length === 0)) {
    return (
      <img
        className='mx-auto'
        src={noProduct}
        alt='No products'
      />
    );
  }
  return (
    <section className='py-[65px] container px-4'>
      {title && (
        <h2 className='text-[30px] md:text-[40px] text-center mt-[56px] mb-[32px]'>
          {title}
        </h2>
      )}
      <div className='grid gap-x-[10px] gap-y-[24px] grid-cols-2 md:grid-cols-4 justify-center'>
        {(status === 'loading' && window.innerWidth > 600) ||
        (status === 'loading' && products.length === 0) ? (
          <ProductSkeleton limit={limit} />
        ) : (
          products.map((item) => (
            <ProductItem
              key={uuid()}
              item={item}
              onSetProductDetail={handleSetProductDetail}
            />
          ))
        )}
      </div>
      {showMore && (
        <div className='mt-[32px] text-center'>
          <Button
            component={Link}
            to='/shop'
            variant='contained'
            sx={{ padding: '16px 40px' }}
          >
            View all
          </Button>
        </div>
      )}
    </section>
  );
}

export default Products;
