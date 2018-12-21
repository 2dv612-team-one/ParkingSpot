import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button , withStyles} from '@material-ui/core';
import { FormControl, TextField, Paper, Typography } from '@material-ui/core';
import { TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { getAreas, saveRates } from '../../actions/parkingArea';
import styles from '../../assets/styles/hourly-rate';

const mapStateToProps = state => ({
  accessToken: state.authentication.accessToken,
  areas: state.parkingArea.data,
  role: state.authentication.role
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getAreas()),
  saveRates: (accessToken, id, rates) => dispatch(saveRates(accessToken, id, rates)),
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
      deficientInput: 'Mata in data i varje formulär',
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
    const { rate_from, rate_to, hours, rate, deficientInput } = this.state;
    const emptyInputErrors = this.hasEmptyInput();

    const missingInputs = 'Mata in data i varje formulär';
    //const invalidRateFrom = 'ogiltiga "från timmar"';
    //const invalidRateTo = 'ogiltiga "till timmar"';
    const invalidHours = 'ogiltiga timmar'
    const invalidRate = 'ogiltig taxa';
    const validInput = 'lägg till';

    if (!Object.keys(emptyInputErrors).some(x => emptyInputErrors[x])) {

      // TODO Convert into a function and clean it up
      // Checks for valid hours
      if (parseInt(rate_from) === parseInt(rate_to)) {

        for (let i = 1; i <= 24; i++) {

          if (hours[i] !== -1) {

            if (deficientInput !== invalidHours) {
              this.setState({ deficientInput: invalidHours });
            }
            return false;
          }
        }
      } else if (parseInt(rate_from) < parseInt(rate_to)) {

        for (let i = parseInt(rate_from); i < parseInt(rate_to); i++) {

          if (hours[parseInt(rate_from)] !== -1) {

            if (deficientInput !== invalidHours) {
              this.setState({ deficientInput: invalidHours });
            }
            return false;
          }

          if (hours[i] !== -1) {

            if (deficientInput !== invalidHours) {
              this.setState({ deficientInput: invalidHours });
            }
            return false;
          }
        }


      } else if (parseInt(rate_from) > parseInt(rate_to)) {

        for (let i = parseInt(rate_from); i <= 24; i++) {

          if (hours[i] !== -1) {

            if (deficientInput !== invalidHours) {
              this.setState({ deficientInput: invalidHours });
            }
            return false;
          }
        }

        for (let i = 1; i < parseInt(rate_to); i++) {

          if (hours[i] !== -1) {

            if (deficientInput !== invalidHours) {
              this.setState({ deficientInput: invalidHours });
            }
            return false;
          }
        }
      }

      // Checks for valid rate
      if (!(rate >>> 0 === parseFloat(rate))) {
        if (deficientInput !== invalidRate) {
          this.setState({ deficientInput: invalidRate });
        }
      } else {
        if (deficientInput !== validInput) {
          this.setState({ deficientInput: validInput });
        }
      }

      return rate >>> 0 === parseFloat(rate);
    } else {

      if (deficientInput !== missingInputs) {
        this.setState({ deficientInput: missingInputs });
      }

      return false;
    }
  }

  handleSubmit = () => {
    const { rate_from, rate_to, rate, hours } = this.state;

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

      console.log("Something went very wrong...");
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

          console.log("Something went very wrong...");
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

    for (let i = 1; i <= 24; i++) {

      if (hours[i] === -1) {

        return false;
      }
    }

    return true;
  }

  render() {
    const { areas, role, classes } = this.props;

    const { rate_from, rate_to, rate , rates, deficientInput} = this.state;

    const canBeSubmitted = this.canBeSubmitted();
    const allHoursCovered = this.allHoursCovered();

    return (
      <div>
        { role === "ROLE_PARKING_OWNER" ?
      areas && Array.from(areas).map(area => (
        area.rates.length > 0 ? <div></div> : <div>
            <h1>Timtaxa</h1>
            {!allHoursCovered && (
            <div>
              <Typography variant="subtitle1">Skapa timtaxa för {area.name}</Typography>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="demo-controlled-open-select">
                  Från timmar (hh)
                </InputLabel>
                <Select
                  value={rate_from}
                  onChange={this.handleRateFrom}
                >
                 <MenuItem value="" disabled><em>None</em></MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={11}>11</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={13}>13</MenuItem>
                  <MenuItem value={14}>14</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={16}>16</MenuItem>
                  <MenuItem value={17}>17</MenuItem>
                  <MenuItem value={18}>18</MenuItem>
                  <MenuItem value={19}>19</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={21}>21</MenuItem>
                  <MenuItem value={22}>22</MenuItem>
                  <MenuItem value={23}>23</MenuItem>
                  <MenuItem value={24}>24</MenuItem>
                </Select>
              </FormControl>


              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="demo-controlled-open-select">
                  Till timmar (hh)
                </InputLabel>
                <Select
                  value={rate_to}
                  onChange={this.handleRateTo}
                >
                  <MenuItem value="" disabled><em>None</em></MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={11}>11</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={13}>13</MenuItem>
                  <MenuItem value={14}>14</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={16}>16</MenuItem>
                  <MenuItem value={17}>17</MenuItem>
                  <MenuItem value={18}>18</MenuItem>
                  <MenuItem value={19}>19</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={21}>21</MenuItem>
                  <MenuItem value={22}>22</MenuItem>
                  <MenuItem value={23}>23</MenuItem>
                  <MenuItem value={24}>24</MenuItem>
                </Select>
              </FormControl>


              <FormControl>
                <TextField
                  label="Taxa:"
                  name="rate"
                  onChange={this.handleRate}
                  value={rate}
                />
              </FormControl>

              <Button
                onClick={this.handleSubmit}
                disabled={!canBeSubmitted}
              >
                {deficientInput}
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
