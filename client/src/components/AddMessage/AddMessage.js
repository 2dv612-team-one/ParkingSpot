import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { sendMessage } from '../../actions/userControl';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  role: state.authentication.role,
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

    this.onKeyPress = this.onKeyPress.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
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
    const { message } = this.state;
    const { accessToken } = this.props;
    sendMessage(accessToken, message);
    this.setState({ open: false });
  }

  render() {
    const { message } = this.state;
    const { role } = this.props;
    return (
      <div>
        {
          role === 'ROLE_ADMIN'
            ? (
              <Paper>
                <Button onClick={this.handleClickOpen}>Broadcast</Button>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Broadcast</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Skriv in meddelandet som ska skickas ut
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
                      onKeyPress={this.onKeyPress}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Avbryt
                </Button>
                    <Button onClick={this.sendMessage} color="primary">
                      Skicka
                </Button>
                  </DialogActions>
                </Dialog>
              </Paper>

            )
            : null
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMessage);