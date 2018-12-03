/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import SockJS from 'sockjs-client';

import MenuBar from './components/MenuBar/MenuBar';
import LoginModal from './components/LoginModal/LoginModal';
import RegisterModal from './components/RegisterModal/RegisterModal';
import VehicleForm from './components/VehicleForm/VehicleForm';
import VehicleList from './components/VehicleList/VehicleList';
import AdminUserControl from './components/AdminUserControl/AdminUserControl';
import ErrorHandling from './components/ErrorHandling/ErrorHandling';

import { fetchAccessTokenFromLocalStorage } from './actions/authenticate';
import { emailVerificationError } from './actions/snackbar';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
});

const mapDispatchToProps = dispatch => ({
  loadAccessToken: () => dispatch(fetchAccessTokenFromLocalStorage()),
  emailVerificationError: () => dispatch(emailVerificationError()),
});

class App extends Component {
  componentWillMount() {
    // Check for email verification errors
    const { emailVerificationError } = this.props;
    const tokenVal = new URLSearchParams(window.location.search.substr(1)).get('token');
    if (tokenVal === 'error') {
      emailVerificationError();
    }
  }

  componentDidMount() {
    const { loadAccessToken } = this.props;
    loadAccessToken();

    const sock = new SockJS('http://localhost:8080/ws');
    sock.onopen = () => {
      console.log('open');
      sock.send('test');
    };
  }

  render() {
    const { accessToken } = this.props;
    return (
      <div className="App">
        <MenuBar />

        <LoginModal />
        <RegisterModal />

        <Typography className="app-header-message" variant="title" align="center">Välkommen till ParkingZpot</Typography>

        <ErrorHandling />

        {accessToken
        && (
        <div>
            <Grid container
                direction="column"
                alignItems="stretch"
                spacing={16}
                justify="space-around"
                >
                <Grid item><VehicleForm /></Grid>
                <Grid item><VehicleList /></Grid>
                <Grid item><AdminUserControl /></Grid>
            </Grid>
        </div>
        )
          }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
