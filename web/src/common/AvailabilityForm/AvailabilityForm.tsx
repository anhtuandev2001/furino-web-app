import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import './style.scss';

function AvailabilityForm({
  data,
  onChange,
  availabilityRef,
  onResetAvailability,
}: {
  data: any;
  onChange: any;
  availabilityRef: any;
  onResetAvailability: any;
}) {
  return (
    <div
      ref={availabilityRef}
      className='min-w-[300px] absolute top-0 bg-white z-[100] border shadow-sm availability-form'
    >
      <div className='text-sm px-4 flex justify-between border-b items-center'>
        <span>{data.count} selected</span>
        <Button
          onClick={onResetAvailability}
          sx={{ textDecoration: 'underLine' }}
        >
          Reset
        </Button>
      </div>
      <div className='px-4 py-2'>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={data.inStock}
                onChange={(_, checked) => onChange({ inStock: checked })}
              />
            }
            label='In stock (6)'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={data.outStock}
                onChange={(_, checked) => onChange({ outStock: checked })}
              />
            }
            label='Out of stock (1)'
          />
        </FormGroup>
      </div>
    </div>
  );
}

export default AvailabilityForm;
