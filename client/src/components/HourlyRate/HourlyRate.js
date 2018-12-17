import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Button , withStyles} from '@material-ui/core';
import { FormControl, TextField, Paper, Typography } from '@material-ui/core';
import { TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { getAreas, saveRates } from '../../actions/parkingArea';
//import styles from '../../assets/styles/hourly-rate';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  areas: state.parkingArea.data,
  role: state.authentication.role
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getAreas()),
  saveRates: (accessToken, id, rates) => dispatch(saveRates(accessToken, id, rates)),
});

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
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
    this.handleDelete = this.handleDelete.bind(this);
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

    if (parseInt(rate_from) === parseInt(rate_to)) {

      for (let i = 1; i <= 24; i++) {

        hours[i] = rate;
        this.setState({hours});
      }
      this.setState({hours});

    } else if (parseInt(rate_from) < parseInt(rate_to)) {

      for (let i = parseInt(rate_from); i < parseInt(rate_to); i++) {

        hours[i] = rate;
        this.setState({hours});
      }

      this.setState({hours});
    } else if (parseInt(rate_from) > parseInt(rate_to)) {

      for (let i = parseInt(rate_from); i <= 24; i++) {

        hours[i] = rate;
        this.setState({hours});
      }

      for (let i = 1; i < parseInt(rate_to); i++) {

        hours[i] = rate;
        this.setState({hours});
      }

      this.setState({hours});
    } else {

      throw("Something went wrong...");
    }

    this.setState(prevState => ({
      rates: [...prevState.rates, {
        id: "f=" + rate_from + ";t=" + rate_to + ";r=" + rate,
        rate_from,
        rate_to,
        rate: rate,
      }]
    }))

  };

  handleDelete = (e) => {
    const { rates, hours } = this.state;
    let value = JSON.parse(e.currentTarget.value);

    for (let i = 0; i < rates.length; i++) {

      if (rates[i].id === value.id) {

        if (parseInt(value.rate_from) === parseInt(value.rate_to)) {

          for (let i = 1; i <= 24; i++) {

            hours[i] = -1;
            this.setState({hours});
          }

          rates.splice(i,1);
          this.setState({rates});
        } else if (parseInt(value.rate_from) < parseInt(value.rate_to)) {

          for (let i = parseInt(value.rate_from); i < parseInt(value.rate_to); i++) {

            hours[i] = -1;
            this.setState({hours});
          }

          rates.splice(i,1);
          this.setState({rates});
        } else if (parseInt(value.rate_from) > parseInt(value.rate_to)) {

          for (let i = parseInt(value.rate_from); i <= 24; i++) {

            hours[i] = -1;
            this.setState({hours});
          }

          for (let i = 1; i < parseInt(value.rate_to); i++) {

            hours[i] = -1;
            this.setState({hours});
          }

          rates.splice(i,1);
          this.setState({rates});
        } else {

          throw("Something went wrong...");
        }
      }
    }
  };

  handleSave = (id) => {
    const { saveRates, accessToken } = this.props;
    const { rates } = this.state;
    saveRates(accessToken, id, rates);
  };


  allHoursCovered() {
    const { hours } = this.state;
    console.log(hours);
    for (let i = 1; i <= 24; i++) {

      if (hours[i] === -1) {

        return false;
      }
    }

    return true;
  }

  render() {
    const { areas, role, classes } = this.props;

    const { rate_from, rate_to, rate , rates} = this.state;

    const canBeSubmitted = this.canBeSubmitted();
    const allHoursCovered = this.allHoursCovered();

    return (
      <div>
        { role === "ROLE_PARKING_OWNER" ?
      areas && Array.from(areas).map(area => (
        area.rates.length > 0 ? <div></div> : <div>
            <hi>Timtaxa</hi>
            {!allHoursCovered && (
            <div>
              <Typography variant="subtitle1">Skapa timtaxa för {area.name}</Typography>


              <FormControl >
                <TextField
                  label="Från timmar (hh):"
                  name="rate_from"
                  onChange={this.handleRateFrom}
                  value={rate_from}
                />
              </FormControl>
              <FormControl >
                <TextField
                  label="Till timmar (hh):"
                  name="rate_to"
                  onChange={this.handleRateTo}
                  value={rate_to}
                />
              </FormControl>
              <FormControl>
                <TextField
                  label="Taxa:"
                  name="rate"
                  onChange={this.handleRate}
                  value={rate}
                />
              </FormControl>





              <FormControl className={classes.formControl}>
                <InputLabel
                  htmlFor="age-native-simple"
                >
                  Från timmar (hh)
                </InputLabel>
                <Select
                  native
                  value={rate_from}
                  onChange={this.handleRateFrom}
                  inputProps={{
                    name: 'age',
                    id: 'age-native-simple',
                  }}
                >
                  <option value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
              </FormControl>



              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple"
                >
                  Till timmar (hh)
                </InputLabel>
                <Select
                  native
                  value={rate_to}
                  onChange={this.handleRateTo}
                  inputProps={{
                    name: 'age',
                    id: 'age-native-simple',
                  }}
                >
                  <option value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
              </FormControl>



              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">
                  Taxa
                </InputLabel>
                <Select
                  native
                  value={rate}
                  onChange={this.handleRate}
                  inputProps={{
                    name: 'age',
                    id: 'age-native-simple',
                  }}
                >
                  <option value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
              </FormControl>



              <Button
                onClick={this.handleSubmit}
                disabled={canBeSubmitted}
              >LÄGG TILL
              </Button>


            </div>
            )}
            <Paper>
              <TableHead>

              </TableHead>
              <TableBody>
                {rates && rates.map(nrate => (
                  <TableRow key={nrate.id}>
                    <TableCell>{nrate.rate_from}:00-{nrate.rate_to}:00 = {nrate.rate}kr</TableCell>
                    <Button
                      onClick={this.handleDelete}
                      value={JSON.stringify(nrate)}
                    >TA BORT
                    </Button>
                  </TableRow>
                ))}
              </TableBody>
              <Button
                onClick={() => this.handleSave(area.id)}
                disabled={!allHoursCovered}
              >SPARA
              </Button>
            </Paper>
          </div>
        )) : null }
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HourlyRate));
