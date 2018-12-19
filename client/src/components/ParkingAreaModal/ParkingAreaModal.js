import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Grid, Modal, TextField } from '@material-ui/core';

import { closeModal } from '../../actions/modal';
import { PARKING_AREA_MODAL } from '../../constants/environment';

import ParkingMap from '../ParkingMap/ParkingMap';

const mapStateToProps = state => ({
  showParkingAreaModal: state.modal[PARKING_AREA_MODAL].show,
  info: state.modal[PARKING_AREA_MODAL].props,
  update: state.modal[PARKING_AREA_MODAL].update,
  accessToken: state.authentication.accessToken,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
});

class ParkingAreaModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      wkt: null,
    };

    this.onKeyPress = this.onKeyPress.bind(this);
    this.handleAreaName = this.handleAreaName.bind(this);
    this.onDraw = this.onDraw.bind(this);
    this.submitArea = this.submitArea.bind(this);
  }

  onKeyPress= (e) => {
    if (e.key === 'Enter') {
      this.submitArea();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.update && nextProps.update) {
      this.setState({ name: nextProps.info.name, wkt: nextProps.info.wkt });
    }
  }

  onDraw = (wkt) => {
    this.setState({ wkt });
  }

  handleClose = () => {
    const { closeModal } = this.props;
    closeModal();
  }

  handleAreaName(e) {
    this.setState({ name: e.target.value });
  }

  submitArea() {
    const { name, wkt } = this.state;
    const { accessToken } = this.props;
    const { onSubmit, id } = this.props.info;
    onSubmit(accessToken, id, { name, wkt });
    this.handleClose();
  }

  canBeSubmitted() {
    const emptyInputErrors = this.hasEmptyInput();
    const emptyInput = Object.keys(emptyInputErrors).some(x => emptyInputErrors[x]);
    return !emptyInput;
  }

  hasEmptyInput() {
    const { name, wkt } = this.state;
    return {
      name: !name || name.length === 0,
      wkt: !wkt || !wkt[0] || wkt[0].length === 0,
    };
  }


  render() {
    const { submitPrompt } = this.props.info;
    const { name } = this.state;
    const emptyInput = this.hasEmptyInput();
    const canBeSubmitted = this.canBeSubmitted();
    const { showParkingAreaModal } = this.props;

    const emptyInputError = (field) => {
      const hasEmptyInput = emptyInput[field];
      return hasEmptyInput || false;
    };

    return (
      <Modal
        open={showParkingAreaModal || false}
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
                    label="Namn"
                    name="name"
                    value={name}
                    onChange={this.handleAreaName}
                    error={!!emptyInputError('name')}
                    helperText={emptyInputError('name') ? 'Ange ett namn.' : ' '}
                  />
                </Grid>
                <ParkingMap onDraw={this.onDraw} />
                <Grid item>
                  <Button
                    type="button"
                    color="primary"
                    variant="outlined"
                    className="modal-submit-btn"
                    onClick={this.submitArea}
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

export default connect(mapStateToProps, mapDispatchToProps)(ParkingAreaModal);
