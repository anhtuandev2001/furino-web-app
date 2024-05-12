import { Pagination } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeadingPage, ProductList } from '../../common';
import Filter from '../../common/Filter/Filter';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import {
  selectCategoryIds,
  selectProducts,
  shopActions,
} from '../../store/shop/slice';

function Shop() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const limitUrl = params.get('limit') || null;
  const pageUrl = params.get('page') || null;
  const categoriesUrl = params.get('categories') || null;
  const keywordUrl = params.get('keyword') || null;

  const products = useAppSelector(selectProducts);
  const categoryIds = useAppSelector(selectCategoryIds);
  const { limit, page, count, status, error } = products;

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

  // const handleChangeSort = (event: any) => {
  //   const { value } = event.target;
  //   dispatch(shopActions.onChangeSort(value.toString()));
  // };

  // const handleChangeCategoriesSelected = (value: any) => {
  //   dispatch(shopActions.onchangeCategoryIds(value));
  //   navigate(
  //     `/shop?limit=${limit}&page=1${
  //       value.length > 0
  //         ? `&categories=${value
  //             .map((item: { categoryId: any }) => item.categoryId)
  //             .join(',')}`
  //         : ''
  //     }`
  //   );
  // };

  useEffect(() => {
    if (products.status === 'idle' || products.data.length === 0) {
      dispatch(
        shopActions.getProductOfShopPage({
          limitUrl,
          pageUrl,
          keywordUrl,
          categoriesUrl,
        })
      );
    }
    return () => {
      dispatch(shopActions.clearState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (!keyword) {
  //     dispatch(shopActions.onChangeKeyword(''));
  //   }
  // }, [dispatch, keyword]);

  return (
    <div>
      <HeadingPage title='Shop' />
      <Filter count={products.data.length} />

      <div className='mt-[40px] md:mt-8'>
        <ProductList
          products={products.data}
          limit={limit}
          status={status}
          loadMoreData={() => {
            if (window.innerWidth < 768) {
              dispatch(shopActions.onNextPageScroll());
            }
          }}
          hasMore={window.innerWidth < 768 && error !== 'No more products'}
        />
        <div className='justify-center mt-[20px] md:mt-[70px] mb-[30px] hidden md:flex'>
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
    </div>
  );
}

export default Shop;
