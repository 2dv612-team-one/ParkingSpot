import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import {
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  withStyles,
  Paper,
  Typography,
} from '@material-ui/core';

import { getRoles, register } from '../../actions/userControl';
import styles from '../../assets/styles/admin-user-control';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  role: state.authentication.role,
  roles: state.userController.roles,
});

const mapDispatchToProps = dispatch => ({
  onLoad: accessToken => dispatch(getRoles(accessToken)),
  register: (accessToken, username, password, email, selectedRoles) => dispatch(register(accessToken, username, password, email, selectedRoles)),
});

class AdminUserControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      selectedRoles: [],
      clicked: {
        username: false,
        email: false,
        password: false,
        selectedRoles: false,
      },
    };

    this.handleUsernameInput = this.handleUsernameInput.bind(this);
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

  // eslint-disable-next-line react/sort-comp
  handleUsernameInput(e) {
    this.setState({ username: e.target.value });
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
    const { username, password, email, selectedRoles } = this.state;
    const { register, accessToken } = this.props;
    register(accessToken, username, password, email, selectedRoles);
  }

  isValidInput() {
    const { email } = this.state;
    return {
      email: email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i),
    };
  }

  handleBlur = field => () => {
    const { clicked } = this.state;
    this.setState({
      clicked: { ...clicked, [field]: true },
    });
  }

  hasEmptyInput() {
    const { username, email, password, selectedRoles } = this.state;
    return {
      username: username.length === 0,
      email: email.length === 0,
      password: password.length === 0,
      selectedRoles: selectedRoles.length === 0,
    };
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

  render() {
    const { classes } = this.props;
    const { role } = this.props;
    const { roles } = this.props;
    const { username, password, email, selectedRoles, clicked } = this.state;
    const emptyInput = this.hasEmptyInput();
    const isValidInput = this.isValidInput();
    const canBeSubmitted = this.canBeSubmitted();

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
      <div>
        {
          role === 'ROLE_ADMIN'
            ? (
              <Paper className="admin-register-form">
                <Typography variant="subtitle1">Lägg till en ny användare</Typography>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Användarnamn"
                    name="username"
                    onChange={this.handleUsernameInput}
                    value="a"
                    // value={username}
                    onBlur={this.handleBlur('username')}
                    error={emptyInputError('username')}
                  />
                  <FormHelperText>{emptyInputError('username') ? 'Ange ett användarnamn.' : ' '}</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Email"
                    name="email"
                    onChange={this.handleEmail}
                    value="a@a.com"
                    // value={email}
                    onBlur={this.handleBlur('email')}
                    error={invalidInputError('email')}
                  />
                  <FormHelperText>{invalidInputError('email') ? 'Ange en korrekt mailadress.' : ' '}</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Lösenord"
                    name="password"
                    value="a"
                    // value={password}
                    onChange={this.handlePassInput}
                    onBlur={this.handleBlur('password')}
                    error={emptyInputError('password')}
                  />
                  <FormHelperText>{emptyInputError('password') ? 'Ange ett lösenord.' : ' '}</FormHelperText>
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
                    onBlur={this.handleBlur('selectedRoles')}
                    error={emptyInputError('selectedRoles')}
                  >
                    {roles.map(role => (
                      <MenuItem key={role.name} value={role.name}>
                        <Checkbox className="app-color" checked={selectedRoles.indexOf(role.name) > -1} />
                        <ListItemText primary={role.name} />
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{emptyInputError('selectedRoles') ? 'Välj roller.' : ' '}</FormHelperText>
                </FormControl>
                <Button
                  type="button"
                  variant="outlined"
                  className={classes.button}
                  id="admin-register-user-btn"
                  onClick={this.registerUser}
                  disabled={!canBeSubmitted}
                >
                  <span>Lägg till</span>
                </Button>
                
              </Paper>
            )
            : null
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminUserControl));
