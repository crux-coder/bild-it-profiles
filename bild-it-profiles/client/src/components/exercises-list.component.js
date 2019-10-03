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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
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
            exercises: []
        };

        this.AuthService = new AuthService();
        this.deleteExercise = this.deleteExercise.bind(this);
        this.toggleCommentDialog = this.toggleCommentDialog.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.postComment = this.postComment.bind(this);
    }

    componentDidMount() {
        this.AuthService.fetch(`/exercises`, { method: 'GET' })
            .then(res => {
                this.setState({
                    exercises: res.data,
                    open: false,
                    exerciseId: '',
                    comment: ''
                })
            })
            .catch((error) => {
                console.log(error);
            })

    }

    toggleCommentDialog(exerciseId) {
        this.setState({
            open: !this.state.open,
            exerciseId: exerciseId
        });
    }

    handleCommentChange(e) {
        this.setState({
            comment: e.target.value
        })
    }

    postComment() {
        const user = this.AuthService.getProfile();
        const exercise = this.state.exercises.find(exercise => exercise._id == this.state.exerciseId);
        const comment = {
            user: user,
            comment: this.state.comment,
            exercise: exercise
        };

        this.AuthService.fetch('/comments', {
            method: 'POST',
            data: JSON.stringify(comment)
        }).then(() => {
            Alert.success('Comment successfully posted.');
            exercise.comments.push(comment);
            this.setState({
                exercises: this.state.exercises
            })
            this.toggleCommentDialog();
        });
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
            return <Exercise printUser={true} toggleCommentDialog={this.toggleCommentDialog} exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
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
                <Dialog open={this.state.open} onClose={this.toggleCommentDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Comment</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            multiline
                            id="name"
                            label="Comment"
                            onChange={this.handleCommentChange}
                            value={this.state.comment}
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.toggleCommentDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.postComment} color="primary">
                            Post
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

ExercisesList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExercisesList);