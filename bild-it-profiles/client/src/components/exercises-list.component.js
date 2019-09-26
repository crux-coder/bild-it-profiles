import React, { Component } from 'react';
import Exercise from './exercise.component';
import Alert from 'react-s-alert';

import { apiGetRequest, apiDeleteRequest } from '../utils/api-utils/api-util';

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this)

        this.state = { user: props.user };
    }

    componentDidMount() {
        apiGetRequest(`/users/${this.state.user._id}`)
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
        apiDeleteRequest('/exercises/' + id)
            .then(res => {
                if (res.status === 200)
                    Alert.success('Exercise successfully deleted.');
            });

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        if (this.state.user)
            return this.state.exercises ? this.state.exercises.map(currentexercise => {
                return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
            }) : '';
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
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