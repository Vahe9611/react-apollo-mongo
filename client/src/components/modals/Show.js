import React from 'react';
import PropTypes from 'prop-types';
// components
import CloseIcon from '@material-ui/icons/Close';
import Skeleton from '@material-ui/lab/Skeleton';
import { 
  DialogTitle, DialogContent, 
  DialogActions, Typography, 
  IconButton, Button 
} from '@material-ui/core';
// apollo
import { useQuery } from '@apollo/client'
import {GET_USER} from '../../graphQl/types'
// snackbar
import { useSnackbar } from 'notistack';
// styles
import { withStyles } from '@material-ui/core/styles';

const styles = ({spacing, palette}) => ({
  title: {
    margin: 0,
    padding: spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: spacing(1),
    top: spacing(1),
    color: palette.grey[500],
  },
});

const ShowModal = ({ userId, onClose, classes }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { loading, data } = useQuery(GET_USER, {
    variables: { id: userId },
    onError: (e) => {
      enqueueSnackbar(e.message, { 
        variant: 'error',
      })
    }
  });

  return (
    <div>
      <DialogTitle id="user-show-title" disableTypography className={classes.title}>
        <Typography variant="h6">Show User</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="h4" gutterBottom>
          {loading ? <Skeleton /> : `Name: ${data.user.name}`}
        </Typography>
        <Typography variant="h4" gutterBottom>
          {loading ? <Skeleton /> : `Email: ${data.user.email}`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </div>
  );
}

ShowModal.PropeTypes = {
  userId: PropTypes.any.isRequired,
  onClose: PropTypes.func,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShowModal);