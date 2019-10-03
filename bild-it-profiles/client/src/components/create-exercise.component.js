import React, { Component } from 'react';
import Alert from 'react-s-alert';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DatePicker,
} from '@material-ui/pickers';
import Save from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

import 'react-datepicker/dist/react-datepicker.css';

import AuthService from '../utils/auth-service';

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            duration: 0,
            date: new Date(),
            selectedUser: props.user._id,
            user: props.user
        }

        this.Auth = new AuthService();
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            user: this.state.selectedUser,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        this.Auth.fetch('/exercises', {
            method: 'POST',
            data: JSON.stringify(exercise)
        })
            .then(() => {
                Alert.success('Exercise successfully created.');
                this.props.history.push('/home');
            }).catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <TextField
                            id="filled-multiline-flexible"
                            label="Exercise description"
                            multiline
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            rowsMax="5"
                            required
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            id="outlined-number"
                            label="Duration (in minutes)"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div className="form-group">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                disableToolbar
                                variant="inline"
                                inputVariant="outlined"
                                format="dd.MM.yyyy"
                                margin="normal"
                                disableFuture
                                clearable
                                autoOk
                                value={this.state.date}
                                onChange={this.onChangeDate}
                                id="date-picker-inline"
                                label="Date"
                            />
                        </MuiPickersUtilsProvider>
                    </div>

                    <div className="form-group">
                        <Button variant="contained" type="submit" size="large" color="primary">
                            Save
                            <Save className="ml-3" />
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}