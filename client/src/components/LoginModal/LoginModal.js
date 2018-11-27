/* eslint-disable react/sort-comp */
/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Grid, Modal, TextField } from '@material-ui/core';

import { login } from '../../actions/authenticate';
import { closeModal } from '../../actions/modal';
import { LOGIN_MODAL } from '../../constants/environment';

const mapStateToProps = state => ({
  showLoginModal: state.modal[LOGIN_MODAL],
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  login: (username, password) => dispatch(login(username, password)),
});

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameOrEmail: '',
      password: '',
      clicked: {
        usernameOrEmail: false,
        password: false,
      },
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handlePassInput = this.handlePassInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  hasEmptyInput() {
    const { usernameOrEmail, password } = this.state;
    return {
      usernameOrEmail: usernameOrEmail.length === 0,
      password: password.length === 0,
    };
  }

    handleClose = () => {
      const { closeModal } = this.props;
      closeModal();
    };

    handleUserInput(e) {
      this.setState({ usernameOrEmail: e.target.value });
    }

    handlePassInput(e) {
      this.setState({ password: e.target.value });
    }

    handleLogin() {
      const { usernameOrEmail, password } = this.state;
      const { login } = this.props;
      login(usernameOrEmail, password);
    }

    handleBlur = field => () => {
      const { clicked } = this.state;
      this.setState({
        clicked: { ...clicked, [field]: true },
      });
    }

    canBeSubmitted() {
      const emptyInputErrors = this.hasEmptyInput();
      const emptyInput = Object.keys(emptyInputErrors).some(x => emptyInputErrors[x]);

      if (emptyInput) {
        return false;
      }
      return true;
    }

    render() {
      const emptyInput = this.hasEmptyInput();
      const canBeSubmitted = this.canBeSubmitted();
      const { showLoginModal } = this.props;
      const { usernameOrEmail, password, clicked } = this.state;

      const emptyInputError = (field) => {
        const hasEmptyInput = emptyInput[field];
        const shouldShow = clicked[field];
        return hasEmptyInput ? shouldShow : false;
      };

      return (
        <Modal
          open={showLoginModal || false}
          onClose={this.handleClose}
        >
          <div className="modal-box center-modal">
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <TextField
                  error={!!emptyInputError('usernameOrEmail')}
                  label="Användarnamn"
                  name="usernameOrEmail"
                  className="login-input"
                  margin="normal"
                  onChange={this.handleUserInput}
                  value={usernameOrEmail}
                  onBlur={this.handleBlur('usernameOrEmail')}
                />
              </Grid>
              <Grid item>
                <TextField
                  error={!!emptyInputError('password')}
                  label="Lösenord"
                  name="password"
                  className="login-input"
                  margin="normal"
                  inputProps={{
                    type: 'password',
                  }}
                  onChange={this.handlePassInput}
                  value={password}
                  onBlur={this.handleBlur('password')}
                />
              </Grid>
              <Grid item>
                <Button
                  type="button"
                  color="primary"
                  variant="outlined"
                  className="modal-submit-button"
                  onClick={this.handleLogin}
                  disabled={!canBeSubmitted}
                >
                  <span>Logga in</span>
                </Button>
              </Grid>
            </Grid>
          </div>
        </Modal>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);