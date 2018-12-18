import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, MenuItem, Avatar, Input, Grid, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import LocalParking from '@material-ui/icons/LocalParking';

import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import { getCars, deleteCar, addCar, parkCar } from '../../actions/vehicle';
import VehicleModal from '../VehicleModal/VehicleModal';
import { openModal } from '../../actions/modal';
import { VEHICLE_MODAL } from '../../constants/environment';
import styles from '../../assets/styles/vehicle-list';


const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  vehicles: state.vehicle.data,
  areas: state.parkingArea.data,
  shouldUpdate: state.vehicle.update,
  role: state.authentication.role
});

const mapDispatchToProps = dispatch => ({
  // TODO: only load vehicles accessible to the user
  onLoad: () => dispatch(getCars()),
  openVehicleModal: (props) => dispatch(openModal(VEHICLE_MODAL, props)),
  deleteCar: (accessToken, registrationNumber) => dispatch(deleteCar(accessToken, registrationNumber)),
  addCar: (accessToken, registrationNumber) => dispatch(addCar(accessToken, registrationNumber)),
  parkCar: (accessToken, registrationNumber, areaID) => dispatch(parkCar(accessToken, registrationNumber, areaID))
});

class VehicleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pArea: ''
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handlePark = this.handlePark.bind(this);
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

  handleAdd = () => {
    const { addCar, openVehicleModal } = this.props;
    const props = {onSubmit: addCar, submitPrompt: "Lägg till", registrationNumber: 'XXX000'}
    openVehicleModal(props)
  };

  handlePark = (registrationNumber, areaID) => {
    const { accessToken } = this.props
    parkCar(accessToken, registrationNumber, areaID)
  }

  render() {
    const { classes, vehicles, areas, role } = this.props;
    const { pArea } = this.state;

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
              <ListItem>
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
                />
                <ListItemSecondaryAction>
                  <FormControl className={classes.formControl}>
                    <Select
                      onChange={(event) => this.setState({pArea: event.target.value})}
                      value={pArea}
                      name="parking"
                      input={<Input name="age" id="age-auto-width" />}
                      displayEmpty
                      className={classes.selectEmpty}
                    >
                      <MenuItem value="">
                        Inte Parkerad
                      </MenuItem>
                      {areas.length > 0 && areas.map(area => 
                        <MenuItem value={area.id} disabled={!!area.parked_at}>
                            {area.name + " (" + area.coord1 + ","+ area.coord2 + ","+ area.coord3 + ","+ area.coord4 + ")\n"}
                            {`${area.rates.map(rate => 
                              rate.rate_from +
                              ":00 - " +
                              rate.rate_to +
                              ":00 " +
                              rate.rate + " kr/h\n")}`}
                        </MenuItem>
                      )}
                    </Select>
                  <FormHelperText>Parkera bilen</FormHelperText>
                  </FormControl>
                  <IconButton aria-label="Park" onClick={() => this.handlePark(vehicle.registrationNumber, pArea)}>
                    <DoneIcon />
                  </IconButton>
                  <IconButton aria-label="Delete" onClick={() => this.handleDelete(vehicle.registrationNumber)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            </List>
          </div>
        </Grid> : null }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VehicleList));
