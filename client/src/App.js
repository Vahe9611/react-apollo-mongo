import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
// components
import CreateOrUpdate from './components/modals/CreateOrUpdate';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import UserTable from 'components/UserTable';
import Dialog from '@material-ui/core/Dialog';
import Fade from '@material-ui/core/Fade';
// styles
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const App = ({ classes }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const onClickEdit = useCallback(user => {
    setSelectedUser(user);
    setShowModal(true);
  }, []);

  const onClickCreateUser = useCallback(() => {
    setSelectedUser({});
    setShowModal(true);
  }, []);

  return (
    <div className={ classes.root }>
      <Dialog
        aria-labelledby="user-create-or-update-title"
        disableBackdropClick
        className={classes.modal}
        open={showModal}
        onClose={handleClose}
        fullWidth={true}
        maxWidth='xs'
      >
        <Fade in={showModal}>
          <CreateOrUpdate userData={selectedUser} handleClose={handleClose} />
        </Fade>
      </Dialog>

      <Container>
        <Grid container spacing={ 3 } justify='center'>
          <Grid key={ 1 } item xs={ 11 } className={ classes.header }>
            <Button variant='contained' color='secondary' onClick={ onClickCreateUser }>
              Add new user
            </Button>
          </Grid>
          <Grid key={ 2 } item xs={ 11 }>
            <UserTable onClickEdit={ onClickEdit }/>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired
} 

export default withStyles(styles)(App);
