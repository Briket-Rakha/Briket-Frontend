/* eslint-disable require-jsdoc */
// Import Library
import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';

// Import Styling
import '../../styles/components/datepicker.scss';

function DatePicker(props) {
  const { label, value, setValue, required } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          className="date-picker"
          margin="normal"
          inputVariant="outlined"
          id="date-picker-dialog"
          label={label}
          format="MM/dd/yyyy"
          value={value}
          required={required}
          onChange={setValue}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.instanceOf(Date).isRequired,
  setValue: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default DatePicker;
