import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import InfoMessageSnackbar from './InfoMessage';
import { closeSnackBar } from '../../actions/snackbar';

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
          />
        </Snackbar>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoHandling);