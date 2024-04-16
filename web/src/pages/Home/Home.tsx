import Banner from './Banner';
import Category from './Category';
import Suggest from './Suggest';
import Furniture from './Furniture';
import ProductTitle from '../../common/ProductTitle/ProductTitle';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import { useEffect } from 'react';
import {
  homeActions,
  selectLoading,
  selectProducts,
} from '../../store/home/slice';

const Home = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectLoading);
  useEffect(() => {
    dispatch(homeActions.getProducts({ limit: 8, page: 1 }));
  }, [dispatch]);
  return (
    <>
      <Banner />
      <Category />
      <ProductTitle
        loading={loading}
        limit={4}
        title='New Arrivals'
        products={products}
      />
      <Suggest />
      <Furniture />
    </>
  );
};

export default Home;
