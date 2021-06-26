// Import Library
import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

// Import Component
import CustomBreadcrumbs from '../../../../../components/Breadcrumb';
import CustomSelect from '../../../../../components/Select';
import CustomRadio from '../../../../../components/RadioSelect';

// Import Styling
import '../../../../../styles/views/raw-material.scss';

// Import Routes
import Routes from '../../../../../router/RouteList';

const Payment = () => {
  const [transaction, setTransaction] = useState('');
  const [payment, setPayment] = useState('');
  const [information, setInformation] = useState('');
  const [paymentChange, setPaymentChange] = useState('no');
  const [completePayment, setCompletePayment] = useState('');

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

  return (
    <form className="raw-material">
      <CustomBreadcrumbs componentTree={componentTree} />
      <h3 className="raw-material-title">Input Payment Outsource </h3>
      <Grid container className="raw-material-form" direction="column">
        <CustomSelect
          label="Transaksi"
          value={transaction}
          getValues={console.log}
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
        <Button type="submit" className="align-end btn btn-lg simpan-btn">
          SIMPAN
        </Button>
      </Grid>
    </form>
  );
};

export default Payment;
