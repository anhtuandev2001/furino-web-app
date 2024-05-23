import { Button, Skeleton, TextField } from '@mui/material';
import iconAll from '../../assets/icons/icon-all.svg';
import { CategoryProp } from '../../types/categories';
import { IoIosClose } from 'react-icons/io';

export default function FilterBarMobile({
  keyword,
  categories,
  categoryIds,
  onChangeCategoriesSelected,
  onChangeKeyword,
  onSearch,
}: {
  count: number;
  limit: number;
  page: number;
  keyword: string;
  sort: string;
  onChangeLimit: (value: number) => void;
  onChangeSort: (value: string) => void;
  categories: any;
  categoryIds: { label: string; categoryId: number }[];
  onChangeCategoriesSelected: (event: any) => void;
  onChangeKeyword: (event: any) => void;
  onSearch: any;
}) {
  return (
    <div className='mt-[10px] px-4 sticky top-0 bg-white z-10 md:hidden'>
      <div className='flex border-2 rounded-[50px] bg-white'>
        <TextField
          id='outlined-basic'
          label='Search'
          variant='outlined'
          className='w-full flex-1'
          value={keyword}
          onChange={(event) => {
            const { value } = event.target;
            onChangeKeyword(value);
          }}
          onKeyDown={onSearch}
          sx={{
            background: 'white',
            borderRadius: '50px',
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
          }}
        />
        <Button
          sx={{ borderRadius: '50px' }}
          onClick={() => onChangeKeyword('')}
        >
          <IoIosClose size={30} />
        </Button>
      </div>
      <div className='flex mt-[10px] w-full overflow-scroll gap-4'>
        <Button
          className='flex flex-col items-center'
          onClick={() => onChangeCategoriesSelected([])}
        >
          <img
            src={iconAll}
            alt='all'
            className='h-[50px]'
          />
          <span
            className={`${
              categoryIds.length === 0
                ? 'text-[black] font-semibold'
                : 'text-[#808080]'
            }`}
          >
            All
          </span>
        </Button>
        {categories.status === 'loading'
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <Skeleton
                  variant='rectangular'
                  width={45}
                  height={45}
                />
                <Skeleton
                  variant='text'
                  width={45}
                />
              </div>
            ))
          : categories.data.map((category: CategoryProp) => (
              <Button
                key={category.categoryId}
                onClick={() =>
                  onChangeCategoriesSelected([
                    { label: category.name, categoryId: category.categoryId },
                  ])
                }
                className='flex flex-col items-center'
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className='h-[50px]'
                />
                <span
                  className={`${
                    categoryIds.some(
                      (item) => item.categoryId === category.categoryId
                    )
                      ? 'text-[black] font-semibold'
                      : 'text-[#808080]'
                  }`}
                >
                  {category.name}
                </span>
              </Button>
            ))}
      </div>
    </div>
  );
}
