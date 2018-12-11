import * as React from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { markMessageViewed } from '../../actions/snackbar';

import {styles, variantIcon}from '../../assets/styles/snackbar-message';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
});

const mapDispatchToProps = dispatch => ({
  onClose: (id, accesstoken) => dispatch(markMessageViewed(id, accesstoken)),
});

function SnackbarMessage(props) {
  const { classes, className, message, onClose, variant, IconStyle, accessToken, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={(
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message.message}
        </span>
)}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={() => onClose(message.id, accessToken)}
        >
          <IconStyle className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SnackbarMessage));
