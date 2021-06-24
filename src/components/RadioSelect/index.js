/* eslint-disable require-jsdoc */
// Import Library
import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types';

// Import Styling
import '../../styles/components/radioSelect.scss';

export default function RadioSelect(props) {
  const { arraySelection, title, required, value, setValue } = props;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (

    <div>
      <FormControl
        variant="outlined"
        required={required}
        className="radio-select"
      >
        <FormLabel component="legend" className="radio-select-title">
          {title}
        </FormLabel>
        <RadioGroup
          value={value}
          onChange={handleChange}
        >
          {arraySelection.map((el) => {
            return (
              <FormControlLabel
                value={el.value}
                control={<Radio color="default"/>}
                label={el.name}
                key={el.id}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

RadioSelect.propTypes = {
  arraySelection: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.any.isRequired,
  setValue: PropTypes.func.isRequired,
};
