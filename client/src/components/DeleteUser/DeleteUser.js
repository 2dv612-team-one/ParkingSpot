import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Button } from '@material-ui/core';
import { deleteUser } from '../../actions/userControl';
import {logout} from "../../actions/authenticate";

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
});

const mapDispatchToProps = dispatch => ({
  deleteUser: (accessToken) => dispatch(deleteUser(accessToken)),
  logout: () => dispatch(logout()),
});

class DeleteUser extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { accessToken } = this.props;
    deleteUser(accessToken);

    const { logout } = this.props;
    logout();
  }

  render() {

    return (
      <div className='delete-user'>
        <Button
          variant="extendedFab"
          className="delete-user"
          onClick={() => { if (window.confirm('Är du säker på att du villa ta bort ditt konto?')) this.handleDelete()} }
        >
          Ta bort konto
        </Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser);
