// Import Library
import React, { useState } from 'react';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

// Import Component
import CustomBreadcrumbs from '../../../../../components/Breadcrumb';
import CustomSelect from '../../../../../components/Select';
import CustomRadio from '../../../../../components/RadioSelect';
import CustomAlert from '../../../../../components/Alert';
import DatePicker from '../../../../../components/DatePicker';

// Import Styling
import '../../../../../styles/views/raw-material.scss';

// Import Routes
import Routes from '../../../../../router/RouteList';

// Import API
import { apiGetAvailablePayment } from '../../../../../api/payment.api';
import { apiPostPayment } from '../../../../../api/payment.api';

// Import utils
import { getUser } from '../../../../../utils/auth';

const Payment = () => {
  const [transaction, setTransaction] = useState('');
  const [payment, setPayment] = useState('');
  const [information, setInformation] = useState('');
  const [paymentChange, setPaymentChange] = useState('no');
  const [completePayment, setCompletePayment] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [date, setDate] = useState(null);

  const arraySelection = [
    {
      id: 0,
      name: 'Ya',
      value: 'yes',
    },
    {
      id: 1,
      name: 'Tidak',
      value: 'no',
    },
  ];

  // for breadcrumbs
  const componentTree = [
    {
      name: 'Production Model',
    },
    {
      name: 'Input',
    },
    {
      name: 'Outsource',
    },
    {
      name: 'Payment',
      onClick: Routes.production.input.outSource.payment,
    },
  ];

  // Reset State when submitted
  const resetState = () => {
    setTransaction('');
    setPayment('');
    setInformation('');
    setPaymentChange('no');
    setCompletePayment('');
    setDate(null);
  };

  // on Submit Input Packaging
  const postInputPayment = async (e) => {
    e.preventDefault();
    const payload = {
      outsource_material_id: transaction,
      payment_amount: payment,
      description: information,
      employee_id: getUser().ID,
      complete_payment: completePayment,
      date,
    };

    if (!loading) {
      setLoading(true);
      await apiPostPayment(payload)
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
    <form className="raw-material" onSubmit={postInputPayment}>
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
      <h3 className="raw-material-title">Input Payment Outsource </h3>
      <Grid container className="raw-material-form" direction="column">
        <CustomSelect
          label="Transaksi"
          value={transaction}
          getValues={apiGetAvailablePayment}
          setValue={setTransaction}
          required
        />
        <CurrencyTextField
          label="Pembayaran"
          variant="outlined"
          required
          value={payment}
          currencySymbol="Rp"
          outputFormat="number"
          decimalCharacter=","
          digitGroupSeparator="."
          onChange={(event, value)=> setPayment(value)}
        />
        <TextField
          id="information"
          name="information"
          className="input-field"
          placeholder="Information*"
          label="Information"
          size="medium"
          value={information}
          type="text"
          variant="outlined"
          required
          onChange={(e) => setInformation(e.target.value)}
        />
        <CustomRadio
          title="Harga complete payment berubah?"
          arraySelection={arraySelection}
          required
          setValue={setPaymentChange}
          value={paymentChange}
        />
        {paymentChange === 'yes' && (
          <CurrencyTextField
            label="Complete Payment Fee"
            variant="outlined"
            required
            value={completePayment}
            currencySymbol="Rp"
            outputFormat="number"
            decimalCharacter=","
            digitGroupSeparator="."
            onChange={(event, value)=> setCompletePayment(value)}
          />
        )}
        <DatePicker label="Tanggal" value={date} setValue={setDate} required/>
        <Button type="submit" className="align-end btn btn-lg simpan-btn">
          {loading ? <CircularProgress size={20} thickness={5} /> : 'SUBMIT'}
        </Button>
      </Grid>
    </form>
  );
};

export default Payment;
