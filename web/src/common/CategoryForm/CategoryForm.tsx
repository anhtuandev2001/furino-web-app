import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import './style.scss';

function CategoryForm({
  data,
  onChange,
  checked,
  productStatus,
  itemRef,
  onReset,
}: {
  data: any;
  checked: any;
  onChange: any;
  itemRef: any;
  productStatus: any;
  onReset: any;
}) {
  console.log(productStatus);
  
  return (
    <div
      ref={itemRef}
      className='min-w-[300px] absolute top-0 bg-white z-[100] border shadow-sm availability-form'
    >
      <div className='text-sm px-4 flex justify-end border-b items-center'>
        <Button
          onClick={onReset}
          sx={{ textDecoration: 'underLine' }}
        >
          Reset
        </Button>
      </div>
      <div className='px-4 py-2'>
        <FormGroup>
          {data.data.map((item: any) => (
            <FormControlLabel
              control={
                <Checkbox
                  disabled={productStatus === 'loading'}
                  checked={checked.includes(item.categoryId)}
                  onChange={(_, checked) =>
                    onChange({ categoryId: item.categoryId, checked })
                  }
                />
              }
              label={`${item.name} (6)`}
            />
          ))}
        </FormGroup>
      </div>
    </div>
  );
}

export default CategoryForm;
