import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Paper, Button, TextField, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HideIcon from '@material-ui/icons/Remove';
import SaveIcon from '@material-ui/icons/Save';

import { addCar } from '../../actions/vehicle';
import styles from '../../assets/styles/vehicle-form';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  role: state.authentication.role
});

const mapDispatchToProps = dispatch => ({
  addCar: (accessToken, registrationNumber) => dispatch(addCar(accessToken, registrationNumber)),
});

class VehicleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationNumber: '',
      showForm: false,
    };

    this.handleRegistrationNumberInput = this.handleRegistrationNumberInput.bind(this);
    this.handleShowForm = this.handleShowForm.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleRegistrationNumberInput(e) {
    const registrationNumber = e.target.value.toUpperCase();
    this.setState({ registrationNumber });
  }

  handleShowForm() {
    const { showForm } = this.props;
    this.setState({ showForm: !showForm });
  }

  handleSave() {
    const { accessToken, addCar } = this.props;
    const { registrationNumber, showForm } = this.state;
    this.setState({ showForm: !showForm });
    addCar(accessToken, registrationNumber);
  }

  render() {
    const { classes, role } = this.props;
    const { showForm, registrationNumber } = this.state;

    return (
      <div className='add-vehicle-btn'>
      { role === "ROLE_USER" ?
      <Paper>
        <Button
          variant="extendedFab"
          aria-label="Add"
          className="btn app-bgcolor has-white-text"
          onClick={this.handleShowForm}
        >
          {!this.state.showForm ?
            <AddIcon className="btn-icon" />
            :
            <HideIcon className="btn-icon" />}
          Lägg till en bil
        </Button>
        {showForm
          && (
            <Paper>
              <TextField
                label="Registreringsnummer"
                name="matchingPassword"
                className={classes.textField}
                margin="normal"
                onChange={this.handleRegistrationNumberInput}
                value={registrationNumber}
              />
              <Button variant="contained" size="small" className={classes.button} onClick={this.handleSave}>
                <SaveIcon className="btn-icon" />
                Spara
              </Button>
          </Paper> ) }
        </Paper> : null
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VehicleForm));
