import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { formatDate } from '../utils/date-formatter';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ROLES from '../constants/roles';
import AuthService from '../utils/auth-service';

export default class Exercise extends Component {

    constructor(props) {
        super(props);

        this.AuthService = new AuthService();
    }

    render() {
        const props = this.props;
        return (
            <TableRow key={props.exercise._id}>
                <TableCell component="th" scope="row">
                    {formatDate(props.exercise.date)}
                </TableCell>
                {props.printUser && <TableCell align="left">
                    <Typography>
                        <Link to={`/user/${props.exercise.user._id}`} color="inherit">
                            {props.exercise.user.fullName}
                        </Link>
                    </Typography></TableCell>}
                <TableCell align="left">{props.exercise.description}</TableCell>
                <TableCell align="left">{props.exercise.duration}</TableCell>
                {this.AuthService.hasRoles([ROLES.ADMIN]) && <TableCell align="center">
                    <Link to={"/edit/" + props.exercise._id}>
                        <IconButton
                            aria-label="edit exercise"
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            color="primary"
                        >
                            <Edit />
                        </IconButton>
                    </Link>
                    <IconButton
                        aria-label="delete exercise"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={() => { props.deleteExercise(props.exercise._id) }}
                        color="secondary"
                    >
                        <Delete />
                    </IconButton>
                </TableCell>}
            </TableRow>
        )
    }
}