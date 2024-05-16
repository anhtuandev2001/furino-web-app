import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import iconSort from '../../assets/icons/sort.png';
import AvailabilityForm from '../AvailabilityForm/AvailabilityForm';
import CategoryForm from '../CategoryForm/CategoryForm';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';
import {
  selectCategories,
  selectCategoryIds,
  shopActions,
} from '../../store/shop/slice';

function Filter({ products }: { products: any }) {
  const dispatch = useAppDispatch();
  const [availability, setAvailability] = React.useState({
    inStock: false,
    outStock: false,
    count: 0,
  });
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
    <div className='flex justify-between text-sm'>
      <div className='gap-6 items-center hidden md:flex'>
        <span>Filter:</span>
        <div className='relative'>
          <Button
            onClick={() => setOpenAvailability(!openAvailability)}
            className='flex gap-2 items-center'
          >
            <span className='text-[14px] font-normal'>Avalability</span>
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
          <span className='text-[14px] font-normal'>Avalability</span>
          <MdKeyboardArrowDown size={20} />
        </Button> */}
      </div>
      <div className='md:hidden gap-2 flex items-center'>
        <img
          src={iconSort}
          alt='icon sort'
          className='w-[20px] h-[20px]'
        />
        <span>Filter and sort</span>
      </div>
      <div>
        <div className='flex gap-6 items-center'>
          <div className='hidden md:flex  gap-6 items-center'>
            <span className=''>Sort by:</span>
            <Button className='gap-2 items-center'>
              <span className='text-[14px] font-normal'>Avalability</span>
              <MdKeyboardArrowDown size={20} />
            </Button>
          </div>
          <span>{products.data.length} products</span>
        </div>
      </div>
    </div>
  );
}

export default Filter;
