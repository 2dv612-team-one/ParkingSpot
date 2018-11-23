import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, withStyles } from '@material-ui/core';

import { getCars } from '../../actions/vehicle'

const mapStateToProps = state => ({
    accessToken: state.authentication.accessToken,
    vehicles: state.vehicle.data,
});

const mapDispatchToProps = dispatch => ({
    // TODO: only load vehicles accessible to the user
    onLoad: () => dispatch(getCars()),
})

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

class VehicleList extends Component {
    componentWillMount() {
        this.props.onLoad();
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
                {vehicles && vehicles.map(vehicle => {
                  return (
                    <TableRow key={vehicle.id}>
                      <TableCell>{vehicle.registrationNumber}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
          );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VehicleList));