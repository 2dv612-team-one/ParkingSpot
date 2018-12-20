import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TextField, FormHelperText } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { changeEmail } from '../../actions/updateInformation';

const mapStateToProps = state => ({
    accessToken: state.authentication.accessToken,
});

const mapDispatchToProps = dispatch => ({
    changeEmail: (accessToken, email) => dispatch(changeEmail(accessToken, email)),
});

class ChangeEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            email: '',
            clicked: {
                email: false,
            },
        };

        this.handleEmailInput = this.handleEmailInput.bind(this);
    }

    isValidInput() {
        const { email } = this.state;
        return {
            email: email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i),
        };
    }

    hasEmptyInput() {
        const { email } = this.state;
        return {
            email: email.length === 0,
        };
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

        if (emptyInput) {
            return false;
        }
        if (isValidEmail) {
            return true;
        }
        return false;
    }


    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleEmailInput = (e) => {
        this.setState({ email: e.target.value });
    };

    changeEmail = () => {
        const { email } = this.state;
        const { accessToken, changeEmail } = this.props;
        if (!this.canBeSubmitted()) {
            return;
        }

        changeEmail(accessToken, email);
        this.setState({ open: false });
    }

    render() {
        const { clicked, email } = this.state;
        const emptyInput = this.hasEmptyInput();
        const isValidInput = this.isValidInput();
        const canBeSubmitted = this.canBeSubmitted();
        const invalidInputError = (field) => {
            const hasValidInput = isValidInput[field];
            const shouldShow = clicked[field];
            return hasValidInput ? false : shouldShow;
        };
        const emptyInputError = (field) => {
            const hasEmptyInput = emptyInput[field];
            const shouldShow = clicked[field];
            return hasEmptyInput ? shouldShow : false;
        };

        return (
            <div>
                <Button onClick={this.handleClickOpen} color="inherit" >Byt e-postadress</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Byt e-postadress</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Ny e-postadress"
                            fullWidth
                            value={email}
                            type="email"
                            onBlur={this.handleBlur('email')}
                            onChange={this.handleEmailInput}
                            error={invalidInputError('email')}
                        />
                        <FormHelperText>{emptyInputError('email') ? 'Ange en tidigare oanvänd e-postadress.' : ' '}</FormHelperText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Avbryt
                        </Button>
                        <Button
                            onClick={this.changeEmail}
                            disabled={!canBeSubmitted}
                            color="primary"
                        >
                            Spara
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmail);