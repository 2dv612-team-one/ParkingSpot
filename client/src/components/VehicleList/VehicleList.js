import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Avatar, Grid, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import LocalParking from '@material-ui/icons/LocalParking';

import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';

import { getCars, deleteCar, addCar, parkCar, unparkCar } from '../../actions/vehicle';
import { getAreas } from '../../actions/parkingArea';
import VehicleModal from '../VehicleModal/VehicleModal';
import { openModal } from '../../actions/modal';
import { VEHICLE_MODAL } from '../../constants/environment';
import styles from '../../assets/styles/vehicle-list';


const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  vehicles: state.vehicle.data,
  areas: state.parkingArea.data,
  shouldUpdate: state.vehicle.update,
  shouldFetch: state.vehicle.fetch,
  role: state.authentication.role
});

const mapDispatchToProps = dispatch => ({
  // TODO: only load vehicles accessible to the user
  loadCars: () => dispatch(getCars()),
  loadAreas: () => dispatch(getAreas()),
  openVehicleModal: (props) => dispatch(openModal(VEHICLE_MODAL, props)),
  deleteCar: (accessToken, registrationNumber) => dispatch(deleteCar(accessToken, registrationNumber)),
  addCar: (accessToken, registrationNumber) => dispatch(addCar(accessToken, registrationNumber)),
  parkCar: (accessToken, registrationNumber, areaID) => dispatch(parkCar(accessToken, registrationNumber, areaID)),
  unparkCar: (accessToken, areaID) => dispatch(unparkCar(accessToken, areaID))
});

class VehicleList extends Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handlePark = this.handlePark.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.shouldUpdate && nextProps.shouldUpdate || !this.props.shouldFetch && nextProps.shouldFetch) {
      this.props.loadCars();
      this.props.loadAreas();
    }
  }

  componentWillMount() {
    this.props.loadCars();
    this.props.loadAreas();
  }

  handleDelete = (registrationNumber) => {
    const { accessToken, deleteCar } = this.props;
    deleteCar(accessToken, registrationNumber);
  };

  handleAdd = () => {
    const { addCar, openVehicleModal } = this.props;
    const props = {onSubmit: addCar, submitPrompt: "Lägg till", registrationNumber: 'XXX000'}
    openVehicleModal(props)
  };

  handlePark = (vehicle, areaID) => {
    const { accessToken, parkCar, unparkCar } = this.props
    this.setState({[vehicle.registrationNumber]: {open: false}});

    if (areaID) {
      parkCar(accessToken, vehicle.registrationNumber, areaID);
    } else if (vehicle.parked_at) {
      unparkCar(accessToken, vehicle.parked_at.id)
    }
  }

  handleDialogOpen = (vehicle) => {
    this.setState({ [vehicle.registrationNumber]: { open: true }});
  };

  handleDialogClose = (vehicle) => {
    this.setState({ [vehicle.registrationNumber]: { open: false }});
  };

  render() {
    const { classes, vehicles, areas, role } = this.props;

    return (
      <div>
        { role === "ROLE_USER" ?
          <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
              Bilar
              <IconButton aria-label="Add" onClick={() => this.handleAdd()}>
                <AddIcon />
              </IconButton>
              <VehicleModal />
          </Typography>
          <div className={classes.demo}>
            <List> {vehicles && vehicles.map(vehicle => (
              <div>
              <ListItem onClick={() => this.handleDialogOpen(vehicle)}>
                <ListItemAvatar>
                  <Avatar>
                    <DirectionsCar />
                  </Avatar>
                </ListItemAvatar>
                {vehicle.parked_at && <ListItemAvatar>
                  <Avatar>
                    <LocalParking />
                  </Avatar>
                </ListItemAvatar>}
                <ListItemText
                  key={vehicle.id}
                  primary={vehicle.registrationNumber}
                  secondary={vehicle.parked_at ? areas.filter(area => area.parked_at && (area.parked_at.id === vehicle.parked_at.id)).map((area) => `${area.name + " (" + area.coord1 + ","+ area.coord2 + ","+ area.coord3 + ","+ area.coord4 + ") : "}` + `${area.rates.map(rate => 
                    rate.rate_from +
                    ":00 - " +
                    rate.rate_to +
                    ":00 " +
                    rate.rate + " kr/h\n")}`) : 'Inte parkerad'}
                />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Delete" onClick={() => this.handleDelete(vehicle.registrationNumber)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <ConfirmationDialog
                classes={{
                  paper: classes.paper,
                }}
                open={this.state[vehicle.registrationNumber] && this.state[vehicle.registrationNumber].open}
                title={'Välj parkeringsplats'}
                onConfirm={(value) => this.handlePark(vehicle, value)}
                onClose={() => this.handleDialogClose(vehicle)}
                options={areas.length > 0 ? areas.map((area) => {
                  return {  value: area.id.toString(), 
                            disabled: (!!area.parked_at && (!vehicle.parked_at || (area.parked_at.id !== vehicle.parked_at.id))),
                            label: area.name + " (" + area.coord1 + ","+ area.coord2 + ","+ area.coord3 + ","+ area.coord4 + ") : " +
                            `${area.rates.map(rate => 
                              rate.rate_from +
                              ":00 - " +
                              rate.rate_to +
                              ":00 " +
                              rate.rate + " kr/h")}`
                          }
                  }).concat([{value: '', label: 'Ingen parkering'}]) : [{value: '', label: 'Ingen parkering'}]
                }
                value={(areas.filter(area => (area.parked_at && vehicle.parked_at) && (area.parked_at.id === vehicle.parked_at.id)))[0] ? (areas.filter(area => (area.parked_at && vehicle.parked_at) && (area.parked_at.id === vehicle.parked_at.id)))[0].id : ''}
            />
            </div>
            ))}
            </List>
          </div>
        </Grid> : null }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VehicleList));
