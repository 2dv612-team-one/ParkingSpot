import React, { Component } from 'react';
import { connect } from 'react-redux';
import ol from 'openlayers';

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
import { setUserPosition, notifyOutsideArea } from '../../actions/location';
import { VEHICLE_MODAL } from '../../constants/environment';
import styles from '../../assets/styles/vehicle-list';


const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  vehicles: state.vehicle.data,
  areas: state.parkingArea.data,
  shouldUpdate: state.vehicle.update,
  shouldFetch: state.vehicle.fetch,
  role: state.authentication.role,
  position: state.authentication.position,
});

const mapDispatchToProps = dispatch => ({
  // TODO: only load vehicles accessible to the user
  loadCars: () => dispatch(getCars()),
  loadAreas: () => dispatch(getAreas()),
  openVehicleModal: props => dispatch(openModal(VEHICLE_MODAL, props)),
  deleteCar: (accessToken, registrationNumber) => dispatch(deleteCar(accessToken, registrationNumber)),
  addCar: (accessToken, registrationNumber) => dispatch(addCar(accessToken, registrationNumber)),
  parkCar: (accessToken, registrationNumber, areaID) => dispatch(parkCar(accessToken, registrationNumber, areaID)),
  unparkCar: (accessToken, areaID) => dispatch(unparkCar(accessToken, areaID)),
  setUserPosition: location => dispatch(setUserPosition(location)),
  notifyOutsideArea: () => dispatch(notifyOutsideArea()),
});

class VehicleList extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handlePark = this.handlePark.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
  }

  componentWillMount() {
    const { loadCars, loadAreas } = this.props;
    loadCars();
    loadAreas();
  }
  
  componentDidMount() {
    const { role } = this.props;
    if (role === 'ROLE_USER') {
      this.trackUserPosition();
    }
  }

  // TODO: This is unreadable
  componentWillReceiveProps(nextProps) {
    const {
      position,
      role,
      areas,
      vehicles,
      loadCars,
      loadAreas,
      shouldUpdate,
      shouldFetch,
      notifyOutsideArea,
    } = this.props;

    if ((!shouldUpdate && nextProps.shouldUpdate) || (!shouldFetch && nextProps.shouldFetch)) {
      loadCars();
      loadAreas();
    }

    if ((position !== null || position !== nextProps.position) && (areas.length > 0 || nextProps.areas.length > 0) && role === 'ROLE_USER') {
      areas.forEach((a) => {
        vehicles.forEach((v) => {
          if (a.parked_at !== null && v.parked_at !== null) {
            if (a.parked_at.id === v.parked_at.id) {
              const area = new ol.format.WKT().readFeature(a.wkt);
              const userPos = new ol.format.WKT().readFeature(nextProps.position);
  
              const polygonGeometry = area.getGeometry();
              const coords = userPos.getGeometry().getCoordinates();
              const coordinate = ol.proj.fromLonLat([coords[0], coords[1]]);

              const isWhitinArea = ol.extent.containsXY(polygonGeometry.getExtent(), coordinate[0], coordinate[1]);

              if (!isWhitinArea) {
                notifyOutsideArea();
              }
            }
          }
        });
      });
    }
  }

  handleDelete = (registrationNumber) => {
    const { accessToken, deleteCar } = this.props;
    deleteCar(accessToken, registrationNumber);
  };

  handleAdd = () => {
    const { addCar, openVehicleModal } = this.props;
    const props = { onSubmit: addCar, submitPrompt: 'Lägg till', registrationNumber: 'XXX000' };
    openVehicleModal(props);
  };

  handlePark = (vehicle, areaID) => {
    const { accessToken, parkCar, unparkCar } = this.props;
    this.setState({ [vehicle.registrationNumber]: { open: false } });

    if (areaID) {
      parkCar(accessToken, vehicle.registrationNumber, areaID);
    } else if (vehicle.parked_at) {
      unparkCar(accessToken, vehicle.parked_at.id);
    }
  }

  handleDialogOpen = (vehicle) => {
    this.setState({ [vehicle.registrationNumber]: { open: true } });
  };

  handleDialogClose = (vehicle) => {
    this.setState({ [vehicle.registrationNumber]: { open: false } });
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.id);
  }

  // TODO: Make this more readable
  trackUserPosition() {
    let { setUserPosition } = this.props;
    setUserPosition = setUserPosition.bind(this);
    this.options = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 0,
    };

    // WARN clearWatch may stop the tracking of the users
    // Using clearwatch is best practice though
    function success(pos) {
      setUserPosition(`POINT (${pos.coords.longitude} ${pos.coords.latitude})`);
      navigator.geolocation.clearWatch(this.id);
    }
    function error() {
      navigator.geolocation.clearWatch(this.id);
    }

    if (typeof navigator.geolocation === 'object' && typeof navigator.geolocation.watchPosition === 'function') {
      this.id = navigator.geolocation.watchPosition(success.bind(this), error.bind(this), this.options);
    }
  }

  render() {
    const { classes, vehicles, areas, role } = this.props;

    return (
      <div>
        { role === 'ROLE_USER'
          ? (
            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={classes.title}>
              Bilar
                <IconButton aria-label="Add" onClick={() => this.handleAdd()}>
                  <AddIcon />
                </IconButton>
                <VehicleModal />
              </Typography>
              <div className={classes.demo}>
                <List>
                  {' '}
                  {vehicles && vehicles.map(vehicle => (
                    <div>
                      <ListItem onClick={() => this.handleDialogOpen(vehicle)}>
                        <ListItemAvatar>
                          <Avatar>
                            <DirectionsCar />
                          </Avatar>
                        </ListItemAvatar>
                        {vehicle.parked_at && (
                        <ListItemAvatar>
                          <Avatar>
                            <LocalParking />
                          </Avatar>
                        </ListItemAvatar>
                        )}
                        <ListItemText
                          key={vehicle.id}
                          primary={vehicle.registrationNumber}
                          secondary={vehicle.parked_at ? (areas.filter(area => (area.parked_at && area.parked_at.id === vehicle.parked_at.id)).map(area => `${area.name} : ${area.rates.map(rate  => `${rate.rate_from}:00 - ${rate.rate_to}:00 ${rate.rate} kr/h\n`)}`)) : 'Inte Parkerad'}
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
                        title="Välj parkeringsplats"
                        onConfirm={value => this.handlePark(vehicle, value)}
                        onClose={() => this.handleDialogClose(vehicle)}
                        options={areas.length > 0 ? areas.map(area => ({ value: area.id.toString(),
                          disabled: (!!area.parked_at && (!vehicle.parked_at || (area.parked_at.id !== vehicle.parked_at.id))),
                          label: `${area.name} : `
                            + `${area.rates.map(rate => `${rate.rate_from
                            }:00 - ${
                              rate.rate_to
                            }:00 ${
                              rate.rate} kr/h`)}`,
                        })).concat([{ value: '', label: 'Ingen parkering' }]) : [{ value: '', label: 'Ingen parkering' }]
                }
                        value={(areas.filter(area => (area.parked_at && vehicle.parked_at) && (area.parked_at.id === vehicle.parked_at.id)))[0] ? (areas.filter(area => (area.parked_at && vehicle.parked_at) && (area.parked_at.id === vehicle.parked_at.id)))[0].id : ''}
                      />
                    </div>
                  ))}
                </List>
              </div>
            </Grid>
          ) : null }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VehicleList));
