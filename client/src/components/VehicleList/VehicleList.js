import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, withStyles } from '@material-ui/core';

import { getCars } from '../../actions/vehicle';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  vehicles: state.vehicle.data,
});

const mapDispatchToProps = dispatch => ({
  // TODO: only load vehicles accessible to the user
  onLoad: () => dispatch(getCars()),
});

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

// TODO: Make vehicle list update after adding or removing a car
class VehicleList extends Component {
  componentWillMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  render() {
    const { classes, vehicles } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Registreringsnummer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles && vehicles.map(vehicle => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.registrationNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VehicleList));
