/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import MenuBar from './components/MenuBar/MenuBar';
import LoginModal from './components/LoginModal/LoginModal';
import RegisterModal from './components/RegisterModal/RegisterModal';
import VehicleForm from './components/VehicleForm/VehicleForm';
import VehicleList from './components/VehicleList/VehicleList';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
});

class App extends Component {

  render() {
    const { accessToken } = this.props;
    return (
      <div className="App">
        <MenuBar />

        <LoginModal />
        <RegisterModal />

        <div className="App-header">
          <h2>Welcome to ParkingZpot</h2>
        </div>

        {accessToken &&
        <div>
          <VehicleForm />
          <VehicleList />
        </div>
          }
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
