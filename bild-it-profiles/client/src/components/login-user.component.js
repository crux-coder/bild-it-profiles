import React, { Component } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import '../App.css';
import logo from '../images/bildit.png';

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
            <div className="row justify-content-center vertical-center mt-0">
                <div className="col-4 text-center">
                    <img src={logo} alt="bildit logo" className="mb-5" />
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="email"
                                required
                                name="email"
                                className="form-control"
                                placeholder="Your e-mail"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                            />
                            <input type="password"
                                required
                                name="password"
                                className="form-control mt-3"
                                placeholder="Your password..."
                                value={this.state.password}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="">
                            <button type="submit" className="btn btn-primary login-btn">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}