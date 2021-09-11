// Import Library
import React, { useState } from 'react';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

// Import Component
import CustomAlert from '../../../../../components/Alert';
import CustomBreadcrumbs from '../../../../../components/Breadcrumb';
import CustomSelect from '../../../../../components/Select';
import CustomModal from '../../../../../components/Modal';
import TambahBrand from '../../TambahBrand';
import TambahPenjual from '../../TambahPenjual';

// Import Styling
import '../../../../../styles/views/raw-material.scss';

// Import Routes
import Routes from '../../../../../router/RouteList';

// Import API
import { apiGetSupplierOutsource } from '../../../../../api/supplier.api';
import { apiGetBrand } from '../../../../../api/brand.api';
import { apiPostCharcoal } from '../../../../../api/charcoal.api';

// Import utils
import { getUser } from '../../../../../utils/auth';

// Import Components
import DatePicker from '../../../../../components/DatePicker';

// For Breadcrumbs
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
    name: 'Charcoal',
    onClick: Routes.production.input.outSource.charcoal,
  },
];

const Charcoal = () => {
  const [brand, setBrand] = useState('');
  const [completePayment, setCompletePayment] = useState('');
  const [commission, setCommission] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [penjual, setPenjual] = useState('');
  const [pembayaran, setPembayaran] = useState('');
  const [date, setDate] = useState(null);
  // const [pj, setPj] = useState('');

  const [openBrand, setOpenBrand] = useState(false);
  const [openPenjual, setOpenPenjual] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const resetState = () => {
    setCompletePayment('');
    setJumlah('');
    setPembayaran('');
    setCommission('');
    setBrand('');
    setPenjual('');
    setDate(null);
  };

  const postCharcoal = async (e) => {
    e.preventDefault();
    const payload = {
      employee_id: getUser().ID,
      complete_price: completePayment,
      amount: jumlah,
      payment: pembayaran,
      commision_price: commission,
      charcoal_brand_id: brand,
      outsource_id: penjual,
      date,
    };

    if (!loading) {
      setLoading(true);
      await apiPostCharcoal(payload)
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
    <Grid item className="raw-material">
      {console.log(commission)}
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
      <h3 className="raw-material-title">Input Charcoal Outsource </h3>
      <form onSubmit={postCharcoal}>
        <Grid container className="raw-material-form" direction="column">
          <CustomSelect
            label="Brand"
            value={brand}
            getValues={apiGetBrand}
            setValue={setBrand}
            required
          />
          <Button
            className="align-end btn tambah-item-btn"
            onClick={() => setOpenBrand(true)}
          >
          Tambah Brand
          </Button>
          <TextField
            id="jumlah"
            name="jumlah"
            className="input-field"
            placeholder="Jumlah*"
            label="Jumlah"
            size="medium"
            value={jumlah}
            type="text"
            variant="outlined"
            required
            onChange={(e) => setJumlah(e.target.value)}
          />
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
          <CurrencyTextField
            label="Commission Fee"
            variant="outlined"
            value={commission}
            required
            currencySymbol="Rp"
            outputFormat="number"
            decimalCharacter=","
            digitGroupSeparator="."
            onChange={(event, value)=> setCommission(value)}
          />
          <CurrencyTextField
            label="Pembayaran"
            variant="outlined"
            value={pembayaran}
            required
            currencySymbol="Rp"
            outputFormat="number"
            decimalCharacter=","
            digitGroupSeparator="."
            onChange={(event, value)=> setPembayaran(value)}
          />
          <CustomSelect
            label="Penjual"
            value={penjual}
            getValues={apiGetSupplierOutsource}
            setValue={setPenjual}
            required
          />
          <Button
            className="align-end btn tambah-item-btn"
            onClick={() => setOpenPenjual(true)}
          >
            Tambah Penjual
          </Button>
          {/* <TextField
          id="penanggung-jawab"
          name="pj"
          className="input-field"
          placeholder="Penanggung Jawab*"
          label="Penanggung Jawab"
          size="medium"
          value={pj}
          type="text"
          variant="outlined"
          required
          onChange={(e) => setPj(e.target.value)}
        /> */}
          <DatePicker label="Tanggal" value={date} setValue={setDate} required/>
          <Button type="submit" className="align-end btn btn-lg simpan-btn">
            {loading ? (
            <CircularProgress size={20} thickness={5} />
          ) : 'SIMPAN'}
          </Button>
        </Grid>
      </form>
      <CustomModal open={openBrand} setOpen={setOpenBrand}>
        <TambahBrand />
      </CustomModal>
      <CustomModal open={openPenjual} setOpen={setOpenPenjual}>
        <TambahPenjual type="outsource" />
      </CustomModal>
    </Grid>
  );
};

export default Charcoal;
