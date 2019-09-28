import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import Person from '@material-ui/icons/Person';
import Shutdown from '@material-ui/icons/PowerSettingsNew';

class NavbarUserMenu extends Component {
    render() {
        return (
            <Menu
                id='primary-search-account-menu'
                anchorEl={this.props.anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={this.props.anchorEl}
                onClose={this.props.handleClose}
                getContentAnchorEl={null}>
                <MenuItem disabled>{this.props.user.fullName}</MenuItem>
                <Divider />
                <MenuItem component={Link} color="inherit" variant="inherit" to={`/user/${this.props.user._id}`} onClick={this.props.handleClose}><Person /> Profile</MenuItem>
                <MenuItem onClick={this.props.handleLogout}><Shutdown /> Logout</MenuItem>
            </Menu>
        )
    }
}

export default NavbarUserMenu;