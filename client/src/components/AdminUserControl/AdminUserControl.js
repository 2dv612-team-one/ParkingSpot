import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Paper, Button, TextField, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HideIcon from '@material-ui/icons/Remove';
import SaveIcon from '@material-ui/icons/Save';

import { addCar } from '../../actions/vehicle';


const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  role: state.authentication.role,
});

// const mapDispatchToProps = dispatch => ({
//   role: 
// });

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

class AdminUserControl extends Component {
  constructor(props) {
    super(props);
  
  }



  render() {
    const { classes } = this.props;
    const {role} = this.props;
 
    debugger;
    return(

      <div className="add-user-btn">
      {
        role === "ROLE_ADMIN" ? 
        <Button
          variant="extendedFab"
          color={ 'primary'}
          aria-label="Add"
          className={classes.button}
        //   onClick={this.handleShowForm}
        >Testing</Button> :
        null
      }
      </div>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(AdminUserControl));
