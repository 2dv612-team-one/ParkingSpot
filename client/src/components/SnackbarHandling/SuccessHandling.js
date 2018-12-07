import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { closeSnackBar } from '../../actions/snackbar';
import SuccessMessageSnackbar from './SnackbarMessage';
import CloseIcon from '@material-ui/icons/Close';

const mapStateToProps = state => ({
  showSuccess: state.success.showSuccess,
  successMessage: state.success.message,
});

const mapDispatchToProps = dispatch => ({
  closeSnackBar: () => dispatch(closeSnackBar()),
});

class SuccessHandling extends Component {
  handleClose = (event, reason) => {
    const { closeSnackBar } = this.props;
    if (reason === 'clickaway') {
      return;
    }

    closeSnackBar();
  };

  render() {
    const { successMessage, showSuccess } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={showSuccess}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <SuccessMessageSnackbar
            onClose={this.handleClose}
            variant="success"
            message={successMessage}
            IconStyle={CloseIcon}
          />
        </Snackbar>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessHandling);