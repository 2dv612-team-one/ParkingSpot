import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { sendMessage } from '../../actions/userControl';

const mapStateToProps = state => ({
    accessToken: state.authentication.accessToken,  
  });
  
  const mapDispatchToProps = dispatch => ({
    sendMessage: (accessToken, message) => dispatch(sendMessage(accessToken, message)),
  });

class AddMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: ''
    };

    this.handleMessage = this.handleMessage.bind(this);   
  }
 

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleMessage = (e) => {
    this.setState({ message: e.target.value });
  };

  sendMessage = () => {
    const {message} = this.state;
    const {accessToken} = this.props;
    debugger;
    sendMessage(accessToken, message);
    this.setState({ open: false });
  }

  render() {
    const {message} = this.state;
    return (
      <div>
        <Button onClick={this.handleClickOpen}>Open form dialog</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the message that should be broadcasted
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Message"
              type="text"
              fullWidth
              value={message}
              onChange={this.handleMessage}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.sendMessage} color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMessage);
