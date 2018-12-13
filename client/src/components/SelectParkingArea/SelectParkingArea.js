import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Typography, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Avatar, Button, Grid, withStyles} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DeleteIcon from '@material-ui/icons/Delete';

import { getAreas, deleteArea } from '../../actions/parkingArea';
// import styles from '../../assets/styles/vehicle-list';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  areas: state.parkingArea.data,
  shouldUpdate: state.parkingArea.update,
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getAreas()),
  deleteArea: (accessToken, name) => dispatch(deleteArea(accessToken, name)),
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

class SelectParkingArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: null,
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps (nextProps) {
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

  handleDelete = (name) => {
    // e.target.value gives weird value
    const { accessToken, deleteArea } = this.props;

    deleteArea(accessToken, name);
    this.handleClose();
  };

  render() {
    const { areas, classes } = this.props;
    const { showMenu } = this.state;

    return (
      <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
              Parkeringsplatser
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
                      primary={area.name}
                      secondary={`20 kr/h 18:00-19:00`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete" onClick={() => this.handleDelete(area.name)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
              </List>
            </div>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectParkingArea));
