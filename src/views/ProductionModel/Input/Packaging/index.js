// Import Library
import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

// Import Styling
import '../../../../styles/views/packaging.scss';

// Import Component
import CustomSelect from '../../../../components/Select';


const Packaging = () => {
  const [containerNumber, setContainerNumber] = useState('');
  const [brand, setBrand] = useState('');
  // Jenis dan Jumlah Packaging
  const [inputList, setInputList] = useState([
    { jenisPack: '', jumlah: '', jenisProdusen: '', produsen: '' },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList,
      { jenisPack: '', jumlah: '', jenisProdusen: '', produsen: '' }]);
  };

  return (
    <form className="packaging">
      <h3 className="packaging-title">Input Packaging</h3>
      <Grid container className="packaging-form" direction="column">
        <TextField
          id="containerNumber"
          name="containerNumber"
          className="input-field"
          placeholder="Masukkan nomor container"
          label="Nomor container"
          size="medium"
          value={containerNumber}
          type="text"
          variant="outlined"
          required
          onChange={(e) => setContainerNumber(e.target.value)}
        />
        <CustomSelect
          label="Brand Charcoal"
          value={brand}
          getValues={console.log}
          setValue={setBrand}
          required
        />
        <p className="packaging-text">
            Jumlah dan Jenis Packaging *
        </p>
        {inputList.map((x, i) => {
          return (
            <Grid
              container
              className="packaging-jenis"
              alignItems="center" key={i}>
              <Grid item xs={3} className="packaging-jenis-item">
                <CustomSelect
                  name="jenisPack"
                  label="Jenis Packaging"
                  value={x.jenisPack}
                  getValues={console.log}
                  setValue={handleInputChange}
                  index={i}
                  customSetFunction
                  required
                />
              </Grid>
              <Grid item xs={3} className="packaging-jenis-item">
                <TextField
                  id="jumlah"
                  name="jumlah"
                  className="input-field"
                  placeholder="Masukkan jumlah (dalam kg)"
                  label="Jumlah"
                  size="medium"
                  value={x.jumlah}
                  type="text"
                  variant="outlined"
                  required
                  onChange={(e) => handleInputChange(e, i)}
                />
              </Grid>
              <Grid item xs={3} className="packaging-jenis-item">
                <CustomSelect
                  name="jenisProdusen"
                  label="Jenis Produsen"
                  value={x.jenisProdusen}
                  getValues={console.log}
                  setValue={handleInputChange}
                  index={i}
                  customSetFunction
                  required
                />
              </Grid>
              <Grid item xs={3}>
                <CustomSelect
                  name="produsen"
                  label="Produsen"
                  value={x.produsen}
                  getValues={console.log}
                  setValue={handleInputChange}
                  index={i}
                  customSetFunction
                  required
                />
              </Grid>
            </Grid>
          );
        })}
        <Button
          className="align-end btn tambah-item-btn"
          onClick={handleAddClick}
        >
              Tambah Packaging
        </Button>
        <Button type="submit" className="align-end btn btn-lg simpan-btn">
          SIMPAN
        </Button>
      </Grid>
    </form>
  );
};

export default Packaging;
