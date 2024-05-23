import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function ComboBox({
  list,
  value,
  onChange,
  multiple = true,
  label,
  sx,
  isOptionEqualToValue,
  error = false,
}: {
  list: any[];
  value?: any;
  onChange: any;
  multiple?: boolean;
  label: string;
  sx?: any;
  isOptionEqualToValue?: any;
  error?: boolean;
}) {
  return (
    <Autocomplete
      disablePortal 
      value={value}
      onChange={(_event, newValue) => onChange(newValue)}
      id='combo-box-demo'
      options={list}
      disabled={list.length === 0}
      isOptionEqualToValue={isOptionEqualToValue}
      multiple={multiple}
      sx={{
        width: 300,
        '& .MuiInputBase-root': { flexWrap: 'nowrap' },
        '& .MuiChip-label': { textTransform: 'capitalize' },
        backgroundColor: 'white',
        '& .MuiAutocomplete-option': {
          textTransform: 'capitalize',
        },
        ...sx,
      }}
      renderInput={(params) => (
        <TextField
          error={error  }
          {...params}
          label={label}
        />
      )}
    />
  );
}
