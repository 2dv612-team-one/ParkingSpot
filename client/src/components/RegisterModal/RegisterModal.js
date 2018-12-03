/* eslint-disable react/sort-comp */
/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Grid, Modal, TextField } from '@material-ui/core';

import register from '../../actions/register';
import { closeModal } from '../../actions/modal';
import { REGISTER_MODAL } from '../../constants/environment';

const mapStateToProps = state => ({
  showRegisterModal: state.modal[REGISTER_MODAL],
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  register: (username, email, password, role) => dispatch(register(username, email, password, role)),
});

class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      matchingPassword: '',
      role: '',
      clicked: {
        username: false,
        email: false,
        password: false,
        matchingPassword: false,
        role: false,
      },
    };

    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePassInput = this.handlePassInput.bind(this);
    this.handleMatchingPassInput = this.handleMatchingPassInput.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleRoleInput = this.handleRoleInput.bind(this);
  }

  onKeyPress= (e) => {
    if (e.key === 'Enter') {
      this.handleRegister();
    }
  }

  isValidInput() {
    const { email, password, matchingPassword } = this.state;
    return {
      email: email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i),
      matchingPassword: password === matchingPassword,
    };
  }

  hasEmptyInput() {
    const { username, email, password, matchingPassword } = this.state;
    return {
      username: username.length === 0,
      email: email.length === 0,
      password: password.length === 0,
      matchingPassword: matchingPassword.length === 0,
    };
  }

    handleClose = () => {
      const { closeModal } = this.props;
      closeModal();
    };

    handleUsernameInput(e) {
      this.setState({ username: e.target.value });
    }

    handleEmailInput(e) {
      this.setState({ email: e.target.value });
    }

    handlePassInput(e) {
      this.setState({ password: e.target.value });
    }

    handleMatchingPassInput(e) {
      this.setState({ matchingPassword: e.target.value });
    }

    handleRoleInput(e) {
      this.setState({ role: e.target.value });
    }

    handleRegister() {
      const { username, email, password } = this.state;
      this.props.register(username, email, password);
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
      const isValidEmail = invalidInputErrors.email;
      const isMatchingPasswords = invalidInputErrors.matchingPassword;

      if (emptyInput) {
        return false;
      }
      if (isValidEmail && isMatchingPasswords) {
        return true;
      }
      return false;
    }

    render() {
      const emptyInput = this.hasEmptyInput();
      const isValidInput = this.isValidInput();
      const canBeSubmitted = this.canBeSubmitted();
      const { clicked, username, email, password, matchingPassword, role } = this.state;
      const { showRegisterModal } = this.props;

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
        <Modal
          open={showRegisterModal || false}
          onClose={this.handleClose}
        >
          <div className="modal-box">
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
              <div className="modal-box">
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="center"
                >
                  <TextField
                    label="Användarnamn"
                    name="username"
                    className="register-input"
                    onChange={this.handleUsernameInput}
                    value={username}
                    onBlur={this.handleBlur('username')}
                    error={!!emptyInputError('username')}
                    helperText={emptyInputError('username') ? 'Ange ett användarnamn.' : ' '}
                  />
                  <TextField
                    label="Mailadress"
                    name="email"
                    onChange={this.handleEmailInput}
                    value={email}
                    onBlur={this.handleBlur('email')}
                    error={!!invalidInputError('email')}
                    helperText={invalidInputError('email') ? 'Ange en korrekt mailadress.' : ' '}
                  />
                  <TextField
                    label="Lösenord"
                    name="password"
                    className="register-input"
                    inputProps={{
                      type: 'password',
                    }}
                    onChange={this.handlePassInput}
                    value={password}
                    onBlur={this.handleBlur('password')}
                    error={!!emptyInputError('password')}
                    helperText={emptyInputError('password') ? 'Ange ett lösenord.' : ' '}
                  />
                  <TextField
                    label="Upprepa lösenord"
                    name="matchingPassword"
                    className="register-input"
                    inputProps={{
                      type: 'password',
                    }}
                    onChange={this.handleMatchingPassInput}
                    value={matchingPassword}
                    onBlur={this.handleBlur('matchingPassword')}
                    error={emptyInputError('matchingPassword') ? true : !!('' || invalidInputError('matchingPassword'))}
                    helperText={invalidInputError('matchingPassword') ? 'Ange samma lösenord igen.' : ' '}
                  />
                  <TextField
                    label="Roll"
                    name="role"
                    className="register-input"
                    onChange={this.handleRoleInput}
                    value={role}
                    onBlur={this.handleBlur('role')}
                    error={!!emptyInputError('role')}
                    helperText={emptyInputError('role') ? 'Ange en roll.' : ' '}
                  />
                  <Grid item>
                    <Button
                      type="button"
                      color="primary"
                      variant="outlined"
                      className="modal-submit-btn"
                      onClick={this.handleRegister}
                      disabled={!canBeSubmitted}
                    >
                      <span>Registrera</span>
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </div>
        </Modal>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
