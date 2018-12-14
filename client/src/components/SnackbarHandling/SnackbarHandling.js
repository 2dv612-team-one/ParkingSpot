/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { removeSnackbar, markMessageViewed } from '../../actions/snackbar';
import { IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

class SnackbarHandling extends Component {
  state = {
    viewed: [],
    clicked: [],
  };

  storeViewed = (id) => {
    this.setState(({ viewed }) => ({
      viewed: [...viewed, id],
    }));
  };

  storeClicked = (id) => {
    this.setState(({ clicked }) => ({
      clicked: [...clicked, id],
    }));
  };

  showMessage = (id) => {
    const { viewed } = this.state;
    let filteredList = viewed.filter(messageId => messageId !== id)
    this.setState({ viewed: filteredList });
  }

  handleClose = (id) => {
    const { removeSnackbar } = this.props;
    removeSnackbar(id);
  };

  handleViewed = (id) => {
    const { markMessageViewed, removeSnackbar } = this.props;
    markMessageViewed();
    removeSnackbar(id);
    this.storeClicked(id);
  };

  render() {
    const { infoMessages, errorMessages, enqueueSnackbar } = this.props;
    const { viewed, clicked } = this.state;

    let allMessages = infoMessages.concat(errorMessages);
    // console.log("__ALL MESSAGES__HERE__");
    // console.log(allMessages);

    let messagesToShow = infoMessages.slice(infoMessages.length - 3, infoMessages.length).reverse();
    messagesToShow.forEach(message => {
      // this.showMessage(message.id)
    });

    // console.log(messagesToShow);
    // console.log(viewed);

    messagesToShow.forEach((message) => {
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
        let messageSeen = viewed.indexOf(message.id) > -1;
        let messageClicked = clicked.indexOf(message.id) > -1;
        if (messageSeen) return;
        if (messageClicked === false) {

          // Display message using notistack
          if (typeof enqueueSnackbar === "function") { enqueueSnackbar(message.message, options); }

          // Add message"s id to the local state
          this.storeViewed(message.id);
        }
      }, 1);
    })

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

    return null;
  }
}

const mapStateToProps = state => ({
  infoMessages: state.message.messages,
  errorMessages: state.error.messages,
});

const mapDispatchToProps = dispatch => ({
  removeSnackbar: (id) => dispatch(removeSnackbar(id)),
  markMessageViewed: () => dispatch(markMessageViewed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(SnackbarHandling));