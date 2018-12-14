import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Grid, Modal, TextField } from '@material-ui/core';

import { closeModal } from '../../actions/modal';
import { PARKING_AREA_MODAL } from '../../constants/environment';

const mapStateToProps = state => ({
  showParkingAreaModal: state.modal[PARKING_AREA_MODAL].show,
  info: state.modal[PARKING_AREA_MODAL].props,
  update: state.modal[PARKING_AREA_MODAL].update,
  accessToken: state.authentication.accessToken
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal())
});

class ParkingAreaModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      coords: ['', '', '', '']
    }

    this.onKeyPress = this.onKeyPress.bind(this);
    this.handleAreaName = this.handleAreaName.bind(this)
    this.handleCoords = this.handleCoords.bind(this)
    this.submitArea = this.submitArea.bind(this)
  }

  onKeyPress= (e) => {
    if (e.key === 'Enter') {
      this.submitArea();
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.update && nextProps.update) {
      this.setState({name: nextProps.info.name, coords: nextProps.info.coords})
    }
  }

  hasEmptyInput() {
    const { name, coords } = this.state;
    return {
      name: !name || name.length === 0,
      coord1: !coords || !coords[0] ||  coords[0].length === 0,
      coord2: !coords || !coords[1] ||  coords[1].length === 0,
      coord3: !coords || !coords[2] ||  coords[2].length === 0,
      coord4: !coords || !coords[3] ||  coords[3].length === 0,
    }
  }

  handleClose = () => {
    const { closeModal } = this.props;
    closeModal();
  }

  handleAreaName(e) {
    this.setState({name: e.target.value});
  }

  handleCoords(e) {
    let coord = parseInt(e.target.name -1);
    let coords = this.state.coords;
    coords[coord] = e.target.value;
    this.setState({coords});
  }

  submitArea() {
    const { name, coords } = this.state;
    const { accessToken } = this.props;
    const { onSubmit, id } = this.props.info;
    onSubmit(accessToken, id, {name: name, coords: coords});
    this.handleClose();
  }

  canBeSubmitted() {
    const emptyInputErrors = this.hasEmptyInput();
    const emptyInput = Object.keys(emptyInputErrors).some(x => emptyInputErrors[x]);
    return !emptyInput;
  }

  render() {
    const { submitPrompt } = this.props.info
    const { name, coords } = this.state
    const emptyInput = this.hasEmptyInput()
    const canBeSubmitted = this.canBeSubmitted()
    const { showParkingAreaModal } = this.props

    const emptyInputError = (field, value) => {
      const hasEmptyInput = emptyInput[field];
      return hasEmptyInput || false;
    }

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
                    label = "Namn"
                    name = "name"
                    value = { name }
                    onChange = { this.handleAreaName }
                    error={!!emptyInputError('name')}
                    helperText={emptyInputError('name') ? 'Ange ett namn.' : ' '}
                  />
                </Grid>
                { coords.map((coord, index) => {
                  return (
                    <Grid item>
                      <TextField
                        label = { "Koordinat " + (index + 1) }
                        name = { (index + 1).toString() }
                        value = { coords[index] }
                        onChange = { this.handleCoords }
                        error={!!emptyInputError('coord' + (index + 1))}
                        helperText={emptyInputError(('coord' + (index + 1))) ? 'Ange en koordinat.' : ' '}
                      />
                    </Grid>
                  )
                }
                )}
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