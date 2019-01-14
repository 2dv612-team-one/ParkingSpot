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

import { getUserCars, deleteCar, addCar } from '../../actions/vehicle';
import { getParkings, parkCar, unparkCar } from '../../actions/parking';
import { getAreas } from '../../actions/parkingArea';
import VehicleModal from '../VehicleModal/VehicleModal';
import { openModal } from '../../actions/modal';
import { setUserPosition, notifyOutsideArea } from '../../actions/location';
import { VEHICLE_MODAL } from '../../constants/environment';
import styles from '../../assets/styles/vehicle-list';

function toRad(x) { return x * Math.PI / 180; }

function SphericalCosinus(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);
  const d = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon)) * R;

  return d;
}

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  vehicles: state.vehicle.data,
  areas: state.parkingArea.data,
  parkings: state.parking.data,
  shouldUpdate: state.vehicle.update,
  shouldFetch: state.vehicle.fetch,
  role: state.authentication.role,
  position: state.authentication.position,
});

const mapDispatchToProps = dispatch => ({
  // TODO: only load vehicles accessible to the user
  loadCars: (accessToken) => dispatch(getUserCars(accessToken)),
  loadAreas: () => dispatch(getAreas()),
  loadParkings: () => dispatch(getParkings()),
  openVehicleModal: props => dispatch(openModal(VEHICLE_MODAL, props)),
  deleteCar: (accessToken, registrationNumber) => dispatch(deleteCar(accessToken, registrationNumber)),
  addCar: (accessToken, registrationNumber) => dispatch(addCar(accessToken, registrationNumber)),
  parkCar: (accessToken, registrationNumber, areaID) => dispatch(parkCar(accessToken, registrationNumber, areaID)),
  unparkCar: (accessToken, areaID) => dispatch(unparkCar(accessToken, areaID)),
  setUserPosition: location => dispatch(setUserPosition(location)),
  notifyOutsideArea: (areaID) => dispatch(notifyOutsideArea(areaID)),
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
    const { loadCars, loadAreas, loadParkings , accessToken } = this.props;
    loadCars(accessToken);
    loadAreas();
    loadParkings();
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
      parkings,
      loadCars,
      loadAreas,
      loadParkings,
      shouldUpdate,
      shouldFetch,
      notifyOutsideArea,
    } = this.props;

    if ((!shouldUpdate && nextProps.shouldUpdate) || (!shouldFetch && nextProps.shouldFetch)) {
      const { accessToken } = this.props;
      loadCars(accessToken);
      loadAreas();
      loadParkings();
    }

    if ((position !== null || position !== nextProps.position) && (parkings.length > 0 || nextProps.parkings.length > 0) && role === 'ROLE_USER') {
      vehicles.forEach((v) => {
        if (v.parked_at !== null) {
          const parking = parkings.find(p => p.id === v.parked_at.id);
          const a = parking ? areas.find(area => area.involved_in.some(p => p.id === parking.id)) : undefined;

          if (a) {
            const area = new ol.format.WKT().readFeature(a.wkt, { featureProjection: 'EPSG:4326' });
            const userPos = new ol.format.WKT().readFeature(nextProps.position, { featureProjection: 'EPSG:4326' });

            const polygonGeometry = area.getGeometry();
            const coords = userPos.getGeometry().getCoordinates();
            const coordinate = ol.proj.fromLonLat([coords[0], coords[1]]);

            const isWithinArea = ol.extent.containsXY(polygonGeometry.getExtent(), coordinate[0], coordinate[1]);
            if (!isWithinArea) {
              // Calc distance using sphere
              // Using the haversine distance method https://en.wikipedia.org/wiki/Haversine_formula
              // WARN: Closest point from polygon could be wrong a use the center
              // Check out this example instead if problems occur: https://gis.stackexchange.com/a/170225/128534
              const closestPoint = area.getGeometry().getClosestPoint(userPos.getGeometry().getFirstCoordinate());
              const d = ol.proj.transform(closestPoint, 'EPSG:3857', 'EPSG:4326');

              // TODO: Not sure this works correctly
              // Distance seems to be a bit high
              // Could have something to do with the projection
              const distanceKm = SphericalCosinus(d[0], d[1], coords[0], coords[1]);
              const distanceLimitKm = 200;

              if (distanceKm > distanceLimitKm) {
                notifyOutsideArea(parking.id);
              }
            }
          }
        }
      });
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.id);
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
    const { classes, vehicles, areas, role, parkings } = this.props;

    return (
      <div>
        {role === 'ROLE_USER'
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
                          secondary={vehicle.parked_at ? (areas.filter(area => (area.involved_in.some(p => p.id === vehicle.parked_at.id))).map(area => `${area.name} : ${area.rates.map(rate => `${rate.rate_from}:00 - ${rate.rate_to}:00 ${rate.rate} kr/h\n`)}`)) : 'Inte Parkerad'}
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
                        options={areas.length > 0 ? areas.map(area => ({
                          value: area.id.toString(),
                          label: `${area.name} : `
                            + `${area.rates.map(rate => `${rate.rate_from
                              }:00 - ${
                              rate.rate_to
                              }:00 ${
                              rate.rate} kr/h`)}`,
                        })).concat([{ value: '', label: 'Ingen parkering' }]) : [{ value: '', label: 'Ingen parkering' }]
                        }
                        value={areas.filter(area => (area.involved_in.some(p => vehicle.parked_at && p.id === vehicle.parked_at.id))).map(area => area.id).toString()}
                      />
                    </div>
                  ))}
                </List>
              </div>
            </Grid>
          ) : null}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VehicleList));
