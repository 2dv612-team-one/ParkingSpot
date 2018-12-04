import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Button, Checkbox, Chip, FormControl, FormHelperText, Input, InputLabel, ListItemText, MenuItem, Select, TextField, withStyles, Paper, Typography } from '@material-ui/core';
import { addArea } from '../../actions/parkingArea';

const mapStateToProps = state => ({
    accessToken: state.authentication.accessToken,
    role: state.authentication.role,
});

const mapDispatchToProps = dispatch => ({
    addArea: (accessToken, name, coords) => dispatch(addArea(accessToken, name, coords))
});

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class AddParkingArea extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     username: '',
        //     password: '',
        //     email: '',
        //     selectedRoles: [],
        //     clicked: {
        //         username: false,
        //         email: false,
        //         password: false,
        //         selectedRoles: false,
        //     },
        // }

        // this.handleUserInput = this.handleUserInput.bind(this);
        // this.handlePassInput = this.handlePassInput.bind(this);
        // this.handleEmail = this.handleEmail.bind(this);
        // this.handleRoles = this.handleRoles.bind(this);
        // this.registerUser = this.registerUser.bind(this);
    }

    componentWillMount() {
        // const { onLoad } = this.props;
        // const { accessToken } = this.props;
        // onLoad(accessToken);
    }

    // handleUserInput(e) {
    //     this.setState({ username: e.target.value });
    // }

    // handlePassInput(e) {
    //     this.setState({ password: e.target.value });
    // }

    // handleEmail(e) {
    //     this.setState({ email: e.target.value });
    // }

    // handleRoles(e) {
    //     this.setState({ selectedRoles: e.target.value });
    // }

    // registerUser = () => {
    //     const { username, password, email, selectedRoles } = this.state;
    //     const { register, accessToken } = this.props;
    //     register(accessToken, username, password, email, selectedRoles);
    // }


    // handleBlur = field => () => {
    //     const { clicked } = this.state;
    //     this.setState({
    //         clicked: { ...clicked, [field]: true },
    //     });
    // }

    // hasEmptyInput() {
    //     const { username, email, password, selectedRoles } = this.state;
    //     return {
    //         username: username.length === 0,
    //         email: email.length === 0,
    //         password: password.length === 0,
    //         selectedRoles: selectedRoles.length === 0,
    //     };
    // }

    // canBeSubmitted() {
    //     const emptyInputErrors = this.hasEmptyInput();
    //     const invalidInputErrors = this.isValidInput();
    //     const emptyInput = Object.keys(emptyInputErrors).some(x => emptyInputErrors[x]);
    //     const isValidEmail = invalidInputErrors.email;

    //     if (emptyInput) {
    //         return false;
    //     }
    //     if (isValidEmail) {
    //         return true;
    //     }
    //     return false;
    // }

    render() {
        //const { classes } = this.props;
        const { role } = this.props;
        // const { roles } = this.props;
        // const { username, password, email, selectedRoles, clicked } = this.state;
        // const emptyInput = this.hasEmptyInput();
        // const isValidInput = this.isValidInput();
        // const canBeSubmitted = this.canBeSubmitted();

        // const emptyInputError = (field) => {
        //     const hasEmptyInput = emptyInput[field];
        //     const shouldShow = clicked[field];
        //     return hasEmptyInput ? shouldShow : false;
        // };

        // const invalidInputError = (field) => {
        //     const hasValidInput = isValidInput[field];
        //     const shouldShow = clicked[field];
        //     return hasValidInput ? false : shouldShow;
        // };

        return (
            <div>
                {
                    role === "ROLE_PARKING_OWNER" ?
                        <span>{role}</span>
                        :
                        null
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddParkingArea));