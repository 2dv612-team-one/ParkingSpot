import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { closeSnackBar } from '../../actions/snackbar';
import ErrorMessageSnackbar from './SnackbarMessage';
import CloseIcon from '@material-ui/icons/Close';

const mapStateToProps = state => ({
  showError: state.error.showError,
  errorMessage: state.error.message,
});

const mapDispatchToProps = dispatch => ({
  closeSnackBar: () => dispatch(closeSnackBar()),
});

class ErrorHandling extends Component {
  handleClose = (event, reason) => {
    const { closeSnackBar } = this.props;
    if (reason === 'clickaway') {
      return;
    }

    closeSnackBar();
  };

  render() {
    const { errorMessage, showError } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={showError}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <ErrorMessageSnackbar
            onClose={this.handleClose}
            variant="error"
            message={errorMessage}
            IconStyle={CloseIcon}
          />
        </Snackbar>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandling);