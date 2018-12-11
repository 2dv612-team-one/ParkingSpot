import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Menu, MenuItem, Button , withStyles} from '@material-ui/core';

import { getAreas, deleteArea } from '../../actions/parkingArea';
import styles from '../../assets/styles/vehicle-list';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  areas: state.parkingArea.data,
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getAreas()),
  deleteArea: (accessToken, name) => dispatch(deleteArea(accessToken, name)),
});

class SelectParkingArea extends Component {
  componentWillMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  state = {
    showMenu: null,
  };

  handleClick = (e) => {
    this.setState({ showMenu: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ showMenu: null });
  };

  handleDelete = (e) => {
    // e.target.value gives weird value
    const name = e.target.innerText;
    const { accessToken, deleteArea } = this.props;

    deleteArea(accessToken, name);
    this.handleClose();
  };

  render() {
    const { areas } = this.props;
    const { showMenu } = this.state;

    return (
      <div>
        <Button
          aria-owns={showMenu ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Parkeringsplatser
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={showMenu}
          open={Boolean(showMenu)}
          onClose={this.handleClose}
        >
          {areas && Array.from(areas).map(area => (
            <MenuItem onClick={this.handleDelete}>{area.name}</MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectParkingArea));
