import { TextField } from '@mui/material';
import SelectCustom from '../SelectCustom/SelectCustom';
import { CategoryProp } from '../../types/categories';
import { limits, sorts } from '../../utils/constants/menu';
import ComboBox from './ComboBox';

function Filter({
  count,
  page,
  limit,
  sort,
  keyword,
  onChangeLimit,
  onChangeSort,
  categories,
  categoriesSelected,
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
  categoriesSelected: { label: string; categoryId: number }[];
  onChangeCategoriesSelected: (event: any) => void;
  onChangeKeyword: (event: any) => void;
}) {
  return (
    <div className='bg-[#F9F1E7]'>
      <div className='container mx-auto flex justify-between items-center py-[25px]'>
        <div className='flex items-center gap-2'>
          <span>{`Showing ${
            page == 1
              ? `1-${limit > count ? count : limit}`
              : `${limit * page - limit}-${
                  page * limit > count ? count : page * limit
                }`
          } of ${count} results`}</span>
        </div>
        <ComboBox
          list={categories}
          categoriesSelected={categoriesSelected}
          onChangeCategoriesSelected={onChangeCategoriesSelected}
        />
        <TextField
          id='outlined-basic'
          label='Search'
          variant='outlined'
          value={keyword}
          onChange={onChangeKeyword}
          sx={{ background: 'white' }}
        />
        <div className='flex gap-4 items-center'>
          <SelectCustom
            onChange={onChangeLimit}
            value={limit.toString()}
            list={limits}
            title='limit'
          />
          <SelectCustom
            onChange={onChangeSort}
            value={sort}
            list={sorts}
            title='sort'
          />
        </div>
      </div>
    </div>
  );
}

export default Filter;
