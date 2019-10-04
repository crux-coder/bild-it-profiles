import React, { Component } from 'react';

import { formatDateFull } from '../utils/date-formatter';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    avatar: {
        backgroundColor: red[500],
    },
    inline: {
        display: 'inline',
    },
});

class Comment extends Component {
    render() {
        const { classes, comment } = this.props;
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
                                {`  —${comment.createdAt ? formatDateFull(comment.createdAt) : 'Just now.'}`}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        )
    }
}

Comment.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comment);