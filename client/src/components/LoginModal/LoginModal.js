/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Grid, Modal, TextField, withStyles } from '@material-ui/core';

import { closeModal, login } from '../../actions/authenticate';
import { LOGIN_MODAL } from '../../constants/environment';

const mapStateToProps = state => ({
    showLoginModal: state.authentication[LOGIN_MODAL],
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    login: (username, password) => dispatch(login(username, password)),
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

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: "",
            password: "",
            clicked: {
                usernameOrEmail: false,
                password: false,
            },
        }

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
        this.props.closeModal();
    };

    handleUserInput(e) {
        this.setState({ usernameOrEmail: e.target.value });
    }

    handlePassInput(e) {
        this.setState({ password: e.target.value });
    }

    handleLogin() {
        const { usernameOrEmail, password } = this.state;
        this.props.login(usernameOrEmail, password);
    }

    handleBlur = (field) => (e) => {
        this.setState({
            clicked: { ...this.state.clicked, [field]: true },
        });
    }

    canBeSubmitted() {
        const emptyInputErrors = this.hasEmptyInput();
        const emptyInput = Object.keys(emptyInputErrors).some(x => emptyInputErrors[x]);

        if (emptyInput) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        const { classes } = this.props;
        const emptyInput = this.hasEmptyInput();
        const canBeSubmitted = this.canBeSubmitted();

        const emptyInputError = (field) => {
            const hasEmptyInput = emptyInput[field];
            const shouldShow = this.state.clicked[field];
            return hasEmptyInput ? shouldShow : false;
        };

        return (
            <Modal
                open={this.props.showLoginModal || false}
                onClose={this.handleClose}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <Grid container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Grid item>
                            <TextField
                                error={emptyInputError("usernameOrEmail") ? true : false}
                                label="Användarnamn"
                                name="usernameOrEmail"
                                className="login-input"
                                margin="normal"
                                onChange={this.handleUserInput}
                                value={this.state.usernameOrEmail}
                                onBlur={this.handleBlur("usernameOrEmail")}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                error={emptyInputError("password") ? true : false}
                                label="Lösenord"
                                name="password"
                                className={"login-input"}
                                margin="normal"
                                inputProps={{
                                    type: "password"
                                }}
                                onChange={this.handlePassInput}
                                value={this.state.password}
                                onBlur={this.handleBlur("password")}
                            />
                        </Grid>
                        <Grid item>
                            <Button type="button" color="primary" variant="outlined"
                                className="modal-submit-button"
                                onClick={this.handleLogin}
                                disabled={!canBeSubmitted}>
                                <span>Logga in</span>
                            </Button>
                        </Grid>
                    </Grid>
                    <LoginModalWrapped />
                </div>
            </Modal>
        );
    }
}

// We need an intermediary variable for handling the recursive nesting.
const LoginModalWrapped = withStyles(styles)(LoginModal);

export default connect(mapStateToProps, mapDispatchToProps)(LoginModalWrapped);