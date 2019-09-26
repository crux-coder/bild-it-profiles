import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Alert from 'react-s-alert';

import 'react-datepicker/dist/react-datepicker.css';

import { apiGetRequest, apiPostRequest } from '../utils/api-utils/api-util';

export default class EditExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            selectedUser: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        apiGetRequest(`/exercises/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    selectedUser: res.data.user._id,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        apiGetRequest('/users')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user),
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    onChangeUser(e) {
        this.setState({
            selectedUser: e.target.value
        })
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

        apiPostRequest(`/exercises/update/${this.props.match.params.id}`, exercise)
            .then(res => {
                if (res.status === 200) {
                    Alert.success('Exercise succesfully updated.');
                    this.props.history.push('/home');
                }
            }).catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
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
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}