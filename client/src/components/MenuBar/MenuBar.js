/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { openModal } from '../../actions/authenticate';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
});

const mapDispatchToProps = dispatch => ({
  openLoginModal: () => dispatch(openModal()),
})

class MenuBar extends Component {
  render() {
    return (
      <div className="app-bar">
        <AppBar position="static">
          <Toolbar>
            <IconButton className="app-bar-btn" color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className="app-bar-grow">
              ParkingZpot
            </Typography>
            <Button color="inherit" onClick={this.props.openLoginModal}>
              <span>Logga in</span>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);