import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { changePassword } from '../../actions/updateInformation';

const mapStateToProps = state => ({
    accessToken: state.authentication.accessToken,  
  });
  
  const mapDispatchToProps = dispatch => ({
    changePassword: (accessToken, password) => dispatch(changePassword(accessToken, password)),
  });

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      password: ''
    };

    this.handlePasswordInput = this.handlePasswordInput.bind(this);   
  }
 

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handlePasswordInput = (e) => {
    this.setState({ password: e.target.value });
  };

  changePassword = () => {
    const {password} = this.state;
    const {accessToken} = this.props;
    if(password.length === 0){
      return;
    }
    changePassword(accessToken, password);
    this.setState({ open: false });
  }

  render() {
    const {password} = this.state;
    return (
      <div>               
            <Button onClick={this.handleClickOpen} color="inherit" >Change Password</Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">New Password</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter new password
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="New Password"
                  type="text"
                  fullWidth
                  value={password}
                  onChange={this.handlePasswordInput}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.changePassword} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>  
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
