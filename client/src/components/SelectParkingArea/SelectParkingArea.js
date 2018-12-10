import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, withStyles } from '@material-ui/core';
import { Menu, MenuItem, Button } from '@material-ui/core';

import { getAreas } from '../../actions/parkingArea';
import styles from '../../assets/styles/vehicle-list';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  areas: state.parkingArea.data,
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getAreas()),
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

  render() {
    const { classes, areas } = this.props;
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
            <MenuItem onClick={this.handleClose}>{area.name}</MenuItem>
          ))}
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectParkingArea));
