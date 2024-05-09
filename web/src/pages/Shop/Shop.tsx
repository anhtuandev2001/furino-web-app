import { Pagination } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductList, FilterBarMobile, Breadcrumb } from '../../common';
import Filter from '../../common/Filter/Filter';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import {
  selectCategories,
  selectCategoryIds,
  selectProducts,
  shopActions,
} from '../../store/shop/slice';
import Commit from '../../common/Commit/Commit';

function Shop() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = React.useState('');
  const productListRef = React.useRef<HTMLDivElement>(null);

  const params = new URLSearchParams(location.search);
  const limitUrl = params.get('limit') || null;
  const pageUrl = params.get('page') || null;
  const categoriesUrl = params.get('categories') || null;
  const keywordUrl = params.get('keyword') || null;

  const products = useAppSelector(selectProducts);
  const categories = useAppSelector(selectCategories);
  const categoryIds = useAppSelector(selectCategoryIds);
  const { limit, page, sort, count, status, error } = products;

  const handleChangePage = (_event: React.ChangeEvent<any>, value: number) => {
    dispatch(shopActions.onChangePage(value));
    window.scrollTo(0, 0);
    navigate(
      `/shop?limit=${limit}&page=${value}${
        categoryIds.length > 0
          ? `&categories=${categoryIds
              .map((item: { categoryId: any }) => item.categoryId)
              .join(',')}`
          : ''
      }`
    );
  };

  const handleChangeLimit = (event: any) => {
    const { value } = event.target;

    dispatch(shopActions.onChangeLimit(value));
    dispatch(shopActions.onChangePage(1));

    navigate(
      `/shop?limit=${value}&page=1${
        categoryIds.length > 0
          ? `&categories=${categoryIds
              .map((item: { categoryId: any }) => item.categoryId)
              .join(',')}`
          : ''
      }`
    );
  };

  const handleChangeSort = (event: any) => {
    const { value } = event.target;
    dispatch(shopActions.onChangeSort(value.toString()));
  };

  const handleChangeCategoriesSelected = (value: any) => {
    dispatch(shopActions.onchangeCategoryIds(value));
    dispatch(shopActions.onChangePage(1));
    navigate(
      `/shop?limit=${limit}&page=1${
        value.length > 0
          ? `&categories=${value
              .map((item: { categoryId: any }) => item.categoryId)
              .join(',')}`
          : ''
      }`
    );
  };

  const handleChangeKeyword = (event: any) => {
    const { value } = event.target;
    dispatch(shopActions.onChangePage(1));
    setKeyword(value);
    dispatch(shopActions.onChangeKeyword(value));
  };

  const handleScroll = () => {
    if (error === 'No more products') return;
    if (window.innerWidth > 640) return;
    const productList = productListRef.current;
    if (!productList) return;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = productList?.offsetHeight;
    const clientHeight = window.innerHeight;

    if (Math.abs(scrollHeight - scrollTop - clientHeight) === 329.5) {
      dispatch(shopActions.onNextPageScroll());
    }
  };

  useEffect(() => {
    dispatch(
      shopActions.getProductOfShopPage({
        limitUrl,
        pageUrl,
        keywordUrl,
        categoriesUrl,
      })
    );
    return () => {
      dispatch(shopActions.clearState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);


  return (
    <div>
      <Breadcrumb
        title='Shop'
        part='shop'
      />
      <div className='hidden sm:block'>
        <Filter
          count={count}
          limit={limit}
          page={page}
          sort={sort}
          keyword={keyword}
          onChangeLimit={handleChangeLimit}
          onChangeSort={handleChangeSort}
          categories={categories.data}
          onChangeCategoriesSelected={handleChangeCategoriesSelected}
          categoryIds={categoryIds}
          onChangeKeyword={handleChangeKeyword}
        />
      </div>
      <FilterBarMobile
        count={count}
        limit={limit}
        page={page}
        sort={sort}
        keyword={keyword}
        onChangeLimit={handleChangeLimit}
        onChangeSort={handleChangeSort}
        categories={categories.data}
        onChangeCategoriesSelected={handleChangeCategoriesSelected}
        categoryIds={categoryIds}
        onChangeKeyword={handleChangeKeyword}
      />
      <div className='container mx-auto mt-[20px]'>
        <ProductList
          products={products.data}
          limit={limit}
          productListRef={productListRef}
          status={status}
        />
        <div className='justify-center mt-[20px] sm:mt-[70px] hidden sm:flex'>
          {products && products.data.length > 0 && (
            <Pagination
              count={Number(Math.ceil(count / limit))}
              variant='outlined'
              shape='rounded'
              size='large'
              onChange={handleChangePage}
              page={page}
              hidePrevButton={page === 1}
              hideNextButton={page === count}
              color='primary'
            />
          )}
        </div>
      </div>
      <Commit />
    </div>
  );
}

export default Shop;
