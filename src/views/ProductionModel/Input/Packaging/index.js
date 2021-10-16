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
      package_name: '',
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

  // get producer name by its id
  const getProducerName = async (idx, asal, asalID) => {
    if (!loading) {
      setLoading(true);
      await (asal === 'pabrik' ? apiGetPabrik() : apiGetSupplierOutsource() )
          .then((res) => {
            const data = res?.response?.data.data || res?.data.data;
            setLoading(false);

            data.map( ({ id, name }) => {
              if (id === asalID) {
                const list = [...inputList];
                list[idx].asal_name = name;
                setInputList(list);
              }
            });
          })
          .catch((err) => {
            setErrorMessage(err?.message ? err.message : 'Server Error');
            setLoading(false);
          });
    }
  };

  // get package type name by its id
  const getPackagingTypeName = async (idx, packagingTypeID) => {
    if (!loading) {
      setLoading(true);
      await ( apiGetPackaging() )
          .then((res) => {
            const data = res?.response?.data.data || res?.data.data;
            setLoading(false);

            data.map( ({ id, name }) => {
              if (id === packagingTypeID) {
                const list = [...inputList];
                list[idx].package_name = name;
                setInputList(list);
              }
            });
          })
          .catch((err) => {
            setErrorMessage(err?.message ? err.message : 'Server Error');
            setLoading(false);
          });
    }
  };

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
      package_name: '',
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
    if ( name === 'asal_id' ) {
      list[index].asal_id = value;
      getProducerName(index, inputList[index].asal, inputList[index].asal_id);
    } else {
      list[index][name] = value;
    }

    if ( name === 'asal' ) {
      list[index].asal_name = '';
      list[index].asal_id = '';
    }

    if ( name === 'package_id' ) {
      list[index].package_name = '';
      getPackagingTypeName(index, inputList[index].package_id);
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
        package_name: '',
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
      name: 'Factory Production',
      value: 'Produksi',
    },
    {
      id: 'outsource',
      name: 'Outsource Production',
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
      <h3 className="packaging-title">Packaging Input</h3>
      <Grid container className="packaging-form" direction="column">
        <TextField
          id="containerNumber"
          name="containerNumber"
          className="input-field"
          placeholder="Please enter the container number"
          label="Container Number"
          size="medium"
          value={containerNumber}
          type="text"
          variant="outlined"
          required
          onChange={(e) => setContainerNumber(e.target.value)}
        />
        <CustomSelect
          label="Charcoal Brand"
          value={brand}
          getValues={apiGetBrand}
          setValue={setBrand}
          required
        />
        <p className="packaging-text">
            Packaging Amount and Type*
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
                  label="Packaging Type"
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
                  placeholder="Please enter the amount in kg"
                  label="Amount"
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
                  label="Producer Type"
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
                  label="Producer"
                  value={x.asal_id}
                  getValues={x.asal ? (x.asal === 'pabrik'?
                    apiGetPabrik : apiGetSupplierOutsource) : null}
                  setValue={handleInputChange}
                  index={i}
                  parentValue={x.asal}
                  customNoData={'Select Producer Type First'}
                  customSetFunction
                  required
                  haveParent
                />
              </Grid>
            </Grid>
          );
        })}
        <Button
          className="align-end btn tambah-item-btn"
          onClick={handleAddClick}
        >
              Add Packaging
        </Button>
        {inputList.map((x, i) => {
          return (
            <Grid
              container
              spacing={2}
              className="packaging-jenis"
              key={i}
            >
              <Grid item xs={3}>
                <TextField
                  className="input-field"
                  placeholder="Producer"
                  label="Producer"
                  size="medium"
                  value={x.asal_name}
                  type="text"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={3} className="packaging-jenis-item">
                <TextField
                  className="input-field"
                  placeholder="Packaging Type"
                  label="Packaging Type"
                  size="medium"
                  value={x.package_name}
                  type="text"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={3}>
                <CurrencyTextField
                  label="Price Per kg"
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
              <Grid item xs={3}>
                <CurrencyTextField
                  label="Total Price"
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
        <DatePicker label="Date" value={date} setValue={setDate} required />
        <Button type="submit" className="align-end btn btn-lg simpan-btn">
          {loading ? <CircularProgress size={20} thickness={5} /> : 'SUBMIT'}
        </Button>
      </Grid>
    </form>
  );
};

export default Packaging;
