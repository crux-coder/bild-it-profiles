import React, { Component } from 'react';
import axios from 'axios';
import Exercise from './exercise.component';
import "react-datepicker/dist/react-datepicker.css";

export default class ViewUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
        this.deleteExercise = this.deleteExercise.bind(this);
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

    deleteExercise(id) {
        axios.delete('/exercises/' + id)
            .then(response => { console.log(response.data) });

        const exercises = this.state.user.exercises.filter(el => el._id !== id)
        const user = this.state.user;
        user.exercises = exercises;
        this.setState({
            user: user
        })
    }

    exerciseList() {
        if (this.state.user)
            return this.state.user.exercises.map(currentexercise => {
                return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
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
                <hr />
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>User</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}