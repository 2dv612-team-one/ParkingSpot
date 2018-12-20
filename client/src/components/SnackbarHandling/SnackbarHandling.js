/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { getUnseenMessages } from '../../actions/userControl';
import { removeSnackbar, markMessageViewed } from '../../actions/snackbar';
import { unparkCar } from '../../actions/parking';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  errorMessages: state.error.messages,
  infoMessages: state.message.messages,
  successMessages: state.success.messages,
  warningMessages: state.warning.messages,
});

const mapDispatchToProps = dispatch => ({
  getUnseenMessages: (accessToken) => dispatch(getUnseenMessages(accessToken)),
  markMessageViewed: (accessToken, id) => dispatch(markMessageViewed(accessToken, id)),
  removeSnackbar: (id) => dispatch(removeSnackbar(id)),
  unparkCar: (accessToken, areaID) => dispatch(unparkCar(accessToken, areaID)),
});

class SnackbarHandling extends Component {
  state = {
    snackbars: [],
  };

  storeSnackbar = (id) => {
    this.setState(({ snackbars }) => ({
      snackbars: [...snackbars, id],
    }));
  };

  handleCancel = (snackbarID, areaID) => {
    const { accessToken, removeSnackbar, unparkCar } = this.props;
    unparkCar(accessToken, areaID);
    removeSnackbar(snackbarID);
  }

  handleClose = (id) => {
    const { removeSnackbar } = this.props;
    removeSnackbar(id);
  };

  handleViewed = (id) => {
    const { accessToken, markMessageViewed, removeSnackbar } = this.props;
    markMessageViewed(accessToken, id);
    removeSnackbar(id);
  }

  notify = (message, options) => {
    if (!toast.isActive(options.toastId)) {
      toast(message, options);
    }
  }

  componentDidUpdate(prevProps) {
    const { infoMessages, warningMessages, errorMessages, successMessages } = this.props;
    const { snackbars } = this.state;
    const snackbarsVisibleLimit = 3;

    if (infoMessages !== prevProps.infoMessages) {

      for (let i = 0; i < snackbarsVisibleLimit; i++) {
        const message = infoMessages[i];
        if (message === undefined) return;

        const options = {
          type: "info",
          toastId: message.id,
          closeButton: <CheckBtn id={message.id} _this={this} />,
          className: 'snackbar is-info',
        };

        this.notify(message.message, options);
      }
    }

    warningMessages.forEach(message => {
      if (message === undefined) return;
      let snackbarAlreadyExists = snackbars.includes(message.areaID);
      if (snackbarAlreadyExists) return;

      const timeInSeconds = 30;
      const options = {
        type: "warning",
        toastId: message.messageID,
        closeButton: <CancelBtn messageID={message.messageID}
          areaID={message.areaID} _this={this} />,
        className: 'snackbar is-warning',
        autoClose: timeInSeconds * 1000,
      };

      this.notify(message.message, options);
      this.storeSnackbar(message.areaID);
    });

    errorMessages.forEach(message => {
      if (message === undefined) return;

      const timeInSeconds = 6;
      const options = {
        type: "error",
        toastId: message.id,
        closeButton: <CloseBtn id={message.id} _this={this} />,
        className: 'snackbar is-danger',
        autoClose: timeInSeconds * 1000,
      };

      this.notify(message.message, options);
      this.handleClose(message.id);
    });

    successMessages.forEach(message => {
      if (message === undefined) return;

      const timeInSeconds = 6;
      const options = {
        type: "success",
        toastId: message.id,
        closeButton: <CloseBtn id={message.id} _this={this} />,
        className: 'snackbar is-success',
        autoClose: timeInSeconds * 1000,
      };

      this.notify(message.message, options);
      this.handleClose(message.id);
    });
  }

  render() { return <div></div> }
}

const CancelBtn = ({ closeToast, messageID, areaID, _this }) => (
  <div>
    <IconButton aria-label="Check"
      onClick={() => { _this.handleCancel(messageID, areaID); closeToast(); }}
      className="has-white-text">
      Ja
    </IconButton>
  </div>
);

const CheckBtn = ({ closeToast, id, _this }) => (
  <div>
    <IconButton aria-label="Check"
      onClick={() => { _this.handleViewed(id); closeToast(); }}
      className="has-white-text">
      <CheckIcon />
    </IconButton>
  </div>
);

const CloseBtn = ({ closeToast, id, _this }) => (
  <div>
    <IconButton aria-label="Close"
      onClick={() => { _this.handleClose(id); closeToast(); }}
      className="has-white-text">
      <CloseIcon />
    </IconButton>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarHandling);