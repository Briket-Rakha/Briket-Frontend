// Import Modules
import React, { useState } from 'react';
import { Grid, Button, CircularProgress } from '@material-ui/core';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';
import { Delete } from '@material-ui/icons';

// Import Styling
import '../../../../styles/views/shipping-warehouse.scss';

// Import Routes
import Routes from '../../../../router/RouteList';

// Import Component
import CustomAlert from '../../../../components/Alert';
import CustomBreadcrumbs from '../../../../components/Breadcrumb';
import CustomSelect from '../../../../components/Select';
import DatePicker from '../../../../components/DatePicker';
import CustomModal from '../../../../components/Modal';
import TambahWarehouse from '../../../ProductionModel/Input/TambahWarehouse';

const componentTree = [
  {
    name: 'Warehouse and Warehouse Model',
  },
  {
    name: 'Input',
  },
  {
    name: 'Warehouse',
    onClick: Routes.warehouse.input,
  },
];

const WarehouseInput = () => {
  const [container, setContainer] = useState('');
  const [paymentList, setPaymentList] = useState([
    {
      paymentType: '',
      nominal: 0,
    },
  ]);
  const [date, setDate] = useState(null);
  const [warehouse, setWarehouse] = useState('');
  const [warehouseModal, setWarehouseModal] = useState(false);

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

  const AddWarehouse = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log('Add Warehouse');
      setLoading(false);
    }, 3000);
  };

  return (
    <Grid item container className="shipping-warehouse" direction="column">
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
      <form container className="shipping-warehouse-form" onSubmit={AddWarehouse}>
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
        <CustomSelect
          label="Pilih Warehouse"
          value={warehouse}
          getValues={false}
          setValue={setWarehouse}
          required
        />
        <Grid item container justify="flex-end">
          <Button
            className="align-end btn tambah-item-btn"
            onClick={() => setWarehouseModal(true)}
          >
            Tambah Warehouse
          </Button>
        </Grid>
        <DatePicker label="Tanggal" value={date} setValue={setDate} required />
        <Grid item container justify="flex-end">
          <Button type="submit" className="align-end btn btn-lg simpan-btn">
            {loading ? <CircularProgress size={20} thickness={5} /> : 'SIMPAN'}
          </Button>
        </Grid>
      </form>
      <CustomModal open={warehouseModal} setOpen={setWarehouseModal}>
        <TambahWarehouse />
      </CustomModal>
    </Grid>
  );
};

export default WarehouseInput;
