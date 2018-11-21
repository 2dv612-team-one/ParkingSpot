/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { openModal, logout } from '../../actions/authenticate';
import { LOGIN_MODAL, REGISTER_MODAL } from '../../constants/environment';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
});

const mapDispatchToProps = dispatch => ({
  openLoginModal: () => dispatch(openModal(LOGIN_MODAL)),
  openRegisterModal: () => dispatch(openModal(REGISTER_MODAL)),
  logout: () => dispatch(logout()),
})

class MenuBar extends Component {
  handleLogout() {
    this.props.logout();
  }

  render() {
    const { accessToken } = this.props;
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

            {!accessToken ? 
            <div>
              <Button color="inherit" onClick={this.props.openLoginModal}>
                <span>Logga in</span>
              </Button>
              <Button color="inherit" onClick={this.props.openRegisterModal}>
                <span>Registrera</span>
              </Button> 
            </div>
            :
            <Button color="inherit" onClick={this.props.logout}>
              <span>Logga ut</span>
            </Button>  
          }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);