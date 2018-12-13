/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { closeSnackBar, markMessageViewed } from '../../actions/snackbar';
import { IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

class SnackbarHandling extends Component {
  state = {
    viewed: [],
  };

  storeDisplayed = (id) => {
    this.setState(({ viewed }) => ({
      viewed: [...viewed, id],
    }));
  };

  handleClose = (event, reason) => {
    const { closeSnackBar } = this.props;
    closeSnackBar();
  };

  handleViewed = (event, reason) => {
    const { markMessageViewed, closeSnackBar } = this.props;
    markMessageViewed();
    closeSnackBar();
  };

  render() {
    const { infoMessages, errorMessages, enqueueSnackbar } = this.props;
    const { viewed } = this.state;

    infoMessages.forEach((message) => {
      if (message === undefined) {
        return;
      }
      const timeInSeconds = 600 * 1000;
      const options = {
        variant: 'info',
        autoHideDuration: timeInSeconds,
        action: <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleViewed}><CheckIcon /></IconButton>,
      };
      setTimeout(() => {
        let messageAlreadyViewed = viewed.indexOf(message.id) > -1;
        if (messageAlreadyViewed) return;

        // Display message using notistack
        enqueueSnackbar(message.message, options);

        // Add message's id to the local state
        this.storeDisplayed(message.id);
        // closeSnackBar(message.id);
      }, 1);
    })

    errorMessages.forEach((message) => {
      if (message === undefined) {
        return;
      }
      const timeInSeconds = 6 * 1000;
      const options = {
        variant: 'error',
        autoHideDuration: timeInSeconds,
        action: <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleClose}><CheckIcon /></IconButton>,
      };
      setTimeout(() => {
        let messageAlreadyViewed = viewed.indexOf(message.id) > -1;
        if (messageAlreadyViewed) return;

        // Display message using notistack
        enqueueSnackbar(message.message, options);

        // Add message's id to the local state
        this.storeDisplayed(message.id);
        // closeSnackBar(message.id);
      }, 1);
    })

    return null;
  }
}

const mapStateToProps = state => ({
  infoMessages: state.message.messages,
  errorMessages: state.error.messages,
});

const mapDispatchToProps = dispatch => ({
  closeSnackBar: () => dispatch(closeSnackBar()),
  markMessageViewed: () => dispatch(markMessageViewed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(SnackbarHandling));