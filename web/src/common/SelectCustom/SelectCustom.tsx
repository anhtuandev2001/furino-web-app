import { InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { v4 as uuidv4 } from 'uuid';

interface SelectCustomProps {
  onChange: any;
  value: string;
  list: string[];
  title: string;
}

function SelectCustom({ onChange, value, list, title }: SelectCustomProps) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel
          id='demo-simple-select-label'
          sx={{ textTransform: 'capitalize' }}
        >
          {title}
        </InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={value}
          sx={{ backgroundColor: 'white', textTransform: 'capitalize' }}
          label={title}
          onChange={onChange}
        >
          {list.map((item: string) => (
            <MenuItem
              value={item}
              sx={{
                textTransform: 'capitalize',
              }}
              key={uuidv4()}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectCustom;
