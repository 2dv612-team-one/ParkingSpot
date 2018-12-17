/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { removeSnackbar, markMessageViewed } from '../../actions/snackbar';
import { getUnseenMessages } from '../../actions/userControl';

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
  state = {
    viewed: [],
  };

  storeViewed = (id) => {
    this.setState(({ viewed }) => ({
      viewed: [...viewed, id],
    }));
  };

  handleClose = (id) => {
    const { removeSnackbar } = this.props;
    removeSnackbar(id);
  };

  handleViewed = (id) => {
    const { accessToken, markMessageViewed, removeSnackbar } = this.props;
    markMessageViewed(id, accessToken);
    removeSnackbar(id);
  };

  componentDidUpdate(prevProps) {
    const { infoMessages, successMessages, errorMessages, enqueueSnackbar } = this.props;
    const { viewed } = this.state;

    // let allMessages = infoMessages.concat(successMessages, errorMessages);
    // console.log("__ALL MESSAGES__HERE__");
    // console.log(infoMessages);

    if (infoMessages !== prevProps.infoMessages) {
      infoMessages.forEach((message) => {
        if (message === undefined) {
          return;
        }
        const timeInSeconds = 600 * 1000;
        const options = {
          variant: "info",
          autoHideDuration: timeInSeconds,
          action: <IconButton key="close" aria-label="Close" color="inherit" onClick={() => this.handleViewed(message.id)}><CheckIcon /></IconButton>,
        };
        setTimeout(() => {
          let messageSeen = viewed.includes(message.id);
          if (messageSeen) return;

          // Display message using notistack
          if (typeof enqueueSnackbar === "function") { enqueueSnackbar(message.message, options); }

          // Add message"s id to the local state
          this.storeViewed(message.id);
        }, 1);
      })
    }

    errorMessages.forEach((message) => {
      if (message === undefined) {
        return;
      }
      const timeInSeconds = 6 * 1000;
      const options = {
        variant: "error",
        autoHideDuration: timeInSeconds,
        action: <IconButton key="close" aria-label="Close" color="inherit" onClick={() => this.handleClose(message.id)}><CheckIcon /></IconButton>,
      };
      setTimeout(() => {
        let messageSeen = viewed.indexOf(message.id) > -1;
        if (messageSeen) return;

        // Display message using notistack
        if (typeof enqueueSnackbar === "function") { enqueueSnackbar(message.message, options); }
        this.handleClose(message.id);
      }, 1);
    })

    successMessages.forEach((message) => {
      if (message === undefined) {
        return;
      }
      const timeInSeconds = 6 * 1000;
      const options = {
        variant: "success",
        autoHideDuration: timeInSeconds,
        action: <IconButton key="close" aria-label="Close" color="inherit" onClick={() => this.handleClose(message.id)}><CheckIcon /></IconButton>,
      };
      setTimeout(() => {
        let messageSeen = viewed.indexOf(message.id) > -1;
        if (messageSeen) return;

        // Display message using notistack
        if (typeof enqueueSnackbar === "function") { enqueueSnackbar(message.message, options); }
        this.storeViewed(message.id);
        this.handleClose(message.id);
      }, 1);
    })
  }

  render() { return <div></div>; }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(SnackbarHandling));