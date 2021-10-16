// Import Modules
import React, { useState, useEffect } from 'react';
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
import { apiGetContainerShipping } from '../../../../api/shipping.api';
import { apiGetNationalPriceData, apiPostNationalPrice } from '../../../../api/national-price.api';

// Import Styling
import '../../../../styles/views/shipping-warehouse.scss';

// Import Constants
import { currencyList } from '../../../../constants/currencyList';

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
  const [metadata, setMetadata] = useState();
  const [currency, setCurrency] = useState(null);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchMetadata = async () => {
    // TODO: adjust params with currency
    const params = {
      container_number: container,
    };

    await apiGetNationalPriceData(params)
        .then((i) => {
          const { response: { data } } = i;
          setMetadata(data.result);
        })
        .catch((err) => {
          setErrorMessage(err.message || 'Server Error');
        });
  };

  const resetState = () => {
    setContainer('');
    setNationalPrice(0);
    setMetadata();
  };

  const addNationalPrice = async (e) => {
    e.preventDefault();

    if (!container) {
      setErrorMessage('Choose container number first!');
      return;
    }
    const payload = {
      container,
      national_price: nationalPrice,
    };

    setLoading(true);
    await apiPostNationalPrice(payload)
        .then((i) => {
          const { response: { data } } = i;
          setSuccessMessage(data?.message);
          setLoading(false);
          resetState();
          window.scrollTo(0, 0);
        })
        .catch((err) => {
          setErrorMessage(err?.message || 'Failed to Add National Price!');
          setLoading(false);
        });
  };

  useEffect(() => {
    if (container) fetchMetadata();
  }, [container]);

  return (
    <form className="shipping-warehouse" onSubmit={addNationalPrice}>
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
          value={currency}
          label={'Currency'}
          getValues={currencyList}
          setValue={setCurrency}
          constantValues
        />
        <CustomSelect
          label="No. Container"
          value={container}
          getValues={apiGetContainerShipping}
          setValue={setContainer}
          required
        />
        <DetailContainer data={metadata} />
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
        <Button className="align-end btn btn-lg simpan-btn" onClick={addNationalPrice}>
          {loading ? <CircularProgress size={20} thickness={5} /> : 'SIMPAN'}
        </Button>
      </Grid>
    </form>
  );
};

export default NationalPrice;
