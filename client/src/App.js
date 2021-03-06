import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import SockJS from 'sockjs-client';
import Stomp from 'stomp-websocket';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AddMessage from './components/AddMessage/AddMessage';
import AdminUserControl from './components/AdminUserControl/AdminUserControl';
import HourlyRate from './components/HourlyRate/HourlyRate';
import LoginModal from './components/LoginModal/LoginModal';
import MenuBar from './components/MenuBar/MenuBar';
import ParkingAreaList from './components/ParkingAreaList/ParkingAreaList';
import RegisterModal from './components/RegisterModal/RegisterModal';
import SnackbarHandling from './components/SnackbarHandling/SnackbarHandling';
import VehicleList from './components/VehicleList/VehicleList';

import { fetchAccessTokenFromLocalStorage } from './actions/authenticate';
import { getUnseenMessages, emailVerificationError } from './actions/userControl';
import { showMessage } from './actions/snackbar';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
});

const mapDispatchToProps = dispatch => ({
  loadAccessToken: () => dispatch(fetchAccessTokenFromLocalStorage()),
  emailVerificationError: () => dispatch(emailVerificationError()),
  showMessage: message => dispatch(showMessage(message)),
  getUnseenMessages: accessToken => dispatch(getUnseenMessages(accessToken)),
});

class App extends Component {
  componentWillMount() {
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
    const { accessToken, showMessage, getUnseenMessages } = this.props;

    // Wait until accesstoken is loaded
    if (accessToken && accessToken !== prevProps.accessToken) {
      const headers = {
        Authorization: accessToken,
      };
      const socket = SockJS('/ws');
      const stompClient = Stomp.over(socket);
      stompClient.connect(headers, () => {
        stompClient.subscribe('/topic/message', showMessage, headers);
      });
      getUnseenMessages(accessToken);
    }
  }

  render() {
    const { accessToken } = this.props;

    return (
      <div className="App">
        <MenuBar />
        <LoginModal />
        <RegisterModal />
        <Typography className="app-header-message" variant="h6" align="center">Välkommen till ParkingZpot</Typography>

        <SnackbarHandling />
        <ToastContainer
          autoClose={false}
          closeOnClick={false}
          draggable={false}
          newestOnTop
          position="bottom-left"
          transition={Bounce}
        />

        {accessToken && (
          <div>
            <Grid
              container
              direction="column"
              alignItems="stretch"
              spacing={16}
              justify="space-around"
            >
              <Grid item><VehicleList /></Grid>
              <Grid item><ParkingAreaList /></Grid>
              <Grid item><HourlyRate /></Grid>
              <Grid item><AdminUserControl /></Grid>
              <Grid item><AddMessage /></Grid>
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
