import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteUser } from '../../actions/userControl';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
});

const mapDispatchToProps = dispatch => ({
  deleteUser: (accessToken) => dispatch(deleteUser(accessToken)),
});

class DeleteUser extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { accessToken } = this.props;
    deleteUser(accessToken);
  }

  render() {

    return (
      <div className='delete-user'>
        <Button
          variant="contained"
          aria-label="Delete"
          className="btn delete-user is-danger has-white-text"
          onClick={this.handleDelete}
        >
          <DeleteIcon className="btn-icon" />
          Ta bort konto
        </Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser);