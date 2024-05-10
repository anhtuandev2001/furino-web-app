import { useEffect } from 'react';
import ProductTitle from '../../common/ProductTitle/ProductTitle';
import {
  homeActions,
  selectProducts
} from '../../store/home/slice';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import Banner from './Banner';
import Category from './Category';
import Furniture from './Furniture';
import Suggest from './Suggest';

const Home = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  useEffect(() => {
    dispatch(homeActions.getProducts({ limit: 8, page: 1 }));
  }, [dispatch]);
  
  return (
    <>
      <Banner />
      <Category />
      <ProductTitle
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
