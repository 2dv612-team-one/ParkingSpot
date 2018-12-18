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
    clickCount: 0,
  };

  storeViewed = (id) => {
    const { viewed } = this.state;
    if (viewed.includes(id)) return;

    this.setState(({ viewed }) => ({
      viewed: [...viewed, id],
    }));
  };

  increaseClickCount = () => {
    this.setState(({ clickCount }) => ({
      clickCount: clickCount += 1,
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
    this.increaseClickCount();
  }

  componentDidUpdate(prevProps) {
    const { infoMessages, successMessages, errorMessages, enqueueSnackbar, accessToken, getUnseenMessages } = this.props;
    const { viewed, clickCount } = this.state;

    // let allMessages = infoMessages.concat(successMessages, errorMessages);

    if (infoMessages !== prevProps.infoMessages) {

      if (clickCount === 3) {
        getUnseenMessages(accessToken);

        this.setState(({ viewed }) => ({
          viewed: [],
        }));
        this.setState(({ clickCount }) => ({
          clickCount: 0,
        }));
      }

      infoMessages.forEach((message) => {
        if (message === undefined) return;

        const timeInSeconds = 600;
        const options = {
          variant: "info",
          autoHideDuration: timeInSeconds * 1000,
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
      if (message === undefined) return;

      const timeInSeconds = 6;
      const options = {
        variant: "error",
        autoHideDuration: timeInSeconds * 1000,
        action: <IconButton key="close" aria-label="Close" color="inherit"><CheckIcon /></IconButton>,
      };
      setTimeout(() => {
        let messageSeen = viewed.includes(message.id);
        if (messageSeen) return;

        // Display message using notistack
        if (typeof enqueueSnackbar === "function") { enqueueSnackbar(message.message, options); }
        this.handleClose(message.id);
      }, 1);
    })

    successMessages.forEach((message) => {
      if (message === undefined) return;

      const timeInSeconds = 6;
      const options = {
        variant: "success",
        autoHideDuration: timeInSeconds * 1000,
        action: <IconButton key="close" aria-label="Close" color="inherit"><CheckIcon /></IconButton>,
      };
      setTimeout(() => {
        let messageSeen = viewed.includes(message.id);
        if (messageSeen) return;

        // Display message using notistack
        if (typeof enqueueSnackbar === "function") { enqueueSnackbar(message.message, options); }
        this.storeViewed(message.id);
        this.handleClose(message.id);
      }, 1);
    })
  }

  render() { return null; }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(SnackbarHandling));