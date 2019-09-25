import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            dob: null,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    onChangeDate(date) {
        this.setState({
            dob: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dob: this.state.dob,
        }

        axios.post('/users', user)
            .then(res => console.log(res.data));

        this.setState({
            username: '',
            firstName: '',
            lastName: '',
            dob: null,
        })
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            name="username"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                        />
                        <label>First name: </label>
                        <input type="text"
                            required
                            name="firstName"
                            className="form-control"
                            value={this.state.firstName}
                            onChange={this.handleInputChange}
                        />
                        <label>Last name: </label>
                        <input type="text"
                            required
                            name="lastName"
                            className="form-control"
                            value={this.state.lastName}
                            onChange={this.handleInputChange}
                        />
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                placeholderText="Select a date of birth."
                                isClearable
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                dateFormat="dd/MM/yyyy"
                                selected={this.state.dob}
                                onChange={this.onChangeDate}
                                maxDate={new Date()}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}