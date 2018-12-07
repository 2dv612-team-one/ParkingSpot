import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import {styles, variantIcon}from '../../assets/styles/snackbar-message';

function SnackbarMessage(props) {
  const { classes, className, message, onClose, variant, IconStyle, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={(
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
)}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <IconStyle className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

export default withStyles(styles)(SnackbarMessage);
