import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Avatar, Button, Grid, withStyles} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import ParkingAreaModal from '../ParkingAreaModal/ParkingAreaModal';
import { openModal } from '../../actions/modal';
import { PARKING_AREA_MODAL } from '../../constants/environment';

import { getAreas, deleteArea, editArea, addArea } from '../../actions/parkingArea';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  areas: state.parkingArea.data,
  shouldUpdate: state.parkingArea.update,
  role: state.authentication.role
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getAreas()),
  openParkingAreaModal: (props) => dispatch(openModal(PARKING_AREA_MODAL, props)),
  editArea: (accessToken, id, newProps) => dispatch(editArea(accessToken, id, newProps)),
  deleteArea: (accessToken, id) => dispatch(deleteArea(accessToken, id)),
  addArea: (accessToken, id, props) => dispatch(addArea(accessToken, props)),
});

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 15px ${theme.spacing.unit * 2}px`,
  },
});

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

class ParkingAreaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: null,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.shouldUpdate && nextProps.shouldUpdate) {
      this.props.onLoad();
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.shouldUpdate && prevProps.shouldUpdate) {
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

  handleDelete = (id) => {
    const { accessToken, deleteArea } = this.props;
    deleteArea(accessToken, id);
    this.handleClose();
  };

  handleEdit = (id, name, coords) => {
    const { editArea, openParkingAreaModal } = this.props;
    let props = {id: id, name: name, coords: coords, onSubmit: editArea, submitPrompt: "Uppdatera"}
    openParkingAreaModal(props)
    this.handleClose();
  };

  handleAdd = () => {
    const { addArea, openParkingAreaModal } = this.props;
    let props = {onSubmit: addArea, submitPrompt: "Lägg till", name: 'Untitled', coords: [0, 0, 0, 0]}
    openParkingAreaModal(props)
    this.handleClose();
  };

  render() {
    const { areas, classes, role } = this.props;
    const { showMenu } = this.state;

    return (
      <div>
        { role === "ROLE_PARKING_OWNER" ?
      <Grid item xs={12} md={6}>
            <Grid><ParkingAreaModal /></Grid>
            <Typography variant="h6" className={classes.title}>
              Parkeringsplatser
              <IconButton aria-label="Add" onClick={() => this.handleAdd()}>
                  <AddIcon />
              </IconButton>
            </Typography>
            <div className={classes.demo}>
              <List>
                {areas.length > 0 && areas.map(area => 
                    <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <LocationOnIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={area.name + " (" + area.coord1 + ","+ area.coord2 + ","+ area.coord3 + ","+ area.coord4 + ")"}
                      secondary={`${area.rates.map(rate => 
                        rate.rate_from +
                        ":00 - " +
                        rate.rate_to +
                        ":00 " +
                        rate.rate + " kr/h")}`}
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
                )}
              </List>
            </div>
      </Grid> : null }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ParkingAreaList));
