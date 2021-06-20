/* eslint-disable require-jsdoc */
// Import Library
import React from 'react';
import { Modal, Backdrop, Grid, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';

// Import Styling
import '../../styles/components/modal.scss';

export default function CustomModal(props) {
  const { title, open, setOpen, children } = props;

  return (
    <Modal
      className="custom-modal"
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      disableEnforceFocus
      BackdropComponent ={Backdrop}
    >
      <Paper elevation={2} className="custom-modal-wrapper">
        {title &&(
          <Grid item className="custom-modal-title">
            <h3>{title}</h3>
            <br />
          </Grid>
        )}
        <br />
        {children}
      </Paper>
    </Modal>
  );
}

CustomModal.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool.isRequired,
  children: PropTypes.any,
  setOpen: PropTypes.func.isRequired,
};
