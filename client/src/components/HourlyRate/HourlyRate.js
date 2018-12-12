import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Menu, MenuItem, Button , withStyles} from '@material-ui/core';
import { FormControl, TextField, Paper, Typography } from '@material-ui/core';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

import { getAreas, deleteArea } from '../../actions/parkingArea';
import styles from '../../assets/styles/hourly-rate';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  areas: state.parkingArea.data,
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getAreas()),
  deleteArea: (accessToken, name) => dispatch(deleteArea(accessToken, name)),
});

class HourlyRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate_from: '',
      rate_to: '',
      rate: ''
    };

    this.handleRateFrom = this.handleRateFrom.bind(this);
    this.handleRateTo = this.handleRateTo.bind(this);
    this.handleRate = this.handleRate.bind(this);

  }

  componentWillMount() {
    const { onLoad } = this.props;
    onLoad();
  }


  handleRateFrom(e) {
    this.setState({ rate_from: e.target.value });
  }

  handleRateTo(e) {
    this.setState({ rate_to: e.target.value });
  }
  handleRate(e) {
    this.setState({ rate: e.target.value });
  }


  handleClick = (e) => {
    // do something
  };

  render() {
    const { classes, areas } = this.props;
    const { rate_from, rate_to, rate } = this.state;

    return (areas && Array.from(areas).map(area => (
          <Paper className={classes.main}>
            <div>
              <Typography variant="subtitle">Skapa timtaxa för {area.name}</Typography>
              <FormControl >
                <TextField
                  label="Från timmar:"
                  name="rate_from"
                  onChange={this.handleRateFrom}
                  value={rate_from}
                />
              </FormControl>
              <FormControl >
                <TextField
                  label="Till timmar"
                  name="rate_to"
                  onChange={this.handleRateTo}
                  value={rate_to}
                />
              </FormControl>
              <FormControl >
                <TextField
                  label="Taxa"
                  name="rate"
                  onChange={this.handleRate}
                  value={rate}
                />
              </FormControl>
              <Button onClick={this.handleClick}>LÄGG TILL</Button>
            </div>
            <div>
              <TableHead>
                <TableRow>
                  <TableCell>Timtaxa</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>08:00-16:00 = 50kr</TableCell>
                  <Button onClick={this.handleClick}>TA BORT</Button>
                </TableRow>
                <TableRow>
                  <TableCell>16:00-24:00 = 30kr</TableCell>
                  <Button onClick={this.handleClick}>TA BORT</Button>
                </TableRow>
              </TableBody>
            </div>
          </Paper>
        ))
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HourlyRate));
