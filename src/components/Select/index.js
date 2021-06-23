/* eslint-disable require-jsdoc */
// Import Library
import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';

// Import Styling
import '../../styles/components/select.scss';

export default function CustomSelect(props) {
  const { label, value, setValue, required,
    customSetFunction, name, index } = props;
  return (
    <div>
      <FormControl
        variant="outlined"
        className="custom-select"
        required={required}
      >
        <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
        <Select
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          }}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          name={name}
          onChange={customSetFunction?((e) =>setValue(e, index)):
            ((e) => setValue(e.target.value))}
          label={label}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

CustomSelect.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  getValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  required: PropTypes.bool,
  customSetFunction: PropTypes.bool,
  name: PropTypes.string,
  index: PropTypes.any,
};
