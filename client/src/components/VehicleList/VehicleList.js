import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Avatar, Grid, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { getCars, deleteCar } from '../../actions/vehicle';
import styles from '../../assets/styles/vehicle-list';
import DirectionsCar from '@material-ui/icons/DirectionsCar';


const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  vehicles: state.vehicle.data,
  shouldUpdate: state.vehicle.update,
  role: state.authentication.role
});

const mapDispatchToProps = dispatch => ({
  // TODO: only load vehicles accessible to the user
  onLoad: () => dispatch(getCars()),
  deleteCar: (accessToken, registrationNumber) => dispatch(deleteCar(accessToken, registrationNumber)),
});


// TODO: Make vehicle list update after adding or removing a car
class VehicleList extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.shouldUpdate && nextProps.shouldUpdate) {
      this.props.onLoad();
    }
  }

  componentWillMount() {
    this.props.onLoad();
  }

  handleDelete = (registrationNumber) => {
    const { accessToken, deleteCar } = this.props;
    deleteCar(accessToken, registrationNumber);
  };

  render() {
    const { classes, vehicles, role } = this.props;

    return (
        <div>
          { role === "ROLE_USER" ?
            <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
                Registreringsnummer
            </Typography>
              <div className={classes.demo}>
                <List> {vehicles && vehicles.map(vehicle => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <DirectionsCar />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      key={vehicle.id}
                      primary={vehicle.registrationNumber}
                    />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete" onClick={() => this.handleDelete(vehicle.registrationNumber)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                </List>
              </div>
            </Grid> : null
          }
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VehicleList));
