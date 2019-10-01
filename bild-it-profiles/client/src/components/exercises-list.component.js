import React, { Component } from 'react';
import Exercise from './exercise.component';
import Alert from 'react-s-alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddBox from '@material-ui/icons/AddBox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AuthService from '../utils/auth-utils/auth-service';

const styles = (theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    addButton: {
        float: 'right',
        boxShadow: 'none',
        '&:hover': {
            color: 'white',
        },
    }
}));

class ExercisesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            exercises: []
        };

        this.Auth = new AuthService();
        this.deleteExercise = this.deleteExercise.bind(this)
    }

    componentDidMount() {
        this.Auth.fetch(`/exercises`, { method: 'GET' })
            .then(res => {
                this.setState({
                    exercises: res.data
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
        return this.state.exercises ? this.state.exercises.map(currentexercise => {
            return <Exercise user={true} exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
        }) : '';
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div>
                    <Fab color="primary" variant="extended" to="/create" aria-label="delete" className={classes.addButton} component={Link}>
                        New exercise log
                            <AddBox className="ml-3" />
                    </Fab>
                    <Typography className={classes.titleDiv} variant="h4" component="h3" style={{ overflow: 'hidden' }} display="block">
                        <span>Logged exercises</span>
                    </Typography>
                    <hr />
                </div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="left">Trainee</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="left">Duration (min)</TableCell>
                                {/* <TableCell align="center">Actions</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.exerciseList()}
                        </TableBody>
                    </Table>
                </Paper>
            </div >
        )
    }
}

ExercisesList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExercisesList);