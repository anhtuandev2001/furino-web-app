import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import Filter from '../Filter/Filter';
import { CategoryProp } from '../../types/categories';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function TemporaryDrawer({
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
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className='flex justify-between h-[50px] sm:h-auto items-center px-4 sm:hidden' >
        Filter
        <Button
          onClick={toggleDrawer(true)}
          endIcon={
            <FilterListIcon
              sx={{ color: 'black' }}
            />
          }
        />
      </div>
      <Drawer
        anchor='right'
        open={open}
        onClose={handleClose}
      >
        <Filter
          count={count}
          limit={limit}
          page={page}
          sort={sort}
          keyword={keyword}
          onChangeLimit={onChangeLimit}
          onChangeSort={onChangeSort}
          categories={categories}
          onChangeCategoriesSelected={onChangeCategoriesSelected}
          categoriesSelected={categoriesSelected}
          onChangeKeyword={onChangeKeyword}
          onCloseDrawer={handleClose}
        />
      </Drawer>
    </div>
  );
}
