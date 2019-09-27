import React, { Component } from 'react';
import Exercise from './exercise.component';
import Alert from 'react-s-alert';
import { Link } from 'react-router-dom';

import AuthService from '../utils/auth-utils/auth-service';

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user
        };

        this.Auth = new AuthService();
        this.deleteExercise = this.deleteExercise.bind(this)
    }

    componentDidMount() {
        const user = this.Auth.getProfile();
        this.Auth.fetch(`/users/${user._id}`, { method: 'GET' })
            .then(res => {
                this.setState({
                    user: res.data,
                    exercises: res.data.exercises
                })
            })
            .catch((error) => {
                console.log(error);
            })

    }

    deleteExercise(id) {
        this.Auth.fetch('/exercises/' + id, { method: 'DELETE' })
            .then(() => {
                Alert.success('Exercise successfully deleted.');
            });

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        if (this.state.user) {
            return this.state.exercises ? this.state.exercises.map(currentexercise => {
                return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
            }) : '';
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h3 className="d-inline-block mr-0">Logged Exercises</h3>
                    <Link to="/create" className="btn btn-primary mb-1 d-inline-block float-right">Create Exercise Log</Link>
                </div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList() || <tr><td>No entries.</td></tr>}
                    </tbody>
                </table>
            </div>
        )
    }
}