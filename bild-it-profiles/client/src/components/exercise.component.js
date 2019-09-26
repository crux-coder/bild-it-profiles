import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { formatDate } from '../utils/date-formatter';

export default class Exercise extends Component {

    render() {
        const props = this.props;
        return (
            <tr>
                <td>{props.exercise.description}</td>
                <td>{props.exercise.duration}</td>
                <td>{formatDate(props.exercise.date)}</td>
                <td>
                    <Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
                </td>
            </tr>
        )
    }
}