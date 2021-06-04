// Import Module
import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import MaterialUiPhoneNumber from 'material-ui-phone-number';

// Import styling
import '../../styles/views/login.scss';

const Register = (props) => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    passConfirm: '',
    phone: '',
  });

  const [error, setError] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
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
    const { password, passConfirm } = credentials;
    console.log(password, passConfirm);
    if (password !== passConfirm) {
      console.log(password, passConfirm);
      setError((prev) => ({
        ...prev,
        password: 'Password dan Konfirmasi Password tidak sama!',
      }));
    }

    console.log(credentials);
    console.log(error);
  };

  const { username, password, email, passConfirm } = credentials;

  return (
    <Grid container className="login">
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
            size="small"
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
            size="small"
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
            size="small"
            placeholder="82288888888"
            variant="outlined"
            defaultCountry={'id'}
            onChange={handlePhone}
          />
        </Grid>
        <Grid item className="login-box-field">
          <TextField
            id="password"
            name="password"
            type="password"
            className="login-box-field"
            placeholder="Password*"
            size="small"
            value={password}
            variant="outlined"
            required
            onChange={handleChange}
          />
        </Grid>
        <Grid item className="login-box-field">
          <TextField
            id="passConfirm"
            name="passConfirm"
            type="password"
            className="login-box-field"
            placeholder="Password Confirmation*"
            size="small"
            value={passConfirm}
            variant="outlined"
            required
            onChange={handleChange}
            helperText={error.password}
          />
        </Grid>
        <Grid item className="login-box-button">
          <Button color="primary" onClick={handleRegister} size="small">
            SIGN IN
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
