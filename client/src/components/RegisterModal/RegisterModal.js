/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Grid, Modal, TextField } from '@material-ui/core';

import { register } from '../../actions/register';
import { closeModal } from '../../actions/modal';
import { REGISTER_MODAL } from '../../constants/environment';

const mapStateToProps = state => ({
    showRegisterModal: state.modal[REGISTER_MODAL],
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    register: (username, email, password) => dispatch(register(username, email, password)),
})

class RegisterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            matchingPassword: "",
            clicked: {
                username: false,
                email: false,
                password: false,
                matchingPassword: false,
            },
        }

        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePassInput = this.handlePassInput.bind(this);
        this.handleMatchingPassInput = this.handleMatchingPassInput.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
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
        this.props.closeModal();
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

    handleRegister() {
        const { username, email, password } = this.state;
        this.props.register(username, email, password);
        this.props.closeModal();
    }

    handleBlur = (field) => (e) => {
        this.setState({
            clicked: { ...this.state.clicked, [field]: true },
        });
    }

    canBeSubmitted() {
        const emptyInputErrors = this.hasEmptyInput();
        const invalidInputErrors = this.isValidInput();
        const emptyInput = Object.keys(emptyInputErrors).some(x => emptyInputErrors[x]);
        const isValidEmail = invalidInputErrors["email"];
        const isMatchingPasswords = invalidInputErrors["matchingPassword"];

        if (emptyInput) {
            return false;
        } else {
            if (isValidEmail && isMatchingPasswords) {
                return true;
            } else {
                return false;
            }
        }
    }

    render() {
        const emptyInput = this.hasEmptyInput();
        const isValidInput = this.isValidInput();
        const canBeSubmitted = this.canBeSubmitted();

        const emptyInputError = (field) => {
            const hasEmptyInput = emptyInput[field];
            const shouldShow = this.state.clicked[field];
            return hasEmptyInput ? shouldShow : false;
        };

        const invalidInputError = (field) => {
            const hasValidInput = isValidInput[field];
            const shouldShow = this.state.clicked[field];
            return hasValidInput ? false : shouldShow;
        };

        return (
            <Modal
                open={this.props.showRegisterModal || false}
                onClose={this.handleClose}
            >
                <div className="modal-box center-modal">
                    <Grid container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <TextField
                            label="Användarnamn"
                            name="username"
                            className={"register-input"}
                            onChange={this.handleUsernameInput}
                            value={this.state.username}
                            onBlur={this.handleBlur("username")}
                            error={emptyInputError("username") ? true : false}
                            helperText={emptyInputError("username") ? "Ange ett användarnamn." : " "}
                        />
                        <TextField
                            label="Mailadress"
                            name="email"
                            onChange={this.handleEmailInput}
                            value={this.state.email}
                            onBlur={this.handleBlur("email")}
                            error={invalidInputError("email") ? true : false}
                            helperText={invalidInputError("email") ? "Ange en korrekt mailadress." : " "}
                        />
                        <TextField
                            label="Lösenord"
                            name="password"
                            className={"register-input"}
                            inputProps={{
                                type: "password"
                            }}
                            onChange={this.handlePassInput}
                            value={this.state.password}
                            onBlur={this.handleBlur("password")}
                            error={emptyInputError("password") ? true : false}
                            helperText={emptyInputError("password") ? "Ange ett lösenord." : " "}
                        />
                        <TextField
                            label="Upprepa lösenord"
                            name="matchingPassword"
                            className={"register-input"}
                            inputProps={{
                                type: "password"
                            }}
                            onChange={this.handleMatchingPassInput}
                            value={this.state.matchingPassword}
                            onBlur={this.handleBlur("matchingPassword")}
                            error={emptyInputError("matchingPassword") ? true : "" || invalidInputError("matchingPassword") ? true : false}
                            helperText={invalidInputError("matchingPassword") ? "Ange samma lösenord igen." : " "}
                        />
                        <Grid item>
                            <Button type="button" color="primary" variant="outlined"
                                className="modal-submit-button"
                                onClick={this.handleRegister}
                                disabled={!canBeSubmitted}>
                                <span>Registrera</span>
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Modal >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);