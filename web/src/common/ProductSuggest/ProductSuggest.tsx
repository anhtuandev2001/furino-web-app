import { Button } from '@mui/material';
import 'animate.css';
import { Link } from 'react-router-dom';
import { ProductList } from '..';
import { ProductProp } from '../../types/product';

function ProductSuggest({
  title,
  products,
  limit,
  status,
}: {
  title: string;
  products: ProductProp[];
  limit: number;
  status: string;
}) {
  return (
    <section className='py-[65px]'>
      <h2 className='font-bold text-[#3A3A3A] text-[40px] text-center mt-[56px] mb-[32px]'>
        {title}
      </h2>
      <ProductList
        products={products}
        limit={limit}
        status={status}
      />
      <div className='mt-[32px] text-center'>
        <Button sx={{ border: '1px solid #B88E2F', textTransform: 'unset' }}>
          <Link
            to='/shop'
            className='text-primary font-semibold py-[12px] px-[82px]'
          >
            Show More
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default ProductSuggest;