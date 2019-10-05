import React, { Component } from 'react';
import { formatDateFull } from '../utils/date-formatter';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import Alert from 'react-s-alert';
import Comment from './comment.component';
import NewComment from './new-comment.component';

import ROLES from '../constants/roles';
import AuthService from '../utils/auth-service';


const styles = theme => ({
    card: {
        maxWidth: '100%',
        marginBottom: '1em'
    },
    expand: {
        transform: 'rotate(0deg)',
        cursor: 'pointer',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    root: {
        width: '100%',
        backgroundColor: 'theme.palette.background.paper',
    },
    inline: {
        display: 'inline',
    },
    cursorPointer: {
        cursor: 'pointer',
    },
    commentSection: {
        backgroundColor: '#FEFEFE',
        boxShadow: 'inset 0px 1px 3px 0px rgba(0,0,0,0.45)'
    },
    showCommentsBtn: {
        marginLeft: 'auto',
        cursor: 'pointer',
    },
});


class Exercise extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            exercise: props.exercise,
            comments: props.exercise.comments,
            newCommentText: ''
        }
        this.AuthService = new AuthService();
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.handleCommentTextChange = this.handleCommentTextChange.bind(this);
        this.postComment = this.postComment.bind(this);
        this.socket = props.socket;
        this.sendNotification = this.sendNotification.bind(this);
    }

    sendNotification(notification) {
        this.socket.emit('SEND_NOTIFICATION', notification);
    }

    handleExpandClick() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    handleCommentTextChange(e) {
        this.setState({
            newCommentText: e.target.value
        });
    }

    postComment() {
        const user = this.AuthService.getProfile();
        const exercise = this.state.exercise;
        const comment = {
            user: user,
            comment: this.state.newCommentText,
            exercise: exercise
        };

        this.AuthService.fetch('/comments', {
            method: 'POST',
            data: JSON.stringify(comment)
        }).then(() => {
            Alert.success('Comment successfully posted.');
            exercise.comments.push(comment);
            this.setState({
                exercise: exercise,
                newCommentText: '',
            })
        });
    }

    render() {
        const { classes } = this.props;
        const { exercise, comments } = this.state;
        const props = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="user" className={classes.avatar}>
                            {exercise.user.firstName.charAt(0)}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={exercise.user.fullName}
                    subheader={formatDateFull(exercise.date)}
                />
                <CardContent>
                    <Typography variant="body1" color="textPrimary" component="p">
                        {exercise.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="add to favorites" onClick={() => this.sendNotification({ who: this.AuthService.getProfile().fullName, what: 'Just lilked your post cyka blyat!', when: new Date() })}>
                        <FavoriteIcon />
                    </IconButton>
                    <Typography
                        component="span"
                        variant="body2"
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="show more"
                        color="textSecondary"
                        className={classes.showCommentsBtn}
                    >
                        {this.state.expanded ? 'Hide Comments' : 'Show Comments'}
                        <ExpandMoreIcon className={clsx(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })} />
                    </Typography>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent className={classes.commentSection}>
                        <List className={classes.root}>
                            {comments.length ? comments.map(comment => {
                                return <Comment comment={comment} />
                            }) : <Typography
                                component="span"
                                variant="body2"
                                aria-label="show more"
                                color="textSecondary"
                            >Be first to comment.</Typography>}
                            <NewComment
                                newCommentText={this.state.newCommentText}
                                exercise={exercise}
                                handleCommentTextChange={this.handleCommentTextChange}
                                postComment={this.postComment} />
                        </List>
                    </CardContent>
                </Collapse>
            </Card>

        )
    }
}

Exercise.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Exercise);