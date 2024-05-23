import { useEffect } from 'react';
import Products from '../../common/Products/Products';
import { homeActions, selectProducts } from '../../store/home/slice';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import Banner from '../../common/Banner/Banner';
import Category from '../../common/Category';
import Furniture from '../../common/Furniture';
import Suggest from '../../common/Suggest/Suggest';

const Home = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  useEffect(() => {
    if (products.status === 'idle' || products.data.length === 0) {
      dispatch(homeActions.getProducts({ limit: 8, page: 1 }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Banner />
      <Category />
      <Products
        status={products.status}
        limit={8}
        title='New Arrivals'
        products={products.data}
      />
      <Suggest />
      <Furniture />
    </>
  );
};

export default Home;
