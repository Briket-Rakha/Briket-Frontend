// Import Library
import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

// Import Component
import CustomSelect from '../../../../../components/Select';
import DatePicker from '../../../../../components/DatePicker';
import CustomModal from '../../../../../components/Modal';
import TambahPabrik from './TambahPabrik';
import TambahMaterial from './TambahMaterial';
import TambahPenjual from './TambahPenjual';

// Import Styling
import '../../../../../styles/views/raw-material.scss';

const RawMaterial = () => {
  const [pabrik, setPabrik] = useState(null);
  const [material, setMaterial] = useState(null);
  const [jumlah, setJumlah] = useState(null);
  const [penjual, setPenjual] = useState(null );
  const [harga, setHarga] = useState(null);
  // const [pj, setPj] = useState('');
  const [date, setDate] = useState(null);

  const [openPabrik, setOpenPabrik] = useState(false);
  const [openMaterial, setOpenMaterial] = useState(false);
  const [openPenjual, setOpenPenjual] = useState(false);

  return (
    <Grid item className="raw-material">
      <h3 className="raw-material-title">Input Material</h3>
      <Grid container className="raw-material-form" direction="column">
        <CustomSelect
          label="Pabrik"
          value={pabrik}
          getValues={console.log}
          setValue={setPabrik}
          required
        />
        <Button
          className="align-end btn tambah-item-btn"
          onClick={() => setOpenPabrik(true)}
        >
          Tambah Pabrik
        </Button>
        <CustomSelect
          label="Material"
          value={material}
          getValues={console.log}
          setValue={setMaterial}
          required
        />
        <Button
          className="align-end btn tambah-item-btn"
          onClick={() => setOpenMaterial(true)}
        >
          Tambah Material
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
          label="Harga"
          variant="outlined"
          value={harga}
          currencySymbol="Rp"
          outputFormat="number"
          decimalCharacter=","
          digitGroupSeparator="."
          onChange={(event, value)=> setHarga(value)}
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
        <DatePicker label="Tanggal" value={date} setValue={setDate} required/>
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
        <Button className="align-end btn btn-lg simpan-btn">
          SIMPAN
        </Button>
      </Grid>
      <CustomModal open={openPabrik} setOpen={setOpenPabrik}>
        <TambahPabrik />
      </CustomModal>
      <CustomModal open={openMaterial} setOpen={setOpenMaterial}>
        <TambahMaterial />
      </CustomModal>
      <CustomModal open={openPenjual} setOpen={setOpenPenjual}>
        <TambahPenjual />
      </CustomModal>
    </Grid>
  );
};

export default RawMaterial;