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
// import CustomModal from '../../../../components/Modal';
// import TambahWarehouse from '../../../ProductionModel/Input/TambahWarehouse';

// Import API
import { apiGetContainer } from '../../../../api/input-packaging.api';
import { apiGetPaymentType } from '../../../../api/payment.api';
import { apiPostTrucking } from '../../../../api/trucking.api';
// import { apiGetWarehouse } from '../../../../api/warehouse.api';

// Import Utils
import { getUser } from '../../../../utils/auth';

const componentTree = [
  {
    name: 'Warehouse Model',
  },
  {
    name: 'Input',
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
  // const [warehouse, setWarehouse] = useState('');
  // const [warehouseModal, setWarehouseModal] = useState(false);

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
    setPaymentList([
      {
        paymentType: '',
        nominal: 0,
      },
    ]);
    // setWarehouse('');
    setDate('');
  };

  const AddWarehouse = async (e) => {
    e.preventDefault();

    if (!loading) {
      setLoading(true);

      const payload = {
        container_number: container,
        // warehouse_id: warehouse,
        employee_id: getUser().ID,
        date,
        items: paymentList,
      };

      await apiPostTrucking(payload)
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
      <h3 className="shipping-warehouse-title">Warehouse Input</h3>
      <form container className="shipping-warehouse-form" onSubmit={AddWarehouse}>
        <CustomSelect
          label="No. Container"
          value={container}
          getValues={apiGetContainer}
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
                getValues={() => apiGetPaymentType('trucking')}
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
                currencySymbol="R$"
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
              Add Payment
            </Button>
          </Grid>
        </Grid>
        {/* <CustomSelect
          label="Pilih Warehouse"
          value={warehouse}
          getValues={apiGetWarehouse}
          setValue={setWarehouse}
          required
        /> */}
        {/* <Grid item container justify="flex-end">
          <Button
            className="align-end btn tambah-item-btn"
            onClick={() => setWarehouseModal(true)}
          >
            Add Warehouse
          </Button>
        </Grid> */}
        <DatePicker label="Tanggal" value={date} setValue={setDate} required />
        <Grid item container justify="flex-end">
          <Button type="submit" className="align-end btn btn-lg simpan-btn">
            {loading ? <CircularProgress size={20} thickness={5} /> : 'SUBMIT'}
          </Button>
        </Grid>
      </form>
      {/* <CustomModal open={warehouseModal} setOpen={setWarehouseModal}>
        <TambahWarehouse />
      </CustomModal> */}
    </Grid>
  );
};

export default WarehouseInput;
