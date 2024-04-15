import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function ComboBox({
  list,
  categoriesSelected,
  onChangeCategoriesSelected,
}: {
  list: any[];
  categoriesSelected: any;
  onChangeCategoriesSelected: any;
}) {
  const newList =
    list &&
    list.map((item) => {
      return { label: item.name, categoryId: item.categoryId };
    });

  return (
    <Autocomplete
      disablePortal
      value={categoriesSelected}
      onChange={(_event, newValue) => onChangeCategoriesSelected(newValue)}
      id='combo-box-demo'
      options={newList}
      multiple
      isOptionEqualToValue={(option, value) =>
        option.label === value.label && option.categoryId === value.categoryId
      }
      sx={{
        width: 300,
        '& .MuiInputBase-root': { flexWrap: 'nowrap' },
        '& .MuiChip-label': { textTransform: 'capitalize' },
        backgroundColor: 'white',
        '& .MuiAutocomplete-option': {
          textTransform: 'capitalize',
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Category'
        />
      )}
    />
  );
}
