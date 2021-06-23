// Import Library
import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

// Import Component
import CustomSelect from '../../../../../components/Select';
import CustomModal from '../../../../../components/Modal';
import TambahBrand from '../../TambahBrand';
import TambahPenjual from '../../TambahPenjual';

// Import Styling
import '../../../../../styles/views/raw-material.scss';

const Charcoal = () => {
  const [brand, setBrand] = useState('');
  const [completePayment, setCompletePayment] = useState('');
  const [commission, setCommission] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [penjual, setPenjual] = useState('');
  const [pembayaran, setPembayaran] = useState('');
  const [pj, setPj] = useState('');

  const [openBrand, setOpenBrand] = useState(false);
  const [openPenjual, setOpenPenjual] = useState(false);

  return (
    <form className="raw-material">
      <h3 className="raw-material-title">Input Charcoal Outsource </h3>
      <Grid container className="raw-material-form" direction="column">
        <CustomSelect
          label="Brand"
          value={brand}
          getValues={console.log}
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
          getValues={console.log}
          setValue={setPenjual}
          required
        />
        <Button
          className="align-end btn tambah-item-btn"
          onClick={() => setOpenPenjual(true)}
        >
          Tambah Penjual
        </Button>
        <TextField
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
        />
        <Button type="submit" className="align-end btn btn-lg simpan-btn">
          SIMPAN
        </Button>
      </Grid>
      <CustomModal open={openBrand} setOpen={setOpenBrand}>
        <TambahBrand />
      </CustomModal>
      <CustomModal open={openPenjual} setOpen={setOpenPenjual}>
        <TambahPenjual />
      </CustomModal>
    </form>
  );
};

export default Charcoal;
