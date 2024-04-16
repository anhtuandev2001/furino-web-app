import { Button } from '@mui/material';
import 'animate.css';
import { Link } from 'react-router-dom';
import { ProductList } from '..';
import { ProductProp } from '../../types/product';

function ProductTitle({
  title,
  products,
  limit,
  loading
}: {
  title: string;
  products: ProductProp[];
  limit: number;
  loading: boolean;
}) {
  return (
    <section className='container mx-auto'>
      <h2 className='font-bold text-[#3A3A3A] text-[40px] text-center mt-[56px] mb-[32px]'>
        {title}
      </h2>
      <ProductList
        products={products}
        limit={limit}
        loading={loading}
      />
      <div className='mt-[32px] text-center'>
        <Button sx={{ border: '1px solid #B88E2F', textTransform: 'unset' }}>
          <Link
            to='/shop'
            className='text-primary font-semibold font-[Poppins] py-[12px] px-[82px]'
          >
            Show More
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default ProductTitle;
