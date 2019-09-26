import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Alert from 'react-s-alert';

import 'react-datepicker/dist/react-datepicker.css';

import AuthService from '../utils/auth-utils/auth-service';

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
                        <label>User: {this.state.user.fullName}</label>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                dateFormat="dd/MM/yyyy"
                                maxDate={new Date()}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}