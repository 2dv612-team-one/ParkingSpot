import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Grid, Modal, TextField } from '@material-ui/core';

import { closeModal } from '../../actions/modal';
import { VEHICLE_MODAL } from '../../constants/environment';

const mapStateToProps = state => ({
  showVehicleModal: state.modal[VEHICLE_MODAL].show,
  info: state.modal[VEHICLE_MODAL].props,
  update: state.modal[VEHICLE_MODAL].update,
  accessToken: state.authentication.accessToken
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal())
});

class VehicleModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      registrationNumber: ''
    }

    this.onKeyPress = this.onKeyPress.bind(this);
    this.handleRegistrationNumber = this.handleRegistrationNumber.bind(this);
    this.submitVehicle = this.submitVehicle.bind(this);
  }

  onKeyPress= (e) => {
    if (e.key === 'Enter') {
      this.submitVehicle();
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.update && nextProps.update) {
      this.setState({registrationNumber: nextProps.info.registrationNumber})
    }
  }

  hasEmptyInput() {
    const { registrationNumber } = this.state;
    return {
      registrationNumber: !registrationNumber || registrationNumber.length === 0
    }
  }

  handleClose = () => {
    const { closeModal } = this.props;
    closeModal();
  }

  handleRegistrationNumber(e) {
    this.setState({registrationNumber: e.target.value});
  }

  submitVehicle() {
    const { registrationNumber } = this.state;
    const { accessToken } = this.props;
    const { onSubmit } = this.props.info;
    onSubmit(accessToken, registrationNumber);
    this.handleClose();
  }

  canBeSubmitted() {
    const emptyInputErrors = this.hasEmptyInput();
    const emptyInput = Object.keys(emptyInputErrors).some(x => emptyInputErrors[x]);
    return !emptyInput;
  }

  render() {
    const { submitPrompt } = this.props.info
    const { registrationNumber } = this.state
    const emptyInput = this.hasEmptyInput()
    const canBeSubmitted = this.canBeSubmitted()
    const { showVehicleModal } = this.props

    const emptyInputError = (field, value) => {
      const hasEmptyInput = emptyInput[field];
      return hasEmptyInput || false;
    }

    return (
      <Modal
        open={showVehicleModal || false}
        onClose={this.handleClose}
        onKeyPress={this.onKeyPress}
      >
        <div className="modal-box">
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
          <div className="modal-box">
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <TextField
                  label = "Registreringsnummer"
                  name = "registrationNumber"
                  onChange = { this.handleRegistrationNumber }
                  value = { registrationNumber }
                  error={!!emptyInputError('registrationNumber')}
                  helperText={emptyInputError('registrationNumber') ? 'Ange ett registreringsnummer.' : ' '}
                />
              </Grid>
              <Grid item>
                <Button
                  type="button"
                  color="primary"
                  variant="outlined"
                  className="modal-submit-btn"
                  onClick={this.submitVehicle}
                  disabled={!canBeSubmitted}
                >
                  <span>{ submitPrompt }</span>
                </Button>
              </Grid>
              </Grid>
            </div>
          </Grid>
        </div>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleModal);