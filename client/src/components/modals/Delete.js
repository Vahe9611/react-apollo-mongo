import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
// components
import { DialogTitle, DialogActions, Typography, Button } from '@material-ui/core';
// apollo
import { useMutation } from '@apollo/client'
import { DELETE_USER, GET_USERS } from '../../graphQl/types'
// snackbar
import { useSnackbar } from 'notistack';
// styles
import { withStyles } from '@material-ui/core/styles';

const styles = ({spacing}) => ({
  title: {
    margin: 0,
    padding: spacing(2),
  },
});

const DeleteModal = ({user, handleClose, classes}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [handleDelete] = useMutation(DELETE_USER, {
    refetchQueries: [
      {
        query: GET_USERS,
      },
    ],
    onError: (e) => {
      enqueueSnackbar(e.message, { 
        variant: 'error',
      })
    }
  });

  const handleApprove = useCallback(() => {
    const { id } = user;
    handleDelete({ variables: { id } });
    handleClose()
  }, [handleDelete, handleClose, user])

  return (
    <div>
      <DialogTitle id="user-delete-title" disableTypography className={classes.title}>
        <Typography variant="h6">Delete User {user.name}</Typography>
      </DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button autoFocus onClick={handleApprove} color="secondary">
          Approve
        </Button>
      </DialogActions>
    </div>
  );
}

DeleteModal.PropeTypes = {
  user: PropTypes.isRequired,
  handleClose: PropTypes.func,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeleteModal);