// Import Library
import React, { useState } from 'react';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';

// Import Component
import CustomAlert from '../../../../../components/Alert';
import CustomBreadcrumbs from '../../../../../components/Breadcrumb';
import CustomSelect from '../../../../../components/Select';
import RadioSelect from '../../../../../components/RadioSelect';
import DatePicker from '../../../../../components/DatePicker';
import CustomModal from '../../../../../components/Modal';
import TambahPabrik from '../../TambahPabrik';
import TambahBrand from '../../TambahBrand';

// Import Utils
import { getUser } from '../../../../../utils/auth';

// Import Styling
import '../../../../../styles/views/hasil-produksi.scss';

// Import Routes
import Routes from '../../../../../router/RouteList';

// Import API
import { apiGetPabrik } from '../../../../../api/pabrik.api';
import { apiGetMaterialbyPabrik } from '../../../../../api/material.api';
import { apiGetBrand } from '../../../../../api/brand.api';
import { apiPostHasilProduksi } from '../../../../../api/hasil-produksi.api';

const HasilProduksi = () => {
  const [pabrik, setPabrik] = useState('');
  const [brand, setBrand] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [date, setDate] = useState(null);
  const [isRaw, setIsRaw] = useState('no');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // raw material
  const [inputList, setInputList] = useState([{ id_material: '', amount: '' }]);
  // on click button
  const [openPabrik, setOpenPabrik] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);

  // handle input change
  const handleInputChange = (name, value, index) => {
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // Reset State when submitted
  const resetState = () => {
    setPabrik('');
    setBrand('');
    setJumlah('');
    setDate(null);
    setIsRaw('no');
    setInputList([{ id_material: '', amount: '' }]);
  };

  // on Submit Hasil Produksi
  const postHasilProduksi = async (e) => {
    e.preventDefault();
    const payload = {
      employee_id: getUser().ID,
      pabrik_id: pabrik,
      charcoal_brand_id: brand,
      amount: jumlah,
      date: date?.toISOString().slice(0, 10),
      materials: isRaw === 'no' ? [] : inputList,
    };

    if (!loading) {
      setLoading(true);
      await apiPostHasilProduksi(payload)
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

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { id_material: '', amount: '' }]);
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
      name: 'Factory Production',
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
    <form className="hasil-produksi" onSubmit={postHasilProduksi}>
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
      <h3 className="hasil-produksi-title">Factory Production Input</h3>
      <Grid container className="hasil-produksi-form" direction="column">
        <CustomSelect
          label="Factory"
          value={pabrik}
          getValues={apiGetPabrik}
          setValue={setPabrik}
          required
        />
        <Button
          className="align-end btn tambah-item-btn"
          onClick={() => setOpenPabrik(true)}
        >
          Add Factory
        </Button>
        <CustomSelect
          label="Brand Charcoal"
          value={brand}
          getValues={apiGetBrand}
          setValue={setBrand}
          required
        />
        <Button
          className="align-end btn tambah-item-btn"
          onClick={() => setOpenBrand(true)}
        >
          Add Brand
        </Button>
        <TextField
          id="jumlah"
          name="jumlah"
          className="input-field"
          placeholder="Masukkan jumlah (dalam kg)"
          label="Jumlah"
          size="medium"
          value={jumlah}
          type="number"
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
                      name='id_material'
                      label={'Material '+(i+1)}
                      value={x.id_material}
                      setValue={handleInputChange}
                      getValues={pabrik ? (() => apiGetMaterialbyPabrik(pabrik)) : null}
                      parentValue={pabrik}
                      index={i}
                      required
                      customSetFunction
                      haveParent
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
                      id="amount"
                      name='amount'
                      className="input-field"
                      placeholder="Masukkan jumlah"
                      label="Jumlah"
                      size="medium"
                      value={x.amount}
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value, i)}
                      type="number"
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
              Add Material
          </Button>
        }
        <DatePicker label="Tanggal" value={date} setValue={setDate} required />
        <Button type="submit" className="align-end btn btn-lg simpan-btn">
          {loading ? <CircularProgress size={20} thickness={5} /> : 'SIMPAN'}
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
