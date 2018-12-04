import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Button, FormControl, TextField, withStyles, Paper, Typography } from '@material-ui/core';
import { addArea } from '../../actions/parkingArea';

const mapStateToProps = state => ({
    accessToken: state.authentication.accessToken,
    role: state.authentication.role,
});

const mapDispatchToProps = dispatch => ({
    addArea: (accessToken, name, coords) => dispatch(addArea(accessToken, name, coords))
});

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class AddParkingArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            coord1: '',
            coord2: '',
            coord3: '',
            coord4: ''      
        }

        this.handleAreaName = this.handleAreaName.bind(this);
        this.handleCoord1 = this.handleCoord1.bind(this);
        this.handleCoord2 = this.handleCoord2.bind(this);
        this.handleCoord3 = this.handleCoord3.bind(this);
        this.handleCoord4 = this.handleCoord4.bind(this);
       
    }


    handleAreaName(e) {
        this.setState({ name: e.target.value });
    }

    handleCoord1(e) {
        this.setState({ coord1: e.target.value });
    }

    handleCoord2(e) {
        this.setState({ coord2: e.target.value });
    }
    handleCoord3(e) {
        this.setState({ coord3: e.target.value });
    }
    handleCoord4(e) {
        this.setState({ coord4: e.target.value });
    }


    addArea = () => {
        const {name, coord1, coord2, coord3, coord4} = this.state;
        const {accessToken} = this.props;
        let coords = [coord1, coord2, coord3, coord4];
        addArea(accessToken, name , coords);
    }


    render() {
        const { role } = this.props;
        const { areaName, coord1, coord2, coord3, coord4 } = this.state;


        return (
            <div>
                {
                    role === "ROLE_PARKING_OWNER" ?
                    <Paper>
                    <Typography variant="subtitle">Lägg till en ny parkeringsplats</Typography>
                    <FormControl >
                        <TextField
                            label="Namn"
                            name="name"
                            onChange={this.handleAreaName}
                            value={areaName}
                            // onBlur={this.handleBlur('username')}
                            // error={!!emptyInputError('username')}
                            // helperText={emptyInputError('username') ? 'Ange ett användarnamn.' : ' '}
                        />
                    </FormControl>
                    <FormControl >
                        <TextField
                            label="Coord1"
                            name="coord1"
                            onChange={this.handleCoord1}
                            value={coord1}
                            // onBlur={this.handleBlur('email')}
                            // error={!!invalidInputError('email')}
                            // helperText={invalidInputError('email') ? 'Ange en korrekt mailadress.' : ' '}
                        />
                    </FormControl>
                    <FormControl >
                        <TextField
                            label="Coord2"
                            name="coord2"
                            value={coord2}
                            onChange={this.handleCoord2}
                            // onBlur={this.handleBlur('password')}
                            // error={!!emptyInputError('password')}
                            // helperText={emptyInputError('password') ? 'Ange ett lösenord.' : ' '}
                        />
                    </FormControl>
                    <FormControl >
                    <TextField
                            label="Coord3"
                            name="coord3"
                            value={coord3}
                            onChange={this.handleCoord3}
                            // onBlur={this.handleBlur('password')}
                            // error={!!emptyInputError('password')}
                            // helperText={emptyInputError('password') ? 'Ange ett lösenord.' : ' '}
                        />
                    </FormControl>
                    <TextField
                            label="Coord4"
                            name="coord4"
                            value={coord4}
                            onChange={this.handleCoord4}
                            // onBlur={this.handleBlur('password')}
                            // error={!!emptyInputError('password')}
                            // helperText={emptyInputError('password') ? 'Ange ett lösenord.' : ' '}
                        />
                    <Button type="button" variant="outlined"
                        id="add-parking-area"
                        onClick={this.addArea}
                        // disabled={!canBeSubmitted}
                        >
                        <span>Lägg till</span>
                    </Button>
                </Paper>
                        :
                        null
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddParkingArea));