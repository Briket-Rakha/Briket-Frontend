// Import Library
import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

// Import Component
import CustomBreadcrumbs from '../../../../../components/Breadcrumb';
import CustomSelect from '../../../../../components/Select';
import RadioSelect from '../../../../../components/RadioSelect';
import DatePicker from '../../../../../components/DatePicker';
import CustomModal from '../../../../../components/Modal';
import TambahPabrik from '../../TambahPabrik';
import TambahBrand from '../../TambahBrand';

// Import Styling
import '../../../../../styles/views/hasil-produksi.scss';

// Import Routes
import Routes from '../../../../../router/RouteList';

// Import API
import { apiGetPabrik } from '../../../../../api/pabrik.api';
import { apiGetMaterial } from '../../../../../api/material.api';

const HasilProduksi = () => {
  const [pabrik, setPabrik] = useState('');
  const [brand, setBrand] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [date, setDate] = useState(null);
  const [isRaw, setIsRaw] = useState('no');
  // raw material
  const [inputList, setInputList] = useState([{ material: '', jumlah: '' }]);
  // on click button
  const [openPabrik, setOpenPabrik] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);

  // handle input change
  const handleInputChange = (name, value, index) => {
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { material: '', jumlah: '' }]);
  };

  // for breadcrumbs
  const componentTree = [
    {
      name: 'Production Model',
    },
    {
      name: 'Input',
    },
    {
      name: 'Self Produce',
    },
    {
      name: 'Hasil Produksi',
      onClick: Routes.production.input.selfProduce.hasilProduksi,
    },
  ];

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

  return (
    <form className="hasil-produksi">
      <CustomBreadcrumbs componentTree={componentTree} />
      <h3 className="hasil-produksi-title">Input Hasil Produksi</h3>
      <Grid container className="hasil-produksi-form" direction="column">
        <CustomSelect
          label="Pabrik"
          value={pabrik}
          getValues={apiGetPabrik}
          setValue={setPabrik}
          required
        />
        <Button
          className="align-end btn tambah-item-btn"
          onClick={() => setOpenPabrik(true)}
        >
          Tambah Pabrik
        </Button>
        {/* TODO: ganti getValues jadi apiGetBrand */}
        <CustomSelect
          label="Brand Charcoal"
          value={brand}
          getValues={apiGetMaterial}
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
          placeholder="Masukkan jumlah (dalam kg)"
          label="Jumlah"
          size="medium"
          value={jumlah}
          type="text"
          variant="outlined"
          required
          onChange={(e) => setJumlah(e.target.value)}
        />
        <RadioSelect
          arraySelection={arraySelection}
          title="Ubah Raw Material?"
          value={isRaw}
          setValue={setIsRaw}
          required
        />
        {isRaw=='yes' ? (
          <div>
            {inputList.map((x, i) => {
              return (
                <Grid
                  container
                  className="hasil-produksi-raw"
                  alignItems="center" key={i}>
                  <Grid item xs={5}>
                    <CustomSelect
                      name='material'
                      label={'Material '+i}
                      value={x.material}
                      setValue={handleInputChange}
                      getValues={apiGetMaterial}
                      index={i}
                      required
                      customSetFunction
                    />
                  </Grid>
                  <Grid
                    container
                    item
                    justify="center"alignItems="center"
                    xs={2} >
                    <p>:</p>
                  </Grid>

                  <Grid item xs={5}>
                    <TextField
                      id="jumlah"
                      name='jumlah'
                      className="input-field"
                      placeholder="Masukkan jumlah"
                      label="Jumlah"
                      size="medium"
                      value={x.jumlah}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value, i)}
                      type="text"
                      variant="outlined"
                      required
                    />
                  </Grid>
                </Grid>
              );
            })}
          </div>
        ):
        ''
        }
        {isRaw &&
          <Button
            className="align-end btn tambah-item-btn"
            onClick={handleAddClick}
          >
              Tambah Material
          </Button>
        }
        <DatePicker label="Tanggal" value={date} setValue={setDate} required/>
        <Button type="submit" className="align-end btn btn-lg simpan-btn">
          SIMPAN
        </Button>
      </Grid>
      <CustomModal open={openPabrik} setOpen={setOpenPabrik}>
        <TambahPabrik />
      </CustomModal>
      <CustomModal open={openBrand} setOpen={setOpenBrand}>
        <TambahBrand />
      </CustomModal>
    </form>
  );
};

export default HasilProduksi;
