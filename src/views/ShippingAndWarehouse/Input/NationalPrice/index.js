// Import Modules
import React, { useState } from 'react';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

// Import Routes
import Routes from '../../../../router/RouteList';

// Import Component
import CustomAlert from '../../../../components/Alert';
import CustomBreadcrumbs from '../../../../components/Breadcrumb';
import CustomSelect from '../../../../components/Select';
import DetailContainer from './DetailContainer';

// Import API
import { apiGetContainer } from '../../../../api/input-packaging.api';

// Import Styling
import '../../../../styles/views/shipping-warehouse.scss';

const componentTree = [
  {
    name: 'Trucking Model',
  },
  {
    name: 'National Price',
    onClick: Routes.warehouse.nationalPrice,
  },
];

const NationalPrice = () => {
  const [container, setContainer] = useState('');
  const [nationalPrice, setNationalPrice] = useState(0);

  const [loading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <form className="shipping-warehouse">
      {(Boolean(errorMessage) || Boolean(successMessage)) && (
        <CustomAlert
          type={successMessage ? 'success' : 'error'}
          message={successMessage ? successMessage : errorMessage}
          onClose={successMessage ?
            () => setSuccessMessage('') :
            () => setErrorMessage('')
          }
        />
      )}
      <CustomBreadcrumbs componentTree={componentTree} />
      <h3 className="shipping-warehouse-title">Input National Price</h3>
      <Grid container className="shipping-warehouse-form" direction="column">
        <CustomSelect
          label="No. Container"
          value={container}
          getValues={apiGetContainer}
          setValue={setContainer}
          required
        />
        <DetailContainer />
        <CurrencyTextField
          label="National Price"
          variant="outlined"
          value={nationalPrice}
          name="nationalPrice"
          currencySymbol="Rp"
          outputFormat="number"
          decimalCharacter=","
          digitGroupSeparator="."
          onChange={(e, value)=> setNationalPrice(value)}
        />
        <Button type="submit" className="align-end btn btn-lg simpan-btn">
          {loading ? <CircularProgress size={20} thickness={5} /> : 'SIMPAN'}
        </Button>
      </Grid>
    </form>
  );
};

export default NationalPrice;
