// Import Library
import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

// Import Component
import CustomSelect from '../../../../../components/Select';
import RadioSelect from '../../../../../components/RadioSelect';
import DatePicker from '../../../../../components/DatePicker';
import CustomModal from '../../../../../components/Modal';
import TambahPabrik from '../../TambahPabrik';
import TambahBrand from '../../TambahBrand';

// Import Styling
import '../../../../../styles/views/hasil-produksi.scss';

const HasilProduksi = () => {
  const [pabrik, setPabrik] = useState('');
  const [brand, setBrand] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [date, setDate] = useState(null);
  const [isRaw, setIsRaw] = useState('Tidak');
  // raw material
  const [inputList, setInputList] = useState([{ material: '', jumlah: '' }]);
  // on click button
  const [openPabrik, setOpenPabrik] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { material: '', jumlah: '' }]);
  };
  return (
    <form className="hasil-produksi">
      <h3 className="hasil-produksi-title">Input Hasil Produksi</h3>
      <Grid container className="hasil-produksi-form" direction="column">
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
          label="Brand Charcoal"
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
          arraySelection={['Ya', 'Tidak']}
          title="Ubah Raw Material?"
          value={isRaw}
          setValue={setIsRaw}
          required
        />
        {isRaw=='Ya'?(
          <div>
            {inputList.map((x, i) => {
              return (
                <Grid
                  container
                  className="hasil-produksi-raw"
                  alignItems="center" key={i}>
                  <Grid item xs={5}>
                    <CustomSelect
                      name="material"
                      label={'Material '+i}
                      value={x.material}
                      setValue={handleInputChange}
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
                      name="jumlah"
                      className="input-field"
                      placeholder="Masukkan jumlah"
                      label="Jumlah"
                      size="medium"
                      value={x.jumlah}
                      onChange={(e) => handleInputChange(e, i)}
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
        {isRaw=='Ya'&&
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
