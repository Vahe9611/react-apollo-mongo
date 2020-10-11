import React from 'react';
import PropTypes from 'prop-types';
// components
import Paper from '@material-ui/core/Paper';
import UserTableCell from './UserTableCell'
import Dialog from '@material-ui/core/Dialog';
import Fade from '@material-ui/core/Fade';
import ShowModal from '../components/modals/Show';
import DeleteModal from '../components/modals/Delete';
import { Alert, AlertTitle } from '@material-ui/lab';
import Loading from './Loading';
import {
  TableContainer, Table, TableBody, 
  TableHead, TablePagination, TableRow, 
  TableCell
} from '@material-ui/core'
// apollo
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../graphQl/types'
// styles
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  row: {
    cursor: 'pointer'
  }
};

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'action', label: 'Actions', minWidth: 100, align: 'center' },
];

const UserTable  = ({ onClickEdit, classes })  => {
  const [page, setPage] = React.useState(0);
  const [currentUser, setCurrentUser] = React.useState({});
  const [showUser, setShowUser] = React.useState(false);
  const [deleteUser, setDeleteUser] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { loading, error, data } = useQuery(GET_USERS);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditAction = (event, row) => {
    event.stopPropagation();
    onClickEdit(row)
  }

  const handleShowUser = (user) => {
    setCurrentUser(user)
    setShowUser(true)
  }

  const handleHideUser = () => {
    setShowUser(false)
  }

  const handleDeleteAction = (event, user) => {
    event.stopPropagation();
    setCurrentUser(user)
    setDeleteUser(true)
  }

  const handleCloseDeleteModal = () => {
    setDeleteUser(false)
  }

  if (error) return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {error}
    </Alert>
  )

  return (
    <>
      <Dialog
        aria-labelledby="user-show-title"
        className={classes.modal}
        open={showUser}
        onClose={handleHideUser}
      >
        <Fade in={showUser}>
          <ShowModal userId={currentUser.id} onClose={handleHideUser} />
        </Fade>
      </Dialog>

      <Dialog
        aria-labelledby="user-delete-title"
        disableBackdropClick
        className={classes.modal}
        open={deleteUser}
        onClose={handleCloseDeleteModal}
      >
        <Fade in={deleteUser}>
          <DeleteModal user={currentUser} handleClose={handleCloseDeleteModal} />
        </Fade>
      </Dialog>

      {
        loading ? <Loading /> 
        : <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow className={classes.row} onClick={() => handleShowUser(row)} hover role='checkbox' tabIndex={-1} key={row.id}>
                      {columns.map((column) => (
                        <UserTableCell 
                          key={column.id} 
                          column={column} 
                          row={row} 
                          handleEditAction={handleEditAction} 
                          handleDeleteAction={handleDeleteAction} 
                        />
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={data.users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      }
    </>
  );
};

UserTable.PropeTypes = {
  onClickEdit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserTable);
