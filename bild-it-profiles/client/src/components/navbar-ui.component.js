import React, { Component } from 'react';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import NavbarUserMenu from './user-menu.component';
import NavbarNotificationsMenu from './notifications-menu.component';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { fade } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleIcon from '@material-ui/icons/PeopleAlt';

import io from 'socket.io-client';
import Auth from '../utils/auth-service';
import ROLES from '../constants/roles';

import logo from '../images/bildit.png';
import '../App.css';

const styles = theme => ({
    nav: {
        display: 'none',
        backgroundColor: '#333333',
        [theme.breakpoints.up('md')]: {
            display: 'block',
        },

    },
    bottomNav: {
        display: 'none',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#EEE',
        [theme.breakpoints.down('md')]: {
            display: 'flex',
        },

    },
    navBtn: {
        display: 'inline-block',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none',
            color: 'white'
        }
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    }, hide: {
        display: 'none',
    },
    appBar: {
        backgroundColor: '#333333',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    iconLeft: {
        marginRight: '0.2em'
    }
});

class AppNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            menu: false,
            userAnchorEl: null,
            notifAnchorEl: null,
            openDrawer: false,
            navValue: 'home',
            notifications: []
        };

        this.socket = io('192.168.1.7:5000/notifications');
        this.AuthService = new Auth();
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.setAnchorEl = this.setAnchorEl.bind(this);
        this.setNavValue = this.setNavValue.bind(this);
        this.sendNotification = this.sendNotification.bind(this);
        this.receiveNotification = this.receiveNotification.bind(this);
        this.socket.on('RECIEVE_NOTIFICATION', this.receiveNotification)
    }

    sendNotification() {
        this.socket.emit('SEND_NOTIFICATION', { who: 'Jasmin Mustafic', what: 'Has posted on your timeline.', when: new Date() });
    }

    receiveNotification(data) {
        this.state.notifications.unshift(data);
        this.setState({
            notifications: this.state.notifications
        });
    }

    handleClick(event) {
        this.setAnchorEl(event.currentTarget);
    }

    handleClose() {
        this.setAnchorEl(null);
    }

    setAnchorEl(anchorEl) {
        if (!anchorEl) {
            this.setState({ userAnchorEl: anchorEl })
            this.setState({ notifAnchorEl: anchorEl })
        }
        else if (anchorEl.id === 'user-menu')
            this.setState({ userAnchorEl: anchorEl })
        else if (anchorEl.id === 'notif-menu')
            this.setState({ notifAnchorEl: anchorEl })
    }

    setNavValue = (event, newValue) => {
        this.setState({
            navValue: newValue
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <AppBar className={clsx(classes.appBar, {
                    [classes.appBarShift]: this.props.openDrawer,
                })}>
                    <NavbarUserMenu
                        anchorEl={this.state.userAnchorEl}
                        handleClose={this.handleClose}
                        handleLogout={this.props.logout}
                        user={this.props.user} {...this.props} />
                    <NavbarNotificationsMenu
                        anchorEl={this.state.notifAnchorEl}
                        handleClose={this.handleClose}
                        notifications={this.state.notifications}
                        user={this.props.user} {...this.props} />
                    <Toolbar>
                        <Typography variant='h6' noWrap>
                            <Link to="/home"><img width="40%" src={logo} alt="bildit logo" /></Link>
                        </Typography>
                        <div className={classes.nav}>
                            <MenuItem component={Link} to='/home' className={classes.navBtn}>
                                <HomeIcon className={classes.iconLeft} />
                                Home
                            </MenuItem>
                            <MenuItem component={Link} to={`/user/${this.state.user._id}`} className={classes.navBtn}>
                                <AccountCircle className={classes.iconLeft} />
                                Profile
                            </MenuItem>
                            <MenuItem component={Link} to={'/all-users'} className={classes.navBtn}>
                                <PeopleIcon className={classes.iconLeft} />
                                Users
                            </MenuItem>
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton
                                id="notif-menu"
                                onClick={this.handleClick} aria-label="show new notifications" color="inherit">
                                <Badge badgeContent={this.state.notifications.length} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                id="user-menu"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={this.handleClick}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                id="notif-menu"
                                onClick={this.handleClick} aria-label="show new notifications" color="inherit">
                                <Badge badgeContent={this.state.notifications.length} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                id="user-menu"
                                aria-label='Show more'
                                aria-controls='primary-search-account-menu'
                                aria-haspopup='true'
                                onClick={this.handleClick}
                                color='inherit'
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                    {/* <Button variant="contained" onClick={this.sendNotification}>
                        Default
                    </Button> */}
                </AppBar>
                <BottomNavigation showLabels value={this.state.navValue} className={classes.bottomNav} onChange={this.setNavValue}>
                    <BottomNavigationAction component={Link} className={classes.navBtn} to='/home' label="Home" value="home" icon={<HomeIcon />} />
                    <BottomNavigationAction component={Link} className={classes.navBtn} to={`/user/${this.state.user._id}`} label="Profile" value="profile" icon={<AccountCircle />} />
                    {this.AuthService.hasRoles(ROLES.ADMIN) && <BottomNavigationAction component={Link} className={classes.navBtn} to={'/all-users'} label="Users" value="users" icon={<PeopleIcon />} />}
                </BottomNavigation>
            </div >);
    }
}

AppNavbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppNavbar);