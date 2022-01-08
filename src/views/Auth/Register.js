// Import Module
import React, { useState } from 'react';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import MaterialUiPhoneNumber from 'material-ui-phone-number';
import { Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Import Component
import CustomAlert from '../../components/Alert';

// Import styling
import '../../styles/views/login.scss';

// Import Route List
import Routes from '../../router/RouteList';

// Import API
import { apiPostRegister } from 'api/auth.api';
import { login } from 'redux/actions/authActions';

const Register = (props) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    return <Redirect to="/" />;
  }

  const history = useHistory();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [error, setError] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhone = (value) => {
    setCredentials((prev) => ({
      ...prev,
      phone: value,
    }));
  };


  const handleRegister = async () => {
    const { password, confirmPassword } = credentials;
    const keys = Object.keys(credentials);
    if (!loading) {
      setLoading((prev) => !prev);
      keys.forEach((key) => {
        if (!credentials[key].length) {
          setError((prev) => ({
            ...prev,
            [key]: `Field mustn't be empty!`,
          }));
        }
      });

      if (password !== confirmPassword) {
        setError((prev) => ({
          ...prev,
          confirmPassword: 'Password and Password Confirmation aren\'t match!',
        }));
      }

      const isValid = Object
          .values(credentials)
          .every((x) => x !== '');

      if (isValid) {
        await apiPostRegister(credentials)
            .then(() => {
              dispatch(login(credentials)).then(() => {
                history.push(Routes.production.dashboard);
              }).catch((err) => {
                throw err;
              });
            })
            .catch((err) => {
              setErrorMessage(err?.data?.msg || 'An error has occured!');
              setOpenAlert(true);
            });
      }

      setLoading(false);
    }
  };

  const { username, password, email, firstName, lastName, confirmPassword } = credentials;

  return (
    <Grid container className="login">
      {openAlert && (
        <CustomAlert
          type="error"
          message={errorMessage}
          onClose={() => setOpenAlert(false )} />
      )}
      <Grid item className="login-box">
        <Grid item className="login-box-header">
          <Grid item className="login-box-logo">
            <img
              src={`${process.env.PUBLIC_URL}/images/logo-text.jpg`}
              alt="Sign In Logo"
            />
          </Grid>
          <Grid item className="login-box-title">
            Sign Up
          </Grid>
        </Grid>
        <Grid item className="login-box-field">
          <TextField
            id="username"
            name="username"
            className="login-box-field"
            placeholder="Username*"
            size="medium"
            value={username}
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
            helperText={error.username}
          />
        </Grid>
        <Grid item className="login-box-field">
          <TextField
            id="email"
            name="email"
            className="login-box-field"
            placeholder="Email*"
            size="medium"
            value={email}
            type="email"
            variant="outlined"
            required
            onChange={handleChange}
            helperText={error.email}
          />
        </Grid>
        <Grid container spacing={2} style={{ padding: '10px 0' }}>
          <Grid item md={6}>
            <TextField
              id="firstName"
              name="firstName"
              className="login-box-field"
              placeholder="First Name*"
              size="medium"
              value={firstName}
              type="text"
              variant="outlined"
              required
              onChange={handleChange}
              helperText={error.firstName}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              id="lastName"
              name="lastName"
              className="login-box-field"
              placeholder="Last Name*"
              size="medium"
              value={lastName}
              type="text"
              variant="outlined"
              required
              onChange={handleChange}
              helperText={error.firstName}
            />
          </Grid>
        </Grid>
        <Grid item className="login-box-field">
          <MaterialUiPhoneNumber
            regions={['america', 'asia', 'europe']}
            size="medium"
            variant="outlined"
            defaultCountry={'id'}
            onChange={handlePhone}
            helperText={error.phone}
          />
        </Grid>
        <Grid item className="login-box-field">
          <TextField
            id="password"
            name="password"
            type="password"
            className="login-box-field"
            placeholder="Password*"
            size="medium"
            value={password}
            variant="outlined"
            required
            onChange={handleChange}
            helperText={error.password}
          />
        </Grid>
        <Grid item className="login-box-field">
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="login-box-field"
            placeholder="Password Confirmation*"
            size="medium"
            value={confirmPassword}
            variant="outlined"
            required
            onChange={handleChange}
            helperText={error.confirmPassword}
          />
        </Grid>
        <Grid item className="login-box-button">
          <Button color="primary" onClick={handleRegister} size="small">
            {loading ? <CircularProgress size={20} thickness={5} /> : 'SIGN UP'}
          </Button>
        </Grid>
        <Grid item className="login-box-no-acc">
          {'Already have account?'} <a href="/Login">Sign In Here!</a>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Register;
