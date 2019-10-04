import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { formatDate } from '../utils/date-formatter';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
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
    }
});

class NotificationsMenu extends Component {
    render() {
        const { classes, notifications } = this.props;
        return (
            <Menu
                id='notifications-menu'
                anchorEl={this.props.anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={this.props.anchorEl}
                onClose={this.props.handleClose}
                getContentAnchorEl={null}>
                <MenuItem disabled>Notifications</MenuItem>
                <List className={classes.root}>
                    {notifications ? notifications.map(notification => {
                        return <React.Fragment>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar} alt="Admin Adminovic">
                                        {notification.who.charAt(0)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={notification.who}
                                    secondary={
                                        <React.Fragment>
                                            {`${notification.what}  — ${formatDate(notification.when)}`}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    }) : 'No new notifications.'
                    }
                </List>
            </Menu>
        )
    }
}

NotificationsMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationsMenu);