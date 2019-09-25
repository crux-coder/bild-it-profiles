import React, { Component } from 'react';
import Exercise from './exercise.component';
import axios from 'axios';

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this)

        this.state = { user: props.user };
    }

    componentDidMount() {
        axios.get(`/users/${this.state.user._id}`)
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

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        console.log(this.state.user)
        if (this.state.user)
            return this.state.user.exercises ? this.state.user.exercises.map(currentexercise => {
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
                            <th>User</th>
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