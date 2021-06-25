/* eslint-disable require-jsdoc */
// Import Library
import React, { useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';

// Import Component
import CustomAlert from '../../components/Alert';

// Import Styling
import '../../styles/components/select.scss';

export default function CustomSelect(props) {
  const { label, value, setValue, required, getValues,
    customSetFunction, name, index } = props;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // dropdown data
  const [listData, setListData] = useState([]);

  // dropdown data getter
  const getListData = async () => {
    if (!loading) {
      setLoading(true);
      await getValues()
          .then((res) => {
            const { response: { data } } = res;
            setListData(data.data);
            setLoading(false);
            return (data.data);
          })
          .catch((err) => {
            setErrorMessage(err?.message ? err.message : 'Server Error');
            setLoading(false);
          });
    }
  };

  useEffect(() => {
    getListData().then((data) => {
      if (data) {
        setListData(data);
      }
    });
  }, []);


  return (
    <div>
      {Boolean(errorMessage) && (
        <CustomAlert
          type={'error'}
          message={errorMessage}
          onClose={() => setErrorMessage('')}
        />
      )}
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
          onChange={customSetFunction?
            ((e) => setValue(e.target.name, e.target.value, index)):
            ((e) => setValue(e.target.value))}
          label={label}
        >
          {listData.length>0 && !loading && listData.map((el)=>
            <MenuItem value={el.id} key={el.id}>{el.name}</MenuItem>,
          )}
          {!listData.length && !loading && <p className="custom-select-no-data">
            Tidak ada data yang tersedia!</p>}
          {loading ? <CircularProgress size={20} thickness={5} /> : 'SIMPAN'}
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
