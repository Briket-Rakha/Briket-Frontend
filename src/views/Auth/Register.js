// Import Module
import React, { useState } from 'react';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import MaterialUiPhoneNumber from 'material-ui-phone-number';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// Import Component
import CustomAlert from '../../components/Alert';

// Import styling
import '../../styles/views/login.scss';

// Import Route List
import Routes from '../../router/RouteList';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const Register = (props) => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Redirect to="/" />;
  }

  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
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

  const handleRegister = () => {
    const { password, confirmPassword } = credentials;
    const keys = Object.keys(credentials);

    if (!loading) {
      setLoading(true);
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
        axios
            .post(`${apiBaseUrl}/user/register`, credentials)
            .then((res) => {
              // eslint-disable-next-line react/prop-types
              props.history.push(Routes.login.root);
            })
            .catch((err) => {
              console.log(err);
              setErrorMessage('User is already registered!');
              setOpenAlert(true);
            });
      }

      setLoading(false);
    }
  };

  const { username, password, email, confirmPassword } = credentials;

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
            {loading ? <CircularProgress size={15} thickness={5} /> : 'SIGN UP'}
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
