/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Avatar, Grid, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import ParkingAreaModal from '../ParkingAreaModal/ParkingAreaModal';
import { openModal } from '../../actions/modal';
import { PARKING_AREA_MODAL } from '../../constants/environment';
import styles from '../../assets/styles/parking-area-list';

import { getAreas, deleteArea, editArea, addArea } from '../../actions/parkingArea';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  areas: state.parkingArea.data,
  shouldUpdate: state.parkingArea.update,
  role: state.authentication.role,
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getAreas()),
  openParkingAreaModal: props => dispatch(openModal(PARKING_AREA_MODAL, props)),
  editArea: (accessToken, id, newProps) => dispatch(editArea(accessToken, id, newProps)),
  deleteArea: (accessToken, id) => dispatch(deleteArea(accessToken, id)),
  addArea: (accessToken, id, props) => dispatch(addArea(accessToken, props)),
});

class ParkingAreaList extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.shouldUpdate && nextProps.shouldUpdate) {
      this.props.onLoad();
    }
  }

  componentWillMount() {
    this.props.onLoad();
  }

  handleDelete = (id) => {
    const { accessToken, deleteArea } = this.props;
    deleteArea(accessToken, id);
  };

  handleEdit = (id, name, wkt) => {
    const { editArea, openParkingAreaModal } = this.props;
    const props = { id, name, wkt, onSubmit: editArea, submitPrompt: 'Uppdatera' };
    openParkingAreaModal(props);
  };

  handleAdd = () => {
    const { addArea, openParkingAreaModal } = this.props;
    const props = { onSubmit: addArea, submitPrompt: 'Lägg till', name: 'Untitled Area', wkt: '' };
    openParkingAreaModal(props);
  };

  render() {
    const { areas, classes, role } = this.props;

    return (
      <Grid item xs={12} md={6}>
        { role === 'ROLE_PARKING_OWNER'
          ? (
            <div>
              <Typography variant="h6" className={classes.title}>
              Parkeringsområden
                <div>
                  <IconButton aria-label="Add" onClick={() => this.handleAdd()}>
                    <AddIcon />
                  </IconButton>
                  <ParkingAreaModal />
                </div>
              </Typography>
              <div className={classes.demo}>
                <List>
                  {areas.length > 0 && areas.map(area => (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <LocationOnIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={area.name}
                        secondary={`${area.rates.map(rate => `${rate.rate_from
                        }:00 - ${
                          rate.rate_to
                        }:00 ${
                          rate.rate} kr/h`)}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton aria-label="Delete" onClick={() => this.handleDelete(area.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton aria-label="Edit" onClick={() => this.handleEdit(area.id, area.name, [area.coord1, area.coord2, area.coord3, area.coord4])}>
                          <EditIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </div>
            </div>
          )
          : null }
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ParkingAreaList));
