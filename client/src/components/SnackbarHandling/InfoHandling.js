import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { closeSnackBar } from '../../actions/snackbar';
import InfoMessageSnackbar from './SnackbarMessage';
import CheckIcon from '@material-ui/icons/Check';

const mapStateToProps = state => ({
  showInfo: state.message.showInfo,
  infoMessage: state.message.message,
});

const mapDispatchToProps = dispatch => ({
  closeSnackBar: () => dispatch(closeSnackBar()),
});

class InfoHandling extends Component {
  handleClose = (event, reason) => {
    const { closeSnackBar } = this.props;
    if (reason === 'clickaway') {
      return;
    }
    closeSnackBar();
  };

  render() {
    const { infoMessage, showInfo } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={showInfo}
          onClose={this.handleClose}
        >
          <InfoMessageSnackbar
            onClose={this.handleClose}
            variant="info"
            message={infoMessage}
            IconStyle={CheckIcon}
          />
        </Snackbar>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoHandling);