import { TextField } from '@mui/material';
import throttle from 'lodash/throttle';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { ProductItem, ProductSkeleton, SearchSuggest } from '../../common';
import { productDetailActions } from '../../store/productDetail/slice';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import {
  searchActions,
  selectKeyword,
  selectProductSuggest,
  selectProducts,
} from '../../store/search/slice';

function Search() {
  const [open, setOpen] = useState(false);
  const searchContainerRef = useRef<any>(null);
  const searchRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const productSuggest = useAppSelector(selectProductSuggest);
  const products = useAppSelector(selectProducts);
  const keyword = useAppSelector(selectKeyword);

  const handleSubmit = (e: any) => {
    if (e.key !== 'Enter') return;
    setOpen(false);
    dispatch(searchActions.searchGetProducts());
    searchRef.current.blur();
  };

  const handleChangeInput = throttle(
    (e: any) => {
      const { value } = e.target;
      dispatch(searchActions.onChangeKeyword(value || ' '));
    },
    1000,
    { leading: false, trailing: true }
  );

  const handleSetProductDetail = (item: any) => {
    dispatch(productDetailActions.onSetProductDetail(item));
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchContainerRef]);

  useEffect(() => {
    return () => {
      dispatch(searchActions.onResetState());
    };
  }, [dispatch]);

  return (
    <div className='py-10 px-4 container'>
      <div className='flex flex-col gap-8 items-center'>
        <h2 className='text-[24px] text-center'>Search results</h2>
        <div
          ref={searchContainerRef}
          className='relative w-full md:w-[468px]'
        >
          <TextField
            inputRef={searchRef}
            id='outlined-basic'
            label='Search'
            onFocus={() => setOpen(true)}
            autoComplete='off'
            onChange={handleChangeInput}
            onKeyUp={(e) => handleSubmit(e)}
            sx={{ width: '100%' }}
            variant='outlined'
            className='relative'
          />
          {open && (
            <SearchSuggest
              products={productSuggest}
              onSubmit={() => {
                setOpen(false);
                dispatch(searchActions.searchGetProducts());
              }}
              onSetProductDetail={handleSetProductDetail}
            />
          )}
        </div>
        {products.status === 'succeeded' && (
          <span className='text-center'>{`${products.count} results found for '${keyword}'`}</span>
        )}
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-2 mt-[20px]'>
        {products.status === 'loading' ? (
          <ProductSkeleton limit={4} />
        ) : (
          products.data.map((product: any) => (
            <ProductItem
              key={uuid()}
              item={product}
              onSetProductDetail={handleSetProductDetail}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Search;
