/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles, Input, Button, Modal } from '@material-ui/core';

import { closeModal, register } from '../../actions/authenticate';
import { REGISTER_MODAL } from '../../constants/environment';

const mapStateToProps = state => ({
    showRegisterModal: state.authentication[REGISTER_MODAL],
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    register: (username, email, password) => dispatch(register(username, email, password)),
})


// TODO: Change and place all these math-styles nonsense to assets/styles
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class RegisterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
        }

        this.handleUsernameInput = this.handleUsernameInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePassInput = this.handlePassInput.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
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

    handleRegister() {
        const { username, email, password } = this.state;
        this.props.register(username, email, password);
    }

    render() {
        const { classes } = this.props;

        return (
            <Modal
                aria-labelledby="register-modal"
                aria-describedby="modal-for-register"
                open={this.props.showRegisterModal || false}
                onClose={this.handleClose}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <Input
						placeholder="Användarnamn"
						name="usernameOrEmail"
						className="register-input"
						onChange={this.handleUsernameInput}
						value={this.state.username}
					/>
                    <Input
						placeholder="Mailadress"
						name="usernameOrEmail"
						className="register-input"
						onChange={this.handleEmailInput}
						value={this.state.email}
					/>
                    {/* TODO check password with repeated password if they match*/}
					<Input
						placeholder='Lösenord'
						name='password'
						className={'register-input'}
						inputProps={{
							type: 'password'
						}}
						onChange={this.handlePassInput}
						value={this.state.password}
					/>
					<Input
						placeholder='Upprepa lösenord'
						name='password2'
						className={'register-input'}
						inputProps={{
							type: 'password'
						}}
					/>
                    <Button type="button" color="inherit" onClick={this.handleRegister}>
                        <span>Registrera</span>
                    </Button>
            <RegisterModalWrapped />
                </div>
            </Modal>
        );
    }
}

// We need an intermediary variable for handling the recursive nesting.
const RegisterModalWrapped = withStyles(styles)(RegisterModal);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModalWrapped);