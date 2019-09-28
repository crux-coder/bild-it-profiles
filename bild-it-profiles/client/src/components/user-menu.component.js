import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';

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
                <MenuItem disabled>{this.props.user.name}</MenuItem>
                <Divider />
                <MenuItem component={Link} onClick={this.props.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.props.handleLogout}>Logout</MenuItem>
            </Menu>
        )
    }
}

export default NavbarUserMenu;