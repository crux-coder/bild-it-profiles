import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { formatDate } from '../utils/date-formatter';

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
import CommentIcon from '@material-ui/icons/AddComment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import ROLES from '../constants/roles';
import AuthService from '../utils/auth-service';


const styles = theme => ({
    card: {
        maxWidth: '100%',
        marginBottom: '1em'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
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
    commentSection: {
        backgroundColor: '#FEFEFE',
        //         -webkit-box-shadow: inset 2px 2px 5px 0px rgba(0,0,0,0.75);
        // -moz-box-shadow: inset 2px 2px 5px 0px rgba(0,0,0,0.75);
        boxShadow: 'inset 0px 1px 3px 0px rgba(0,0,0,0.45)'
    },
});


class Exercise extends Component {

    constructor(props) {
        super(props);
        this.AuthService = new AuthService();
        this.state = {
            expanded: false
        }
        this.handleExpandClick = this.handleExpandClick.bind(this);
    }

    handleExpandClick() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        const { classes } = this.props;
        const props = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="user" className={classes.avatar}>
                            {props.exercise.user.firstName.charAt(0)}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={props.exercise.user.fullName}
                    subheader={formatDate(props.exercise.date)}
                />
                <CardContent>
                    <Typography variant="body1" color="textPrimary" component="p">
                        {props.exercise.description}
                    </Typography>
                </CardContent>
                <CardActions >
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Comment">
                        <CommentIcon onClick={() => props.toggleCommentDialog(props.exercise._id)} />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent className={classes.commentSection}>
                        <List className={classes.root}>
                            {props.exercise.comments.map(comment => {
                                return (
                                    <React.Fragment>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar aria-label="user" className={classes.avatar}>
                                                    {comment.user.firstName.charAt(0)}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={comment.user.fullName}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            className={classes.inline}
                                                            color="textPrimary"
                                                        >
                                                            {comment.comment}
                                                        </Typography>
                                                        {`  —${comment.createdAt ? formatDate(comment.createdAt) : 'Just now.'}`}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </React.Fragment>)
                            })
                            }
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