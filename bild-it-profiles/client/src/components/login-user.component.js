import React, { Component } from 'react';

import Alert from 'react-s-alert';

import 'react-datepicker/dist/react-datepicker.css';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
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

    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.onSubmit(user.email, user.password);
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
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
                        <label>Password: </label>
                        <input type="password"
                            required
                            name="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}