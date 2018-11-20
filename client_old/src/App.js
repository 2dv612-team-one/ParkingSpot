/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import MenuBar from './components/MenuBar/MenuBar';
import logo from './assets/images/logo.svg';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
});

class App extends Component {
  componentWillMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <div className="App">
        <MenuBar />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to ParkingZpot</h2>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
