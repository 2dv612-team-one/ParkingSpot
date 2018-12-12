/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import SockJS from 'sockjs-client';
import Stomp from 'stomp-websocket';

import MenuBar from './components/MenuBar/MenuBar';
import LoginModal from './components/LoginModal/LoginModal';
import RegisterModal from './components/RegisterModal/RegisterModal';
import VehicleForm from './components/VehicleForm/VehicleForm';
import VehicleList from './components/VehicleList/VehicleList';
import AdminUserControl from './components/AdminUserControl/AdminUserControl';
import ErrorHandling from './components/SnackbarHandling/ErrorHandling';
import InfoHandling from './components/SnackbarHandling/InfoHandling';
import SuccessHandling from './components/SnackbarHandling/SuccessHandling';
import AddParkingArea from './components/AddParkingArea/AddParkingArea';
import AddMessage from './components/AddMessage/AddMessage';
import SelectParkingArea from './components/SelectParkingArea/SelectParkingArea';
import HourlyRate from "./components/HourlyRate/HourlyRate";

import { fetchAccessTokenFromLocalStorage } from './actions/authenticate';
import { emailVerificationError, showMessage } from './actions/snackbar';


const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
});

const mapDispatchToProps = dispatch => ({
  loadAccessToken: () => dispatch(fetchAccessTokenFromLocalStorage()),
  emailVerificationError: () => dispatch(emailVerificationError()),
  showMessage: message => dispatch(showMessage(message)),
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
  }

  componentDidUpdate(prevProps) {
    const { accessToken, showMessage } = this.props;

    // Wait until accesstoken is loaded
    if (accessToken !== prevProps) {
      const headers = {
        'Authorization': accessToken
      };
      const socket = SockJS('/ws');
      const stompClient = Stomp.over(socket);
      stompClient.connect(headers, () => {
        stompClient.subscribe('/topic/message', showMessage, headers);
      });
    }
  }

  render() {
    const { accessToken } = this.props;
    return (
      <div className="App">
        <MenuBar />

        <LoginModal />
        <RegisterModal />

        <Typography className="app-header-message" variant="title" align="center">Välkommen till ParkingZpot</Typography>

        <InfoHandling />
        <ErrorHandling />
        <SuccessHandling />

        {accessToken
          && (
            <div>
              <Grid
                container
                direction="column"
                alignItems="stretch"
                spacing={16}
                justify="space-around"
              >
                <Grid item><VehicleForm /></Grid>
                <Grid item><VehicleList /></Grid>
                <Grid item><AdminUserControl /></Grid>
                <Grid item>
                  <AddParkingArea />
                  {' '}
                </Grid>
                <Grid><SelectParkingArea /></Grid>
                <Grid><HourlyRate /></Grid>
                <Grid><AddMessage /></Grid>
              </Grid>
            </div>
          )
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
