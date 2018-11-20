/* eslint import/no-webpack-loader-syntax: off */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles, Input, Button, Modal } from '@material-ui/core';

import { closeModal, login } from '../../actions/authenticate';

const mapStateToProps = state => ({
    showLoginModal: state.authentication.showLoginModal,
});

const mapDispatchToProps = dispatch => ({
    closeLoginModal: () => dispatch(closeModal()),
    login: (username, password) => dispatch(login(username, password)),
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

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: '',
            password: '',
        }

        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlePassInput = this.handlePassInput.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleClose = () => {
        this.props.closeLoginModal();
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

    render() {
        const { classes } = this.props;

        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.props.showLoginModal || false}
                onClose={this.handleClose}
            >
                <div style={getModalStyle()} className={classes.paper}>
                <Input
						placeholder="Användarnamn"
						name="usernameOrEmail"
						className="login-input"
						onChange={this.handleUserInput}
						value={this.state.usernameOrEmail}
					/>
					<Input
						placeholder='Lösenord'
						name='password'
						className={'login-input'}
						inputProps={{
							type: 'password'
						}}
						onChange={this.handlePassInput}
						value={this.state.password}
					/>
                    <Button type="button" color="inherit" onClick={this.handleLogin}>
                        <span>Logga in</span>
                    </Button>
            <LoginModalWrapped />
                </div>
            </Modal>
        );
    }
}

// We need an intermediary variable for handling the recursive nesting.
const LoginModalWrapped = withStyles(styles)(LoginModal);

export default connect(mapStateToProps, mapDispatchToProps)(LoginModalWrapped);