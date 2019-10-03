import React, { Component } from 'react';
import Alert from 'react-s-alert';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
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
            users: []
        };

        this.AuthService = new AuthService();
        this.toggleApproval = this.toggleApproval.bind(this);
    }

    componentDidMount() {
        this.AuthService.fetch(`/users`, { method: 'GET' })
            .then(res => {
                this.setState({
                    users: res.data
                });

            })
            .catch((error) => {
                console.log(error);
            })
    }

    toggleApproval(userId) {
        const user = this.state.users.find(user => user._id === userId);
        user.approved = !user.approved;
        this.setState({
            users: this.state.users
        });
        this.AuthService.fetch(`/users/update/${user._id}`, {
            method: 'POST',
            data: JSON.stringify(user)
        })
            .then(res => {
                if (res.data.approved)
                    Alert.success('User ' + res.data.fullName + ' approved.');
                this.setState({
                    users: this.state.users
                });
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.users);
        return (
            <div>
                <div>
                    <Typography className={classes.titleDiv} variant="h4" component="h3" style={{ overflow: 'hidden' }} display="block">
                        <span>Users</span>
                    </Typography>
                    <hr />
                </div>
                <Paper className={classes.root}>
                    <List dense className={classes.root} subheader={<ListSubheader>Waiting for approval</ListSubheader>}>
                        {this.state.users.map(user => {
                            return (
                                <ListItem key={user._id} button>
                                    <ListItemText id={user._id} primary={`${user.fullName}`} />
                                    <ListItemSecondaryAction>
                                        <Switch
                                            edge="end"
                                            onChange={() => this.toggleApproval(user._id)}
                                            checked={user.approved}
                                            inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>
                </Paper>
            </div>
        )
    }
}

ExercisesList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExercisesList);