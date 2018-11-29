import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Paper, Button, Table, TableHead, TableBody, TableRow, TableCell, withStyles,TextField} from '@material-ui/core';


import { getRoles, register } from '../../actions/userControl';


const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  role: state.authentication.role,
  roles: state.userController.roles,
});

const mapDispatchToProps = dispatch => ({ 
  onLoad: (accessToken) => dispatch(getRoles(accessToken)),
  register: (accessToken,usernameOrEmail, password, email, rolesSelected) => dispatch(register(accessToken,usernameOrEmail, password, email, rolesSelected))
});

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

class AdminUserControl extends Component {

  constructor(props){
    super(props);
    this.state= {
      usernameOrEmail: '',
      password: '',
      email: '',
      rolesSelected: []
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
    this.setState({ rolesSelected: e.target.value });
  }


  registerUser = () => {
    const { usernameOrEmail, password, email, rolesSelected } = this.state;
    const { register, accessToken } = this.props;
    let roles = [];
    roles.push(rolesSelected)
    register(accessToken,usernameOrEmail, password, email, roles);
  }

  render() {
    const { classes } = this.props;
    const { role } = this.props;
    const { roles } = this.props;
    const { usernameOrEmail, password, email, rolesSelected } = this.state;
    const emptyInputError = (field) => {

      return "hej"
    };

    return(
      <div>
          {
            role === "ROLE_ADMIN" ?
            <Paper className={classes.root}>
            <TextField
                                label="Användarnamn"
                                name="usernameOrEmail"
                                onChange={this.handleUserInput}
                                value={usernameOrEmail}
                                helperText={emptyInputError("usernameOrEmail") ? "Ange ett användarnamn." : " "}
                            />
            <TextField
                                label="Lösenord"
                                name="password"
                                onChange={this.handlePassInput}
                                value={password}
                                helperText={emptyInputError("password") ? "Ange ett lösenord." : " "}
                            />
            <TextField
                                label="Email"
                                name="email"
                                onChange={this.handleEmail}
                                value={email}
                                helperText={emptyInputError("email") ? "Ange en email adress." : " "}
                            />
                                <TextField
                                label="Roles"
                                name="roles"
                                onChange={this.handleRoles}
                                value={rolesSelected}
                                helperText={emptyInputError("rolesSelected") ? "Ange roller." : " "}
                            />
                            <Button type="button" color="primary" variant="outlined"
                                className="modal-submit-button"
                                onClick={this.registerUser}
                                >
                                <span>Registrera</span>
                            </Button>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Tillgängliga roller</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles && roles.map(role => (
                  <TableRow key={role.name}>
                    <TableCell>{role.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper> : 
          null
          }
     
     </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminUserControl));
