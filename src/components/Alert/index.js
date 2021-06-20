/* eslint-disable require-jsdoc */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    'width': '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function CustomAlert(props) {
  const classes = useStyles();
  const { type, message, onClose } = props;

  return (
    <div className={classes.root}>
      <Alert variant="filled" severity={type} onClose={onClose}>
        {message}
      </Alert>
    </div>
  );
}

CustomAlert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default CustomAlert;
