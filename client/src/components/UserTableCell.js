import React from 'react';
import PropTypes from 'prop-types';
// components
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import TableCell from '@material-ui/core/TableCell';
// styles
import { withStyles } from '@material-ui/core/styles';

const styles = {
  deleteIcon: {
    background: 'red',
    marginLeft: '8px',
  }
};

const UserTableCell = ({ classes, column, row, handleEditAction, handleDeleteAction}) => {
  if (column.id === 'action') {
    return (
      <TableCell key={column.id} align={column.align}>
        <Tooltip title='Edit' placement='top'>
          <Fab 
            size='medium' 
            color='secondary' 
            aria-label='edit' 
            onClick={(e) => handleEditAction(e, row)}
          >
            <EditIcon />
          </Fab>
        </Tooltip>
        <Tooltip title='Delete' placement='top'>
          <Fab 
            size='medium' 
            classes={{
              root: classes.deleteIcon
            }}
            color='primary' 
            aria-label='delete' 
            onClick={(e) => handleDeleteAction(e, row)}
          >
            <DeleteIcon />
          </Fab>
        </Tooltip>
      </TableCell>
    )
  }

  return (
    <TableCell key={column.id} align={column.align}>
      { row[column.id] }
    </TableCell>
  );
}

UserTableCell.propTypes = {
  column: PropTypes.object.isRequired,
  row: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  handleEditAction: PropTypes.func.isRequired,
  handleDeleteAction: PropTypes.func.isRequired,
}

export default withStyles(styles)(UserTableCell);
