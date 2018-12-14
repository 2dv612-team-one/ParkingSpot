import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Avatar, Button, Grid, withStyles } from '@material-ui/core';
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
    this.state = {
      showMenu: null,
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.update && nextProps.update) {
      this.props.onLoad();
    }
  }


  componentWillMount() {
    const { onLoad } = this.props;
    onLoad();

  }

  handleClick = (e) => {
    this.setState({ showMenu: e.currentTarget });
  };


  handleClose = () => {
    this.setState({ showMenu: null });
  };


  handleDelete = (registrationNumber) => {

    const { accessToken, deleteCar } = this.props;

    deleteCar(accessToken, registrationNumber);
    this.handleClose();
  };


  render() {
    const { classes, vehicles } = this.props;
    const { showMenu } = this.state;

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
