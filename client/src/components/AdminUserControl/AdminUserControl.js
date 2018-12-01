import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Button, Checkbox, Chip, FormControl, FormHelperText, Input, InputLabel, ListItemText, MenuItem, Select, TextField, withStyles } from '@material-ui/core';
import { getRoles, register } from '../../actions/userControl';

const mapStateToProps = state => ({
    accessToken: state.authentication.accessToken,
    role: state.authentication.role,
    roles: state.userController.roles,
});

const mapDispatchToProps = dispatch => ({
    onLoad: (accessToken) => dispatch(getRoles(accessToken)),
    register: (accessToken, usernameOrEmail, password, email, selectedRoles) => dispatch(register(accessToken, usernameOrEmail, password, email, selectedRoles))
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class AdminUserControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: '',
            password: '',
            email: '',
            selectedRoles: []
        }

        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlePassInput = this.handlePassInput.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleRoles = this.handleRoles.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    componentWillMount() {
        const { onLoad } = this.props;
        const { accessToken } = this.props;
        onLoad(accessToken);
    }

    handleUserInput(e) {
        this.setState({ usernameOrEmail: e.target.value });
    }

    handlePassInput(e) {
        this.setState({ password: e.target.value });
    }

    handleEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleRoles(e) {
        this.setState({ selectedRoles: e.target.value });
    }

    registerUser = () => {
        const { usernameOrEmail, password, email, selectedRoles } = this.state;
        const { register, accessToken } = this.props;
        register(accessToken, usernameOrEmail, password, email, selectedRoles);
    }

    render() {
        const { classes } = this.props;
        const { role } = this.props;
        const { roles } = this.props;
        const { usernameOrEmail, password, email, selectedRoles } = this.state;
        const emptyInputError = (field) => {

            return "hej"
        };

        return (
            <div>
                {
                    role === "ROLE_ADMIN" ?
                        <form className="admin-register-form">
                            <FormControl className={classes.formControl}>
                                <TextField
                                    label="Användarnamn"
                                    name="usernameOrEmail"
                                    onChange={this.handleUserInput}
                                    value={usernameOrEmail}
                                    helperText={emptyInputError("usernameOrEmail") ? "Ange ett användarnamn." : " "}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    label="Lösenord"
                                    name="password"
                                    onChange={this.handlePassInput}
                                    value={password}
                                    helperText={emptyInputError("password") ? "Ange ett lösenord." : " "}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    onChange={this.handleEmail}
                                    value={email}
                                    helperText={emptyInputError("email") ? "Ange en email adress." : " "}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="select-roles">Roller</InputLabel>
                                <Select
                                    multiple
                                    value={selectedRoles}
                                    onChange={this.handleRoles}
                                    input={<Input id="select-roles" />}
                                    renderValue={selected => (
                                        <div className={classes.chips}>
                                            {selected.map(value => (
                                                <Chip key={value} label={value} className={classes.chip} />
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {roles.map(role => (
                                        <MenuItem key={role.name} value={role.name}>
                                            <Checkbox className="app-theme-color" checked={selectedRoles.indexOf(role.name) > -1} />
                                            <ListItemText primary={role.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{emptyInputError("selectedRoles") ? "Ange roller." : " "}</FormHelperText>
                            </FormControl>
                            <Button type="button" variant="outlined" className={`app-theme-color ${classes.button}`}
                                id="admin-register-user-btn" onClick={this.registerUser}>
                                <span>Registrera</span>
                            </Button>
                        </form> :
                        null
                }

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminUserControl));