import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Button , withStyles} from '@material-ui/core';
import { FormControl, TextField, Paper, Typography } from '@material-ui/core';
import { TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

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
      rate: '',
      hours: {
        1: -1,
        2: -1,
        3: -1,
        4: -1,
        5: -1,
        6: -1,
        7: -1,
        8: -1,
        9: -1,
        10: -1,
        11: -1,
        12: -1,
        13: -1,
        14: -1,
        15: -1,
        16: -1,
        17: -1,
        18: -1,
        19: -1,
        20: -1,
        21: -1,
        22: -1,
        23: -1,
        24: -1,
      },
      rates: [],
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

  hasEmptyInput() {
    const { rate_from, rate_to, rate} = this.state;
    return {
      rate_from: rate_from.length === 0,
      rate_to: rate_to.length === 0,
      rate: rate.length === 0,
    };
  }

  canBeSubmitted() {
    const emptyInputErrors = this.hasEmptyInput();

    return Object.keys(emptyInputErrors).some(x => emptyInputErrors[x]);
  }

  handleSubmit = () => {
    const { rate_from, rate_to, rate, hours} = this.state;

    for (let i = parseInt(rate_from); i <= parseInt(rate_to); i++) {

      hours[i] = rate;
      this.setState({hours});
    }

    this.setState(prevState => ({
      rates: [...prevState.rates, {
        from: rate_from,
        to: rate_to,
        rate: rate,
      }]
    }))

  };

  handleClick = (e) => {
    // do something
  };


  allHoursCovered() {
    const { hours } = this.state;

    // Checks if total amount of hours is equal to or more then 24
    // TODO make it check for duplicate hours
    for (let i = 1; i <= 24; i++) {

      if (hours[i] === -1) {

        return false;
      }
    }

    return true;
  }

  render() {
    const { areas } = this.props;

    const { rate_from, rate_to, rate , rates} = this.state;

    const canBeSubmitted = this.canBeSubmitted();
    const allHoursCovered = this.allHoursCovered();

    return (areas && Array.from(areas).map(area => (
          <div>
            <Paper>
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
              <Button
                onClick={this.handleSubmit}
                disabled={canBeSubmitted}
              >LÄGG TILL
              </Button>
            </Paper>
            <Paper>
              <TableHead>

              </TableHead>
              <TableBody>
                {rates && rates.map(nrate => (
                  <TableRow>
                    <TableCell onClick={this.handleClick} value={nrate}>{nrate.from}:00-{nrate.to}:00 = {nrate.rate}kr</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <Button
                onClick={this.handleClick}
                disabled={!allHoursCovered}
              >SPARA
              </Button>
            </Paper>
          </div>
        ))
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HourlyRate));
