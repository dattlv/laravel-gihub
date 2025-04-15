import {
  Box,
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { SearchField } from '../SearchField';

const FilterBar = ({
  mode,
  searchProps = {},
  filters = [],
  spacing = 2,
  containerSx = {},
}) => {
  const defaultSearchProps = {
    placeholder: 'Search',
    width: 200,
    onChange: () => {},
    show: true,
    ...searchProps,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: spacing,
        flexWrap: 'wrap',
        ...containerSx,
      }}
    >
      {/* Search Field */}
      {defaultSearchProps.show && (
        <SearchField
          placeholder={defaultSearchProps.placeholder}
          size="small"
          sx={{ width: defaultSearchProps.width }}
          mode={mode}
          onChange={defaultSearchProps.onChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            ...defaultSearchProps.InputProps,
          }}
        />
      )}

      {/* Dynamic Filters */}
      {filters.map((filter, index) => (
        <FormControl
          key={`filter-${index}-${filter.name}`}
          size="small"
          sx={{ minWidth: filter.width || 120, ...filter.sx }}
          disabled={filter.disabled}
        >
          {filter.label && (
            <Typography variant="caption" sx={{ mb: 0.5 }}>
              {filter.label}
            </Typography>
          )}
          <Select
            value={filter.value}
            onChange={filter.onChange}
            displayEmpty={filter.displayEmpty !== false}
            sx={{ fontSize: '14px', ...filter.selectSx }}
            renderValue={filter.renderValue}
            MenuProps={filter.MenuProps}
            multiple={filter.multiple}
          >
            {/* Default empty option */}
            {filter.showEmptyOption !== false && (
              <MenuItem
                value=""
                sx={{ fontSize: '14px', ...filter.menuItemSx }}
                disabled={filter.disableEmptyOption}
              >
                {filter.emptyOptionText || `All ${filter.name || ''}`}
              </MenuItem>
            )}

            {/* Map through options */}
            {filter.options.map((option, optIndex) => {
              // Handle both object options and string options
              const optionValue =
                typeof option === 'object' ? option.value : option;
              const optionLabel =
                typeof option === 'object' ? option.label : option;

              return (
                <MenuItem
                  key={`${optIndex}-${optionValue}`}
                  value={optionValue}
                  sx={{ fontSize: '14px', ...filter.menuItemSx }}
                  disabled={typeof option === 'object' && option.disabled}
                >
                  {filter.renderOption
                    ? filter.renderOption(option)
                    : optionLabel}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      ))}
    </Box>
  );
};

export default FilterBar;
