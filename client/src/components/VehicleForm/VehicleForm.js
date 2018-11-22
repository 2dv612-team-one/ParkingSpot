import React, { Component } from 'react';
import { connect } from 'react-redux';

/* eslint import/no-webpack-loader-syntax: off */
import { Paper, Button, TextField, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';

const mapDispatchToProps = dispatch => ({
    // happen: () => dispatch(happen()),
})

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class VehicleForm extends Component {
    constructor(props) {
        super(props);

        this.happen = this.happen.bind(this);
    }

    happen() {
        this.props.happen();
    }

    render() {
        const { classes } = this.props;
        return (
			<div className='add-vehicle-btn'>
				<Button variant="extendedFab" color="primary" aria-label="Add" className={classes.button}>
					<AddIcon className={classes.extendedIcon} />
                    Lägg till en bil
				</Button>
                <Paper>
                    <TextField
                        label="Registreringsnummer"
                        name="matchingPassword"
                        className={classes.textField}
                        margin="normal"
                    />
                    <Button variant="contained" size="small" className={classes.button}>
                        <SaveIcon className={classes.extendedIcon} />
                        Spara
                    </Button>
                </Paper>
			</div>
        );
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(VehicleForm));