// Import Module
import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Checkbox,
  InputLabel,
  Button,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Import redux action (signIn)
import { signIn } from '../../actions/authActions';

// Import styling
import '../../styles/views/login.scss';

const Login = (props) => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Redirect to="/" />;
  }

  const user = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  console.log(user);

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    remember: false,
  });

  const [error] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheck = (e) => {
    setCredentials((prev) => ({
      ...prev,
      remember: e.target.checked,
    }));
  };

  const handleLogin = () => {
    console.log(credentials);
    dispatch(signIn(credentials));
  };

  const { username, password, remember } = credentials;

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
            Sign In
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
            helperText={error.password}
          />
        </Grid>
        <Grid item className="login-box-checkbox">
          <Checkbox
            id="rememberMe"
            value={remember}
            checked={remember}
            color="primary"
            onChange={handleCheck}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <InputLabel htmlFor="rememberMe" className="check-label">
            Remember Me
          </InputLabel>
        </Grid>
        <Grid item className="login-box-button">
          <Button color="primary" onClick={handleLogin} size="small">
            SIGN IN
          </Button>
        </Grid>
        <Grid item className="login-box-no-acc">
          {'Doesn\'t have account?'} <a href="/register">Sign Up Here!</a>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
