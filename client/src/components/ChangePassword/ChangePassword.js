import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
      password: '',
      matchingPassword: '',
      clicked: {
        password: false,
        matchingPassword: false,
      },
    };

    this.handlePassInput = this.handlePassInput.bind(this);
    this.handleMatchingPassInput = this.handleMatchingPassInput.bind(this);
  }

  isValidInput() {
    const { password, matchingPassword } = this.state;
    return {
      matchingPassword: password === matchingPassword,
    };
  }

  hasEmptyInput() {
    const { password, matchingPassword } = this.state;
    return {
      password: password.length === 0,
      matchingPassword: matchingPassword.length === 0,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handlePassInput(e) {
    this.setState({ password: e.target.value });
  }

  handleMatchingPassInput(e) {
    this.setState({ matchingPassword: e.target.value });
  }

  changePassword = () => {
    const { password } = this.state;
    const { accessToken, changePassword } = this.props;
    if (password.length === 0) {
      return;
    }
    changePassword(accessToken, password);
    this.setState({ open: false });
  }

  handleBlur = field => () => {
    const { clicked } = this.state;
    this.setState({
      clicked: { ...clicked, [field]: true },
    });
  }

  canBeSubmitted() {
    const emptyInputErrors = this.hasEmptyInput();
    const invalidInputErrors = this.isValidInput();
    const emptyInput = Object.keys(emptyInputErrors).some(x => emptyInputErrors[x]);
    const isMatchingPasswords = invalidInputErrors.matchingPassword;

    if (emptyInput) {
      return false;
    }
    if (isMatchingPasswords) {
      return true;
    }
    return false;
  }

  render() {
    const emptyInput = this.hasEmptyInput();
    const isValidInput = this.isValidInput();
    const canBeSubmitted = this.canBeSubmitted();
    const { clicked, password, matchingPassword } = this.state;

    const emptyInputError = (field) => {
      const hasEmptyInput = emptyInput[field];
      const shouldShow = clicked[field];
      return hasEmptyInput ? shouldShow : false;
    };

    const invalidInputError = (field) => {
      const hasValidInput = isValidInput[field];
      const shouldShow = clicked[field];
      return hasValidInput ? false : shouldShow;
    };

    return (
      <div>
        <Button onClick={this.handleClickOpen} color="inherit" >Byt lösenord</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Byt lösenord</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus={true}
              label="Nytt lösenord"
              name="password"
              onChange={this.handlePassInput}
              value={password}
              type="password"
              onBlur={this.handleBlur('password')}
              error={emptyInputError('password')}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              label="Upprepa lösenord"
              name="matchingPassword"
              inputProps={{
                type: 'password',
              }}
              onChange={this.handleMatchingPassInput}
              value={matchingPassword}
              onBlur={this.handleBlur('matchingPassword')}
              error={emptyInputError('matchingPassword') ? true : ('' || invalidInputError('matchingPassword'))}
            />
          </DialogContent>
          <DialogActions>
            <Button
              type="button"
              color="primary"
              onClick={this.handleClose}
            >
              <span>Avbryt</span>
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={this.changePassword}
              disabled={!canBeSubmitted}
            >
              <span>Spara</span>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);