/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Grid, Modal, TextField, withStyles } from '@material-ui/core';

import { closeModal, register } from '../../actions/authenticate';
import { REGISTER_MODAL } from '../../constants/environment';

const mapStateToProps = state => ({
    showRegisterModal: state.authentication[REGISTER_MODAL],
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    register: (username, email, password) => dispatch(register(username, email, password)),
})

// TODO: Change and place all these styles nonsense to assets/styles
function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: "absolute",
        width: theme.spacing.unit * 35,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

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
        const { classes } = this.props;
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
                <div style={getModalStyle()} className={classes.paper}>
                    <Grid container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <TextField
                            label="Användarnamn"
                            name="username"
                            className={"register-input"}
                            margin="normal"
                            onChange={this.handleUsernameInput}
                            value={this.state.username}
                            error={emptyInputError("username") ? true : false}
                            onBlur={this.handleBlur("username")}
                        />
                        <TextField
                            label="Mailadress"
                            name="email"
                            margin="normal"
                            onChange={this.handleEmailInput}
                            value={this.state.email}
                            error={invalidInputError("email") ? true : false}
                            onBlur={this.handleBlur("email")}
                        />
                        <TextField
                            label="Lösenord"
                            name="password"
                            className={"register-input"}
                            margin="normal"
                            inputProps={{
                                type: "password"
                            }}
                            onChange={this.handlePassInput}
                            value={this.state.password}
                            error={emptyInputError("password") ? true : false}
                            onBlur={this.handleBlur("password")}
                        />
                        <TextField
                            label="Upprepa lösenord"
                            name="matchingPassword"
                            className={"register-input"}
                            margin="normal"
                            inputProps={{
                                type: "password"
                            }}
                            onChange={this.handleMatchingPassInput}
                            value={this.state.matchingPassword}
                            error={emptyInputError("matchingPassword") ? true : "" || invalidInputError("matchingPassword") ? true : false}
                            onBlur={this.handleBlur("matchingPassword")}
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
                    <RegisterModalWrapped />
                </div>
            </Modal >
        );
    }
}

// We need an intermediary variable for handling the recursive nesting.
const RegisterModalWrapped = withStyles(styles)(RegisterModal);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModalWrapped);