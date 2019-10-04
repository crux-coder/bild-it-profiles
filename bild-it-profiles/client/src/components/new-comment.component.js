import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { red } from '@material-ui/core/colors';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import Auth from '../utils/auth-service';

const styles = theme => ({
    avatar: {
        backgroundColor: red[500],
    },
    newCommentPaper: {
        padding: '0.5em',
        marginTop: '1em'
    },
});

class NewComment extends Component {
    constructor(props) {
        super(props);

        this.AuthService = new Auth();
    }


    render() {
        const { classes } = this.props;
        const props = this.props;
        return (
            <Paper className={classes.newCommentPaper}>
                <React.Fragment>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar aria-label="user" className={classes.avatar}>
                                {this.AuthService.getProfile().firstName.charAt(0)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={this.AuthService.getProfile().fullName}
                            secondary={
                                <TextField
                                    id="new-comment-field"
                                    type="text"
                                    label="Comment"
                                    required
                                    value={props.newCommentText}
                                    onChange={props.handleCommentTextChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={props.postComment}
                                                    aria-label="post comment"
                                                >
                                                    <Send />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            }
                        />
                    </ListItem>
                </React.Fragment>
            </Paper>
        );
    }
}

NewComment.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewComment);