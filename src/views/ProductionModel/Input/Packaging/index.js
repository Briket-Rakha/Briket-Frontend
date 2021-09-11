// Import Library
import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

// Import Styling
import '../../../../styles/views/packaging.scss';

// Import Component
import CustomSelect from '../../../../components/Select';
import CustomBreadcrumbs from '../../../../components/Breadcrumb';
import CustomAlert from '../../../../components/Alert';
import DatePicker from '../../../../components/DatePicker';

// Import Utils
import { getUser } from '../../../../utils/auth';

// Import Routes
import Routes from '../../../../router/RouteList';

// Import API
import { apiGetPabrik } from '../../../../api/pabrik.api';
import { apiGetBrand } from '../../../../api/brand.api';
import { apiGetPackaging } from '../../../../api/packaging.api';
import { apiGetSupplierOutsource } from '../../../../api/supplier.api';
import { apiPostInputPackaging } from '../../../../api/input-packaging.api';


const Packaging = () => {
  const [containerNumber, setContainerNumber] = useState('');
  const [brand, setBrand] = useState('');
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // Jenis dan Jumlah Packaging
  const [inputList, setInputList] = useState([
    {
      package_id: '',
      amount: 0,
      asal: '',
      asal_id: '',
      asal_name: '',
      price: 0,
      harga_total: function() {
        return (this.amount*this.price);
      },
    },
  ]);

  useEffect(() => {
    inputList.map((x, i) => {
      x.harga_total();
    });
  }, []);

  // Reset State when submitted
  const resetState = () => {
    setContainerNumber('');
    setBrand('');
    setInputList([{
      package_id: '',
      amount: 0,
      asal: '',
      asal_id: '',
      asal_name: '',
      price: 0,
      harga_total: function() {
        return (this.amount*this.price);
      },
    },
    ]);
    setDate(null);
  };

  // on Submit Input Packaging
  const postInputPackaging = async (e) => {
    e.preventDefault();
    const payload = {
      employee_id: getUser().ID,
      container_number: containerNumber,
      charcoal_brand_id: brand,
      items: inputList,
      date,
    };

    if (!loading) {
      setLoading(true);
      await apiPostInputPackaging(payload)
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

  // handle input change
  const handleInputChange = (name, value, index) => {
    const list = [...inputList];
    if ( name == 'asal_id' ) {
      list[index].asal_id = value.id;
      list[index].asal_name = value.name;
    } else {
      list[index][name] = value;
    }
    setInputList(list);
  };

  // handle price change
  const handlePriceChange = (value, index) => {
    const list = [...inputList];
    list[index].price = value;
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList,
      {
        package_id: '',
        amount: 0,
        asal: '',
        asal_id: '',
        asal_name: '',
        price: 0,
        harga_total: function() {
          return (this.amount*this.price);
        },
      },
    ]);
  };

  const jenisProdusen = [
    {
      id: 'pabrik',
      name: 'Produksi',
      value: 'Produksi',
    },
    {
      id: 'outsource',
      name: 'Outsource',
      value: 'Outsource',
    },
  ];

  // for breadcrumbs
  const componentTree = [
    {
      name: 'Production Model',
    },
    {
      name: 'Input',
    },
    {
      name: 'Packaging',
      onClick: Routes.production.input.packaging,
    },
  ];

  return (
    <form className="packaging" onSubmit={postInputPackaging}>
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
          getValues={apiGetBrand}
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
              spacing={2}
              className="packaging-jenis"
              key={i}
            >
              <Grid item xs={3} className="packaging-jenis-item">
                <CustomSelect
                  name="package_id"
                  label="Jenis Packaging"
                  value={x.package_id}
                  getValues={apiGetPackaging}
                  setValue={handleInputChange}
                  index={i}
                  customSetFunction
                  required
                />
              </Grid>
              <Grid item xs={3} className="packaging-jenis-item">
                <TextField
                  id="jumlah"
                  name="amount"
                  className="input-field"
                  placeholder="Masukkan jumlah (dalam kg)"
                  label="Jumlah"
                  size="medium"
                  type="number"
                  value={x.amount}
                  variant="outlined"
                  required
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value, i)}
                />
              </Grid>
              <Grid item xs={3}>
                <CustomSelect
                  name="asal"
                  label="Jenis Produsen"
                  value={x.asal}
                  getValues={jenisProdusen}
                  setValue={handleInputChange}
                  index={i}
                  customSetFunction
                  required
                  constantValues
                />
              </Grid>
              <Grid item xs={3}>
                <CustomSelect
                  name="asal_id"
                  label="Produsen"
                  value={x.asal_id}
                  getValues={x.asal ? (x.asal=='pabrik'?
                    apiGetPabrik : apiGetSupplierOutsource) : null}
                  setValue={handleInputChange}
                  index={i}
                  parentValue={x.asal}
                  customSetFunction
                  required
                  haveParent
                  twoValue
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
        {inputList.map((x, i) => {
          return (
            <Grid
              container
              spacing={2}
              className="packaging-jenis"
              key={i}
            >
              <Grid item xs={4}>
                <TextField
                  className="input-field"
                  placeholder="Produsen"
                  label="Produsen"
                  size="medium"
                  value={x.asal_name}
                  type="text"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={4}>
                <CurrencyTextField
                  label="Harga Per kg"
                  variant="outlined"
                  required
                  value={x.price}
                  currencySymbol="Rp"
                  outputFormat="number"
                  decimalCharacter=","
                  digitGroupSeparator="."
                  onChange={(e, value) =>
                    handlePriceChange(value, i)}
                />
              </Grid>
              <Grid item xs={4}>
                <CurrencyTextField
                  label="Harga Total"
                  variant="outlined"
                  required
                  value={x.harga_total()}
                  currencySymbol="Rp"
                  outputFormat="number"
                  decimalCharacter=","
                  digitGroupSeparator="."
                  disabled
                />
              </Grid>
            </Grid>
          );
        })}
        <DatePicker label="Tanggal" value={date} setValue={setDate} required />
        <Button type="submit" className="align-end btn btn-lg simpan-btn">
          {loading ? <CircularProgress size={20} thickness={5} /> : 'SIMPAN'}
        </Button>
      </Grid>
    </form>
  );
};

export default Packaging;
