/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withSnackbar } from 'notistack';
import { closeSnackBar } from '../../actions/snackbar';
import { IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

class SnackbarHandling extends Component {
  state = {
    displayed: [],
  };

  storeDisplayed = (key) => {
    this.setState(({ displayed }) => ({
      displayed: [...displayed, key],
    }));
  };

  render() {
    const { notifications, infoMessage, errorMessage, showInfo, showError, enqueueSnackbar } = this.props;
    const { displayed, clicked } = this.state;

    if (showError) {
      const timeInSeconds = 600 * 1000;
      const options = {
        variant: 'error',
        autoHideDuration: timeInSeconds,
        action: <IconButton key="close" aria-label="Close" color="inherit"><CheckIcon /></IconButton>,
      };

      setTimeout(() => {
        enqueueSnackbar(errorMessage, options);
      }, 1);
      return null;
    }

    if (showInfo) {
      const timeInSeconds = 600 * 1000;
      const options = {
        variant: 'info',
        autoHideDuration: timeInSeconds,
        action: <IconButton key="close" aria-label="Close" color="inherit"><CheckIcon /></IconButton>,
      };

      setTimeout(() => {
        // If notification already displayed, abort
        if (displayed.indexOf(infoMessage.id) > -1) return;

        // Display notification using notistack
        enqueueSnackbar(infoMessage.message, options);

        // Add notification's key to the local state
        this.storeDisplayed(infoMessage.id);
        closeSnackBar(infoMessage.id);
      }, 1);
      return null;
    }

    // notifications.forEach((notification) => {
    //   setTimeout(() => {
    //     // If notification already displayed, abort
    //     if (displayed.indexOf(notification.key) > -1) return;

    //     // Display notification using notistack
    //     enqueueSnackbar(notification.message, notification.options);

    //     // Add notification's key to the local state
    //     this.storeDisplayed(notification.key);
    //     closeSnackBar(notification.key);
    //   }, 1);
    // })

    return null;
  }
}

const mapStateToProps = state => ({
  notifications: state.snackbar.notifications,
  infoMessage: state.message.message,
  errorMessage: state.error.message,
  showInfo: state.message.showInfo,
  showError: state.error.showError,
});

const mapDispatchToProps = dispatch => bindActionCreators({ closeSnackBar }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(SnackbarHandling));