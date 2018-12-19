/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import { removeSnackbar, markMessageViewed } from '../../actions/snackbar';
import { getUnseenMessages } from '../../actions/userControl';
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  infoMessages: state.message.messages,
  successMessages: state.success.messages,
  errorMessages: state.error.messages,
});

const mapDispatchToProps = dispatch => ({
  removeSnackbar: (id) => dispatch(removeSnackbar(id)),
  markMessageViewed: (id, accessToken) => dispatch(markMessageViewed(id, accessToken)),
  getUnseenMessages: (accessToken) => dispatch(getUnseenMessages(accessToken)),
});

class SnackbarHandling extends Component {
  handleClose = (id) => {
    const { removeSnackbar } = this.props;
    removeSnackbar(id);
  };

  handleViewed = (id) => {
    const { accessToken, markMessageViewed, removeSnackbar } = this.props;
    markMessageViewed(id, accessToken);
    removeSnackbar(id);
  }

  notify = (message, options) => {
    if (!toast.isActive(options.toastId)) {
      toast(message, options);
    }
  }

  componentDidUpdate(prevProps) {
    const { infoMessages, successMessages, errorMessages } = this.props;

    if (infoMessages !== prevProps.infoMessages) {
      infoMessages.forEach((message) => {
        if (message === undefined) return;

        const options = {
          type: "info",
          toastId: message.id,
          closeButton: <CheckBtn id={message.id} _this={this} />,
          className: 'snackbar is-info',
        };

        this.notify(message.message, options);
      })
    }

    errorMessages.forEach((message) => {
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
    })

    successMessages.forEach((message) => {
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
    })
  }

  render() { return null; }
}

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
    <IconButton aria-label="Check"
      onClick={() => { _this.handleClose(id); closeToast(); }}
      className="has-white-text">
      <CloseIcon />
    </IconButton>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarHandling);