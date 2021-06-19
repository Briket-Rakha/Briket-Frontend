/* eslint-disable react/prop-types */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    padding: '5px',
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


// eslint-disable-next-line require-jsdoc
function Modal(props) {
  const { modal, setModal } = props;

  const isOpen = Boolean(modal);

  return (
    <div>
      <Dialog
        onClose={() => setModal(false)}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogTitle onClose={() => setModal(false)}>
          {modal?.title}
        </DialogTitle>
        <DialogContent dividers>
          {modal?.description}
        </DialogContent>
      </Dialog>
    </div>
  );
}
Modal.propTypes = {
  modal: PropTypes.any.isRequired,
  setModal: PropTypes.func.isRequired,
};

export default Modal;
