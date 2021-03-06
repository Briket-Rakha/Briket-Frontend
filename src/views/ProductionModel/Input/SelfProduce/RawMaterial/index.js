// Import Library
import React, { useState } from 'react';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

// Import Component
import CustomAlert from '../../../../../components/Alert';
import CustomBreadcrumbs from '../../../../../components/Breadcrumb';
import CustomSelect from '../../../../../components/Select';
import DatePicker from '../../../../../components/DatePicker';
import CustomModal from '../../../../../components/Modal';
import TambahPabrik from '../../TambahPabrik';
import TambahMaterial from '../../TambahMaterial';
import TambahPenjual from '../../TambahPenjual';

// Import Styling
import '../../../../../styles/views/raw-material.scss';

// Import Routes
import Routes from '../../../../../router/RouteList';

// Import API
import { apiGetPabrik } from '../../../../../api/pabrik.api';
import { apiGetMaterialbyPabrik } from '../../../../../api/material.api';
import { apiGetSupplierMaterial } from '../../../../../api/supplier.api';
import { apiPostRawMaterial } from '../../../../../api/raw-material.api';

// Import utils
import { getUser } from '../../../../../utils/auth';

// For Breadcrumbs
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
    name: 'Raw Material',
    onClick: Routes.production.input.selfProduce.rawMaterial,
  },
];


const RawMaterial = () => {
  const [pabrik, setPabrik] = useState('');
  const [material, setMaterial] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [penjual, setPenjual] = useState('');
  const [harga, setHarga] = useState('');
  // const [pj, setPj] = useState('');
  const [date, setDate] = useState(null);

  const [openPabrik, setOpenPabrik] = useState(false);
  const [openMaterial, setOpenMaterial] = useState(false);
  const [openPenjual, setOpenPenjual] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMaterial, setErrorMaterial] = useState(false);

  const resetState = () => {
    setPabrik('');
    setMaterial('');
    setJumlah('');
    setPenjual('');
    setHarga('');
    setDate(null);
  };

  const postRawMaterial = async (e) => {
    e.preventDefault();
    const payload = {
      employee_id: getUser().ID,
      raw_material_id: material,
      amount: jumlah,
      pabrik_id: pabrik,
      price: harga,
      supplier_id: penjual,
      date: date?.toISOString().slice(0, 10),
    };

    if (!loading) {
      setLoading(true);
      await apiPostRawMaterial(payload)
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

  const handleModalMaterial = () => {
    if (pabrik) {
      setOpenMaterial(true);
    } else {
      setErrorMaterial(true);
    }
  };

  return (
    <Grid item className="raw-material">
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
      <h3 className="raw-material-title">Material Input</h3>
      <form onSubmit={postRawMaterial}>
        <Grid container className="raw-material-form" direction="column">
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
            label="Material"
            value={material}
            getValues={pabrik ? (() => apiGetMaterialbyPabrik(pabrik)) : null}
            setValue={setMaterial}
            parentValue={pabrik}
            required
            haveParent
          />
          <Button
            className="align-end btn tambah-item-btn"
            onClick={handleModalMaterial}
          >
            Add Material
          </Button>

          <TextField
            id="jumlah"
            name="jumlah"
            className="input-field"
            placeholder="Amount*"
            label="Amount"
            size="medium"
            value={jumlah}
            type="number"
            variant="outlined"
            required
            onChange={(e) => setJumlah(e.target.value)}
          />
          <CurrencyTextField
            label="Price"
            variant="outlined"
            value={harga}
            currencySymbol="Rp"
            outputFormat="number"
            decimalCharacter=","
            digitGroupSeparator="."
            onChange={(event, value)=> setHarga(value)}
          />
          <CustomSelect
            label="Supplier"
            value={penjual}
            getValues={apiGetSupplierMaterial}
            setValue={setPenjual}
            required
          />
          <Button
            className="align-end btn tambah-item-btn"
            onClick={() => setOpenPenjual(true)}
          >
            Add Supplier
          </Button>
          <DatePicker label="Date" value={date} setValue={setDate} required />
          <Button type="submit" className="align-end btn btn-lg simpan-btn">
            {loading ? <CircularProgress size={20} thickness={5} /> : 'SUBMIT'}
          </Button>

        </Grid>
      </form>
      <CustomModal open={openPabrik} setOpen={setOpenPabrik}>
        <TambahPabrik />
      </CustomModal>

      {!errorMaterial ? (
          <CustomModal open={openMaterial} setOpen={setOpenMaterial}>
            <TambahMaterial pabrik={pabrik} />
          </CustomModal>

        ) : (
          <CustomAlert
            type='error'
            message='Select a factory first'
            onClose={() => setErrorMaterial(false)}
          />
        )}
      <CustomModal open={openPenjual} setOpen={setOpenPenjual}>
        <TambahPenjual type="material" />
      </CustomModal>
    </Grid>
  );
};

export default RawMaterial;
