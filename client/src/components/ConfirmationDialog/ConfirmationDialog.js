import React, { Component } from 'react';
import styles from '../../assets/styles/confirm-dialog';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class ConfirmationDialog extends Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleEntering = () => {
    this.radioGroupRef.focus();
  };

  handleCancel = () => {
    this.setState({value: ''})
    this.props.onClose();
  };

  handleOk = () => {
    this.props.onConfirm(this.state.value);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { title, options, open } = this.props;

    console.log('value:')
    console.log(this.props.value)
    console.log(this.state.value)

    return (
      <Dialog
        maxWidth="s"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        open={open}
        onClose={this.handleCancel}
      >
        <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <RadioGroup
            ref={ref => {
              this.radioGroupRef = ref;
            }}
            value={this.state.value.toString()}
            onChange={this.handleChange}
          >
            {options.map(option => (
              <FormControlLabel disabled={option.disabled} value={option.value} key={option.value} control={<Radio />} label={option.label} />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ConfirmationDialog);