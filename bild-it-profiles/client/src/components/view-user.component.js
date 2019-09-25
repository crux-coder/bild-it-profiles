import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class ViewUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
    }

    componentDidMount() {
        axios.get(`/users/${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    user: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            })

    }

    render() {
        return (
            <div>
                <h3>User Page</h3>
                <hr />
                <h4>{this.state.user ? this.state.user.username : ''}</h4>
                <h4>{this.state.user ? this.state.user.firstName : ''}</h4>
                <h4>{this.state.user ? this.state.user.lastName : ''}</h4>
                <h4>{this.state.user ? this.state.user.dob : ''}</h4>
            </div>
        )
    }
}