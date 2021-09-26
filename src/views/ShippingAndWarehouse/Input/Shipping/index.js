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

// Import API
import { apiGetUnshippedContainer } from '../../../../api/input-packaging.api';
import { apiPostShipping } from '../../../../api/shipping.api';
import { apiGetPaymentType } from '../../../../api/payment.api';

// Import Utils
import { getUser } from '../../../../utils/auth';

const componentTree = [
  {
    name: 'Shipping Model',
  },
  {
    name: 'Input',
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

  const handlePaymentChange = (name, val, idx) => {
    setPaymentList((prev) => {
      const newPaymentList = [...prev];
      newPaymentList[idx][name] = val;

      return newPaymentList;
    });
  };

  const resetState = () => {
    setContainer('');
    setPaymentList([{
      paymentType: '',
      nominal: 0,
    }]);
    setDate(null);
  };

  const AddShipping = async (e) => {
    e.preventDefault();

    if (!loading) {
      setLoading(true);

      const payload = {
        container_number: container,
        employee_id: getUser().ID,
        date,
        items: paymentList,
      };

      await apiPostShipping(payload)
          .then((i) => {
            const { response: { data } } = i;
            setSuccessMessage(data?.message);
            setLoading(false);
            resetState();
            window.scrollTo(0, 0);
          })
          .catch((err) => {
            setErrorMessage(err?.message ?? 'Server Error');
            setLoading(false);
          });
    }
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
          getValues={apiGetUnshippedContainer}
          setValue={setContainer}
          required
        />
        {paymentList.map(({ paymentType, nominal }, idx) => (
          <Grid key={idx} item container spacing={2}>
            <Grid item xs={6}>
              <CustomSelect
                name="paymentType"
                label="Jenis Pembayaran"
                value={paymentType}
                getValues={() => apiGetPaymentType('shipping')}
                index={idx}
                setValue={handlePaymentChange}
                customSetFunction
                required
              />
            </Grid>
            <Grid item xs={6}>
              <CurrencyTextField
                label="Nominal"
                variant="outlined"
                value={nominal}
                name="nominal"
                currencySymbol="Rp"
                outputFormat="number"
                decimalCharacter=","
                digitGroupSeparator="."
                onChange={(e, value)=> handlePaymentChange(e.target.name, value, idx)}
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
