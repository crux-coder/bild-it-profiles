import React, { Component } from 'react';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import NavbarUserMenu from './user-menu.component';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { fade } from '@material-ui/core/styles';
import logo from '../images/bildit.png';
import '../App.css';

const drawerWidth = 260;
const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
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
        backgroundColor: '#222222',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
    topSeparator: {
        height: '5em'
    },
    content: {
        flexGrow: 1,
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        paddingTop: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(7) + 1,
        },
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    moveSearch: {
        marginLeft: 20
    }
});

class AppNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            menu: false,
            anchorEl: null,
            openDrawer: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.setAnchorEl = this.setAnchorEl.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    handleClick(event) {
        this.setAnchorEl(event.currentTarget);
    }

    handleClose() {
        this.setAnchorEl(null);
    }

    setAnchorEl(anchorEl) {
        this.setState({ anchorEl: anchorEl })
    }

    toggleDrawer() {
        this.setState({
            openDrawer: !this.state.openDrawer
        })
    }

    render() {
        //TODO: Refactor this render function
        const { classes } = this.props;

        return (
            <AppBar className={clsx(classes.appBar, {
                [classes.appBarShift]: this.props.openDrawer,
            })}>
                <NavbarUserMenu anchorEl={this.state.anchorEl} handleClose={this.handleClose} handleLogout={this.props.logout}
                    user={this.props.user} {...this.props} />
                <Toolbar>
                    {/* <IconButton edge='start' className={clsx(classes.menuButton, this.props.openDrawer && classes.hide)}
                        onClick={this.props.toggleDrawer} color='inherit' aria-label='Menu'>
                        <MenuIcon />
                    </IconButton> */}
                    <Typography className={classes.title} variant='h6' noWrap>
                        <Link to="/home"><img width="50%" src={logo} alt="bildit logo" /></Link>
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton
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
            </AppBar>);
    }
}

AppNavbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppNavbar);