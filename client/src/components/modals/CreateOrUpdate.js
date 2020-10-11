import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
// components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
// snackbar
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// apollo
import { useMutation } from '@apollo/client';
import { CREATE_USER, UPDATE_USER, GET_USERS } from '../../graphQl/types';

const CreateOrUpdate = ({handleClose, userData }) => {
  const { enqueueSnackbar } = useSnackbar();
  
  const isUpdateMode = Boolean(Object.keys(userData).length);
  
  const mutationParams = {
    refetchQueries: [
      {
        query: GET_USERS,
      },
    ],
  };

  const [handleCreate] = useMutation(CREATE_USER, mutationParams);
  const [handleUpdate] = useMutation(UPDATE_USER, mutationParams);

  //validation schema
  const schema = yup.object().shape({
    name: yup.string().required('name is required'),
    email: yup.string().email().required('email is required'),
  });

  const { register, errors, handleSubmit, isSubmitting } = useForm({
    resolver: yupResolver(schema),
    shouldUnregister: false,
    defaultValues: {
        name: userData.name || '',
        email: userData.email || '',
    }
  });

  const onCreate = useCallback(async (input) => {
    try {
      await handleCreate({ variables: { input } });
      handleClose();
    } catch (e) {
      enqueueSnackbar(e.message, { 
        variant: 'error',
      })
    }
  }, [handleCreate, handleClose, enqueueSnackbar])

  const onUpdate = useCallback(async (id, input) => {
    try {
      await handleUpdate({ variables: { id, input } });
      handleClose();
    } catch (e) {
      enqueueSnackbar(e.message, { 
        variant: 'error',
      })
    }
  }, [handleUpdate, handleClose, enqueueSnackbar])

  const onSubmit = useCallback((input) => {
    if (isUpdateMode) {
      onUpdate(userData.id, input)
    } else {
      onCreate(input)
    }
  }, [onCreate, onUpdate, isUpdateMode, userData]);
  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
        <DialogTitle id='user-create-or-update-title'>{isUpdateMode ? 'Edit user data' : 'Crete new user' }</DialogTitle>
        <DialogContent dividers>
          <div>
            <TextField
              name="email"
              id='email'
              label='Email'
              margin='normal'
              placeholder='example@gmail.com'
              fullWidth
              inputRef={register}
              error={!!errors?.email}
              helperText={errors?.email?.message}
            />
          </div>
          <div>
            <TextField
              name="name"
              id='name'
              label='Name'
              margin='normal'
              placeholder='Jon Smith'
              fullWidth
              inputRef={register}
              error={!!errors?.name}
              helperText={errors?.name?.message}
            />
          </div>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='primary' disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type='submit' color='primary' autoFocus disabled={isSubmitting}>
            { isUpdateMode ? 'Edit' : 'Create' }
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

CreateOrUpdate.propTypes = {
  userData: PropTypes.object,
  handleClose: PropTypes.func,
};

CreateOrUpdate.defaultProps = {
  userData: {},
  handleClose: () => {},
};

export default CreateOrUpdate;

