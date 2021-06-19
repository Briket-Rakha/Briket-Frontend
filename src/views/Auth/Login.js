// Import Module
import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Checkbox,
  InputLabel,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Import redux action (signIn)
import { signIn } from '../../actions';

// Import styling
import '../../styles/views/login.scss';

// Import Route List
import Routes from '../../router/RouteList';

// Import Component
import CustomAlert from '../../components/Alert';

const Login = (props) => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Redirect to="/" />;
  }

  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error] = useState({
    email: '',
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
    if (!loading) {
      setLoading(true);
      dispatch(signIn(credentials))
          .then((res) => {
            // eslint-disable-next-line react/prop-types
            const { history } = props;
            // eslint-disable-next-line react/prop-types
            history.push(Routes.landing.root);
          })
          .catch((error) => {
            console.log(error);
            setErrorMessage('Login Gagal');
            setOpenAlert(true);
            setLoading(false);
          });
    }
  };

  const { email, password, remember } = credentials;

  return (
    <Grid container className="login">
      {openAlert && (
        <CustomAlert
          type="error"
          message={errorMessage}
          onClose={() => setOpenAlert(false)} />
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
            Sign In
          </Grid>
        </Grid>
        <Grid item className="login-box-field">
          <TextField
            id="email"
            name="email"
            className="login-box-field"
            placeholder="Email*"
            size="small"
            value={email}
            type="text"
            variant="outlined"
            required
            onChange={handleChange}
            helperText={error.email}
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
            {loading ? <CircularProgress size={10} thickness={4} /> : 'SIGN IN'}
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
