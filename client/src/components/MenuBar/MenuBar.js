/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../assets/images/parkingzpot_white.svg';

import { logout } from '../../actions/authenticate';
import { openModal } from '../../actions/modal';
import { LOGIN_MODAL, REGISTER_MODAL } from '../../constants/environment';
import {deleteUser} from "../../actions/userControl";
import ChangePassword from '../../components/ChangePassword/ChangePassword';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
});

const mapDispatchToProps = dispatch => ({
  openLoginModal: () => dispatch(openModal(LOGIN_MODAL)),
  openRegisterModal: () => dispatch(openModal(REGISTER_MODAL)),
  logout: () => dispatch(logout()),
  deleteUser: (accessToken) => dispatch(deleteUser(accessToken)),
});

var displayFlex = {
  display: 'flex'
}

class MenuBar extends Component {
  handleLogout() {
    const { logout } = this.props;
    logout();
  }

  handleDelete() {

    const { accessToken } = this.props;
    deleteUser(accessToken);

    const { logout } = this.props;
    logout();
  }

    render() {
        const { accessToken, openLoginModal, openRegisterModal, logout} = this.props;
        return (
            <div className="app-bar">
                <AppBar className="app-bgcolor" position="static">
                    <Toolbar>
                        <IconButton className="app-bar-btn" color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>

            <div className="app-bar-grow">
              <a href="/">
                <img src={logo} alt="ParkingZpot logo" className="app-bar-logo" />
              </a>
            </div>

            {!accessToken
              ? (
                <div>
                 
                  <Button color="inherit" onClick={openLoginModal}>
                    <span>Logga in</span>
                  </Button>
                  <Button color="inherit" onClick={openRegisterModal}>
                    <span>Registrera</span>
                  </Button>
                </div>
              )
              : (
                <div style={displayFlex}>
                   <ChangePassword/>
                  <Button
                    color="inherit"
                    onClick={() => { if (window.confirm('Är du säker på att du vill ta bort ditt konto?')) this.handleDelete()} }
                  >
                    <span>Ta bort konto</span>
                  </Button>
                  <Button color="inherit" onClick={logout}>
                    <span>Logga ut</span>
                  </Button>
                </div>
              )
                        }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
