import { Button, TextField } from '@mui/material';
import iconAll from '../../assets/icons/icon-all.svg';
import { CategoryProp } from '../../types/categories';

export default function FilterBarMobile({
  keyword,
  categories,
  categoryIds,
  onChangeCategoriesSelected,
  onChangeKeyword,
}: {
  count: number;
  limit: number;
  page: number;
  keyword: string;
  sort: string;
  onChangeLimit: (value: number) => void;
  onChangeSort: (value: string) => void;
  categories: CategoryProp[];
  categoryIds: { label: string; categoryId: number }[];
  onChangeCategoriesSelected: (event: any) => void;
  onChangeKeyword: (event: any) => void;
}) {
  return (
    <div className='mt-[10px] px-4 sticky top-0 bg-white z-10 sm:hidden'>
      <div className=''>
        <TextField
          id='outlined-basic'
          label='Search'
          variant='outlined'
          className='w-full flex-1'
          value={keyword}
          onChange={onChangeKeyword}
          sx={{
            background: 'white',
            '& .MuiInputBase-root': { borderRadius: '50px' },
          }}
        />
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
        {categories.map((category: CategoryProp) => (
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
