// eslint-disable-next-line prefer-destructuring
import React, { Component } from 'react';
import { connect } from 'react-redux';

import EmployeeList from './components/Employees/EmployeeList';
import { fetchEmployees, deleteEmployee } from './actions/employees';
import logo from './components/App/logo.svg';
import './components/App/App.css';

const mapStateToProps = state => ({
  employees: state.employees.employees.data,
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(fetchEmployees()),
  onDeleteClick: id => dispatch(deleteEmployee(id)),
});

class App extends Component {
  componentWillMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to ParkingZpot</h2>
        </div>
        <p className="App-intro">
          To get started, edit 
          {' '}
          <code>src/App.js</code>
          {' '}
          and save to reload.
        </p>
        <EmployeeList
          employees={this.props.employees}
          onDeleteClick={this.props.onDeleteClick} 
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
