import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Paper, Button, Table, TableHead, TableBody, TableRow, TableCell, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HideIcon from '@material-ui/icons/Remove';
import SaveIcon from '@material-ui/icons/Save';

import { getRoles } from '../../actions/userControl';


const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  role: state.authentication.role,
  roles: state.userController.roles,
});

const mapDispatchToProps = dispatch => ({ 
  onLoad: (accessToken) => dispatch(getRoles(accessToken)),
});

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

class AdminUserControl extends Component {
  componentWillMount() {
    const { onLoad } = this.props;
    const { accessToken } = this.props;
    onLoad(accessToken);
  }

  render() {
    const { classes } = this.props;
    const { role } = this.props;
    const { roles } = this.props;
    debugger;
    return(

      <div className="add-user-btn">
      {       
        role === "ROLE_ADMIN" ? 
        <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Roles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles && roles.map(role => (
              <TableRow key={role.name}>
                <TableCell>{role.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper> :
        null
      }
      </div>
    
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminUserControl));
