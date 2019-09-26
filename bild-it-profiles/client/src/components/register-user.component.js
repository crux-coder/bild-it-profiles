import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Alert from 'react-s-alert';

import "react-datepicker/dist/react-datepicker.css";

import AuthService from '../utils/auth-utils/auth-service';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            dob: null,
        }

        this.Auth = new AuthService();
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
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            dob: this.state.dob,
        }

        this.Auth.fetch('/users', { method: 'POST', data: JSON.stringify(user) })
            .then(res => {
                Alert.success('User successfully registered.');
                this.props.history.push(`/user/${res.data._id}`);
            }).catch(err => console.log(err));

        this.setState({
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            dob: null,
        })
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>E-mail: </label>
                        <input type="email"
                            required
                            name="email"
                            className="form-control"
                            value={this.state.email}
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
                        <label>Password: </label>
                        <input type="password"
                            required
                            name="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                        <label>Birth date: </label>
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
                        <input type="submit" value="Register" className="btn btn-success" />
                    </div>
                </form>
            </div>
        )
    }
}