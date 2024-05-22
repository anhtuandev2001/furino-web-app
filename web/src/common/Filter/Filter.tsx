import { Button, Drawer, IconButton } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import iconSort from '../../assets/icons/sort.png';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import {
  selectCategories,
  selectCategoryIds,
  shopActions,
} from '../../store/shop/slice';
import AvailabilityForm from '../AvailabilityForm/AvailabilityForm';
import CategoryForm from '../CategoryForm/CategoryForm';

function Filter({ products }: { products: any }) {
  const dispatch = useAppDispatch();
  const [availability, setAvailability] = React.useState({
    inStock: false,
    outStock: false,
    count: 0,
  });
  const [sort, setSort] = React.useState('default');
  const [filterName, setFilterName] = React.useState('');
  const [openAvailability, setOpenAvailability] = React.useState(false);
  const availabilityRef = React.useRef<HTMLElement | null>(null);

  const categoryRef = React.useRef<HTMLElement | null>(null);
  const [openCategory, setOpenCategory] = React.useState(false);

  const categories = useAppSelector(selectCategories);
  const categoryIds = useAppSelector(selectCategoryIds);

  const handleChangeAvailability = (value: any) => {
    const newValue = { ...availability, ...value };
    const count = Object.values(newValue).filter(
      (item) => typeof item !== 'number' && item
    ).length;
    setAvailability({ ...newValue, count });
  };
  const handleResetAvailability = () => {
    setAvailability({ inStock: false, outStock: false, count: 0 });
  };

  const handleChangeCategory = (value: any) => {
    let newArray = [];
    if (value.checked) {
      newArray = [...categoryIds, value.categoryId];
    } else {
      newArray = categoryIds.filter((item: any) => item !== value.categoryId);
    }
    dispatch(shopActions.onchangeCategoryIds(newArray));
  };
  const handleResetCategory = () => {
    dispatch(shopActions.onchangeCategoryIds([]));
  };

  const handleChangeSort = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
    dispatch(shopActions.onChangeSort(event.target.value as string));
  };

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  const resetFilter = () => {
    handleResetAvailability();
    handleResetCategory();
    setSort('default');
    dispatch(shopActions.resetFilter());
  };

  const switchBodyMenu = () => {
    switch (filterName) {
      case 'availability':
        return (
          <div>
            <AvailabilityForm
              data={availability}
              onChange={handleChangeAvailability}
              availabilityRef={availabilityRef}
              onResetAvailability={handleResetAvailability}
              handleBackDrawer={() => setFilterName('')}
            />
          </div>
        );
      case 'category':
        return (
          <div>
            <CategoryForm
              data={categories}
              productStatus={products.status}
              checked={categoryIds}
              onChange={handleChangeCategory}
              onReset={handleResetCategory}
              itemRef={categoryRef}
              handleBackDrawer={() => setFilterName('')}
            />
          </div>
        );
      case 'name':
        return 'name';
      default:
        return (
          <>
            <Button
              onClick={() => setFilterName('availability')}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '16px 0',
                width: '100%',
              }}
            >
              <span>Availability</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='14'
                height='10'
                viewBox='0 0 14 10'
                fill='none'
              >
                <path
                  d='M8.537 0.809577C8.5684 0.733346 8.61816 0.666061 8.68186 0.613715C8.74555 0.561368 8.8212 0.525584 8.90207 0.509549C8.98294 0.493513 9.06652 0.497724 9.14537 0.521806C9.22422 0.545888 9.29589 0.589094 9.354 0.647577L13.354 4.64758C13.4006 4.69402 13.4375 4.7492 13.4627 4.80994C13.4879 4.87069 13.5009 4.93581 13.5009 5.00158C13.5009 5.06734 13.4879 5.13247 13.4627 5.19321C13.4375 5.25396 13.4006 5.30913 13.354 5.35558L9.354 9.35558C9.26011 9.44946 9.13278 9.50221 9 9.50221C8.86722 9.50221 8.73989 9.44946 8.646 9.35558C8.55211 9.26169 8.49937 9.13435 8.49937 9.00158C8.49937 8.8688 8.55211 8.74146 8.646 8.64758L11.793 5.50158H1C0.867392 5.50158 0.740215 5.4489 0.646447 5.35513C0.552678 5.26136 0.5 5.13419 0.5 5.00158C0.5 4.86897 0.552678 4.74179 0.646447 4.64802C0.740215 4.55426 0.867392 4.50158 1 4.50158H11.793L8.646 1.35558C8.57575 1.28563 8.52788 1.19637 8.50847 1.09915C8.48906 1.00193 8.49899 0.90114 8.537 0.809577Z'
                  fill='#333030'
                />
              </svg>
            </Button>
            <Button
              onClick={() => setFilterName('category')}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '16px 0',
                width: '100%',
              }}
            >
              <span>Category</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='14'
                height='10'
                viewBox='0 0 14 10'
                fill='none'
              >
                <path
                  d='M8.537 0.809577C8.5684 0.733346 8.61816 0.666061 8.68186 0.613715C8.74555 0.561368 8.8212 0.525584 8.90207 0.509549C8.98294 0.493513 9.06652 0.497724 9.14537 0.521806C9.22422 0.545888 9.29589 0.589094 9.354 0.647577L13.354 4.64758C13.4006 4.69402 13.4375 4.7492 13.4627 4.80994C13.4879 4.87069 13.5009 4.93581 13.5009 5.00158C13.5009 5.06734 13.4879 5.13247 13.4627 5.19321C13.4375 5.25396 13.4006 5.30913 13.354 5.35558L9.354 9.35558C9.26011 9.44946 9.13278 9.50221 9 9.50221C8.86722 9.50221 8.73989 9.44946 8.646 9.35558C8.55211 9.26169 8.49937 9.13435 8.49937 9.00158C8.49937 8.8688 8.55211 8.74146 8.646 8.64758L11.793 5.50158H1C0.867392 5.50158 0.740215 5.4489 0.646447 5.35513C0.552678 5.26136 0.5 5.13419 0.5 5.00158C0.5 4.86897 0.552678 4.74179 0.646447 4.64802C0.740215 4.55426 0.867392 4.50158 1 4.50158H11.793L8.646 1.35558C8.57575 1.28563 8.52788 1.19637 8.50847 1.09915C8.48906 1.00193 8.49899 0.90114 8.537 0.809577Z'
                  fill='#333030'
                />
              </svg>
            </Button>
            <div className='flex  gap-6 items-center justify-between'>
              <span className=''>Sort by:</span>
              <Button
                className='gap-2 items-center'
                sx={{
                  padding: '0',
                }}
              >
                <FormControl
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  }}
                >
                  <Select
                    value={sort}
                    onChange={handleChangeSort}
                  >
                    <MenuItem value='default'>Default</MenuItem>
                    <MenuItem value='price'>Price</MenuItem>
                    <MenuItem value='name'>Name</MenuItem>
                  </Select>
                </FormControl>
              </Button>
            </div>
          </>
        );
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        availabilityRef.current &&
        !availabilityRef.current.contains(event.target as Node) &&
        openAvailability
      ) {
        setOpenAvailability(false);
      }

      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node) &&
        openCategory
      ) {
        setOpenCategory(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openAvailability, openCategory]);

  return (
    <div className='flex justify-between text-sm items-center'>
      <div className='gap-6 items-center hidden md:flex'>
        <span>Filter:</span>
        <div className='relative'>
          <Button
            onClick={() => setOpenAvailability(!openAvailability)}
            className='flex gap-2 items-center'
            sx={{
              padding: '12px 16px',
            }}
          >
            <span className='text-[14px] font-normal'>Availability</span>
            <MdKeyboardArrowDown size={20} />
          </Button>
          {openAvailability && (
            <AvailabilityForm
              data={availability}
              onChange={handleChangeAvailability}
              availabilityRef={availabilityRef}
              onResetAvailability={handleResetAvailability}
            />
          )}
        </div>
        <div className='relative'>
          <Button
            className='flex gap-2 items-center'
            onClick={() => setOpenCategory(!openCategory)}
            sx={{
              padding: '12px 16px',
            }}
          >
            <span className='text-[14px] font-normal'>Category</span>
            <MdKeyboardArrowDown size={20} />
          </Button>

          {openCategory && (
            <CategoryForm
              data={categories}
              productStatus={products.status}
              checked={categoryIds}
              onChange={handleChangeCategory}
              onReset={handleResetCategory}
              itemRef={categoryRef}
            />
          )}
        </div>
        {/* <Button className='flex gap-2 items-center'>
          <span className='text-[14px] font-normal'>Availability</span>
          <MdKeyboardArrowDown size={20} />
        </Button> */}
      </div>
      <Button
        onClick={toggleDrawer(true)}
        sx={{ display: { md: 'none' }, padding: '12px 16px' }}
        className='md:hidden gap-2 flex items-center'
      >
        <img
          src={iconSort}
          alt='icon sort'
          className='w-[20px] h-[20px]'
        />
        <span>Filter and sort</span>
      </Button>
      <div>
        <div className='flex gap-6 items-center'>
          <div className='hidden md:flex  gap-6 items-center'>
            <span className=''>Sort by:</span>
            <Button
              className='gap-2 items-center'
              sx={{
                padding: '0',
              }}
            >
              <FormControl
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }}
              >
                <Select
                  value={sort}
                  onChange={handleChangeSort}
                >
                  <MenuItem value='default'>Default</MenuItem>
                  <MenuItem value='price'>Price</MenuItem>
                  <MenuItem value='name'>Name</MenuItem>
                </Select>
              </FormControl>
            </Button>
          </div>
          <span>{products.data.length} products</span>
        </div>
      </div>
      <Drawer
        open={openDrawer}
        sx={{ '& .MuiDrawer-paper': { width: '100%' } }}
        onClose={toggleDrawer(false)}
      >
        <div className='flex flex-col w-full h-full'>
          <div className='grid grid-cols-3 pt-[5px] py-[10px] border-b mb-[20px]'>
            <div className='col-span-1 col-start-2 flex flex-col items-center justify-center'>
              <span className='text-sm'>Filter and sort</span>
              <span className='text-[10px]'>
                {products.data.length} products
              </span>
            </div>
            <div className='col-span-1 text-right'>
              <IconButton onClick={toggleDrawer(false)}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='40'
                  height='40'
                  viewBox='0 0 40 40'
                  fill='none'
                >
                  <rect
                    width='40'
                    height='40'
                    fill='white'
                  />
                  <path
                    d='M21.0607 20.3536L28.7071 12.7071L28 12L20.3536 19.6464L12.7071 12L12 12.7071L19.6464 20.3536L12 28L12.7071 28.7071L20.3536 21.0607L28 28.7071L28.7071 28L21.0607 20.3536Z'
                    fill='black'
                  />
                </svg>
              </IconButton>
            </div>
          </div>
          <div className='flex-1 py-[14px] px-8'>{switchBodyMenu()}</div>
          <div className='flex justify-around py-4 border-t'>
            <Button
              variant='outlined'
              onClick={resetFilter}
              sx={{
                border: 'none',
                textDecoration: 'underline',
                '&:hover': {
                  border: 'none',
                  textDecoration: 'underline',
                },
              }}
            >
              Clear all
            </Button>
            <Button
              variant='contained'
              onClick={toggleDrawer(false)}
              sx={{ padding: '16px 47px' }}
            >
              Apply
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default Filter;
