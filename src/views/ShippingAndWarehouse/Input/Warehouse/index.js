// Import Modules
import React, { useState } from 'react';
import { Grid, Button, CircularProgress } from '@material-ui/core';
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
    name: 'Warehouse and Warehouse Model',
  },
  {
    name: 'Input',
  },
  {
    name: 'Warehouse',
    onClick: Routes.shippingAndWarehouse.input.warehouse,
  },
];

const WarehouseInput = () => {
  const [container, setContainer] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [nominal, setNominal] = useState(0);
  const [date, setDate] = useState(null);
  const [warehouse, setWarehouse] = useState('');

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const AddWarehouse = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log('Add Warehouse');
      setLoading(false);
    }, 3000);
  };

  return (
    <form className="shipping-warehouse" onSubmit={AddWarehouse}>
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
      <h3 className="shipping-warehouse-title">Input Warehouse</h3>
      <Grid container className="shipping-warehouse-form" direction="column">
        <CustomSelect
          label="No. Container"
          value={container}
          getValues={false}
          setValue={setContainer}
          required
        />
        <Grid item container spacing={2}>
          <Grid item xs={6}>
            <CustomSelect
              label="Jenis Pembayaran"
              value={paymentType}
              getValues={false}
              setValue={setPaymentType}
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
              onChange={(event, value)=> setNominal(value)}
            />
          </Grid>
        </Grid>
        <CustomSelect
          label="Pilih Warehouse"
          value={warehouse}
          getValues={false}
          setValue={setWarehouse}
          required
        />
        <Button
          className="align-end btn tambah-item-btn"
          onClick={() => setOpenBrand(true)}
        >
          Tambah Warehouse
        </Button>
        <DatePicker label="Tanggal" value={date} setValue={setDate} required />
        <Button type="submit" className="align-end btn btn-lg simpan-btn">
          {loading ? <CircularProgress size={20} thickness={5} /> : 'SIMPAN'}
        </Button>
      </Grid>
    </form>
  );
};

export default WarehouseInput;
