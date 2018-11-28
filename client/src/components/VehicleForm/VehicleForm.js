import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Paper, Button, TextField, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HideIcon from '@material-ui/icons/Remove';
import SaveIcon from '@material-ui/icons/Save';

import { addCar } from '../../actions/vehicle';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
});

const mapDispatchToProps = dispatch => ({
  addCar: (accessToken, registrationNumber) => dispatch(addCar(accessToken, registrationNumber)),
});

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
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
    const { accessToken } = this.props;
    const { registrationNumber, showForm, addCar } = this.state;
    this.setState({ showForm: !showForm });
    addCar(accessToken, registrationNumber);
  }

  render() {
    const { classes } = this.props;
    const { showForm, registrationNumber } = this.state;

        return (
			<div className='add-vehicle-btn'>
				<Button
                    variant="extendedFab"
                    aria-label="Add"
                    className={`app-theme-color has-white-text ${classes.button}`}
                    onClick={this.handleShowForm}
                >
                    {!this.state.showForm ?
                    <AddIcon className={classes.extendedIcon} />
                    :
                    <HideIcon className={classes.extendedIcon} />}
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
                    <SaveIcon className={classes.extendedIcon} />
                        Spara
                  </Button>
                </Paper>
                )
                }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(VehicleForm));
