import React, { Component } from 'react';
import Exercise from './exercise.component';
import Alert from 'react-s-alert';
import Fab from '@material-ui/core/Fab';
import AddBox from '@material-ui/icons/AddBox';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ROLES from '../constants/roles';

import AuthService from '../utils/auth-service';

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
            exercises: [],
            commentText: ''
        };
        this.socket = props.socket;
        this.AuthService = new AuthService();
        this.deleteExercise = this.deleteExercise.bind(this);
    }


    componentDidMount() {
        this.AuthService.fetch(`/exercises`, { method: 'GET' })
            .then(res => {
                this.setState({
                    exercises: res.data,
                    open: false,
                    exerciseId: '',
                    commentText: ''
                })
            })
            .catch((error) => {
                console.log(error);
            })

    }

    deleteExercise(id) {
        this.AuthService.fetch('/exercises/' + id, { method: 'DELETE' })
            .then(() => {
                Alert.success('Exercise successfully deleted.');
            });

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises ? this.state.exercises.map(currentexercise => {
            return <Exercise
                socket={this.socket}
                postComment={this.postComment}
                comment={this.state.comment}
                handleCommentChange={this.handleCommentChange}
                printUser={true}
                toggleCommentDialog={this.toggleCommentDialog}
                exercise={currentexercise}
                deleteExercise={this.deleteExercise}
                key={currentexercise._id} />;
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
                <div>
                    {this.exerciseList()}
                </div>
            </div>
        )
    }
}

ExercisesList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExercisesList);