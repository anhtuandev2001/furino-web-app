import { Button, TextField } from '@mui/material';
import SelectCustom from '../SelectCustom/SelectCustom';
import { CategoryProp } from '../../types/categories';
import { limits, sorts } from '../../utils/constants/menu';
import ComboBox from './ComboBox';
import CloseIcon from '@mui/icons-material/Close';

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
  onCloseDrawer,
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
  onCloseDrawer?: () => void;
}) {
  return (
    <div className=''>
      <div className='container mx-auto flex flex-col sm:flex-row h-screen sm:h-auto gap-4 px-4 sm:justify-between items-center py-[25px]'>
        <div className='flex items-center gap-2 w-full sm:w-auto justify-between'>
          <span>{`Showing ${
            page == 1
              ? `1-${limit > count ? count : limit}`
              : `${limit * page - limit}-${
                  page * limit > count ? count : page * limit
                }`
          } of ${count} results`}</span>
          <Button
            onClick={onCloseDrawer}
            endIcon={<CloseIcon sx={{ color: 'black', display:{sx: 'block', sm: 'none'} }} />}
          />
        </div>
        <TextField
          id='outlined-basic'
          label='Search'
          variant='outlined'
          className='w-full max-w-[300px]'
          value={keyword}
          onChange={onChangeKeyword}
          sx={{ background: 'white' }}
        />
        <ComboBox
          list={categories}
          categoriesSelected={categoriesSelected}
          onChangeCategoriesSelected={onChangeCategoriesSelected}
        />
        <div className='flex gap-4 w-full sm:w-auto justify-between sm:justify-normal sm:items-center'>
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
