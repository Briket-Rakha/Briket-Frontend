// Import Modules
import React, { useState } from 'react';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

// Import Styling
import '../../../../styles/views/shipping-warehouse.scss';

// Import Routes
import Routes from '../../../../router/RouteList';

// Import Component
import CustomAlert from '../../../../components/Alert';
import CustomBreadcrumbs from '../../../../components/Breadcrumb';
import CustomSelect from '../../../../components/Select';
import DatePicker from '../../../../components/DatePicker';

const componentTree = [
  {
    name: 'Shipping and Warehouse Model',
  },
  {
    name: 'Input',
  },
  {
    name: 'Shipping',
    onClick: Routes.shipping.input,
  },
];

const ShippingInput = () => {
  const [container, setContainer] = useState('');
  const [date, setDate] = useState(null);
  const [paymentList, setPaymentList] = useState([
    {
      paymentType: '',
      nominal: 0,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddPayment = () => {
    const newPayment = {
      paymentType: '',
      nominal: 0,
    };

    setPaymentList((prev) => [...prev, newPayment]);
  };

  const handleRemovePayment = () => {
    setPaymentList((prev) => prev.slice(0, prev.length - 1));
  };

  const handlePaymentType = (idx, val) => {
    setPaymentList((prev) => {
      prev[idx].paymentType = val;

      return prev;
    });
  };

  const handleNominal = (idx, val) => {
    setPaymentList((prev) => {
      prev[idx].nominal = val;

      return prev;
    });
  };

  const AddShipping = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log('Add Shipping');
      setLoading(false);
    }, 3000);
  };

  return (
    <form className="shipping-warehouse" onSubmit={AddShipping}>
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
      <h3 className="shipping-warehouse-title">Input Shipping</h3>
      <Grid container className="shipping-warehouse-form" direction="column">
        <CustomSelect
          label="No. Container"
          value={container}
          getValues={false}
          setValue={setContainer}
          required
        />
        {paymentList.map(({ paymentType, nominal }, idx) => (
          <Grid key={idx} item container spacing={2}>
            <Grid item xs={6}>
              <CustomSelect
                label="Jenis Pembayaran"
                value={paymentType}
                getValues={false}
                setValue={(e) => handlePaymentType(idx, e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <CurrencyTextField
                label="Nominal"
                variant="outlined"
                value={nominal}
                currencySymbol="Rp"
                outputFormat="number"
                decimalCharacter=","
                digitGroupSeparator="."
                onChange={(event, value)=> handleNominal(idx, value)}
              />
            </Grid>
          </Grid>
        ))}
        <Grid item container spacing={2} justify="flex-end"className="payment-btn-container">
          {paymentList.length > 1 && (
            <Grid item>
              <Button
                className="align-end btn delete-btn"
                onClick={handleRemovePayment}
              >
                <Delete fontSize="small" />
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button
              className="align-end btn tambah-item-btn"
              onClick={handleAddPayment}
            >
              Tambah Pembayaran
            </Button>
          </Grid>
        </Grid>
        <DatePicker label="Tanggal" value={date} setValue={setDate} required />
        <Button type="submit" className="align-end btn btn-lg simpan-btn">
          {loading ? <CircularProgress size={20} thickness={5} /> : 'SIMPAN'}
        </Button>
      </Grid>
    </form>
  );
};

export default ShippingInput;
