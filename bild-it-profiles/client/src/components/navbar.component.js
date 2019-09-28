import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoIosPerson } from 'react-icons/io';
import Fab from '@material-ui/core/Fab';

import logo from '../images/bildit.png';
import '../App.css';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/home"><img width="50%" src={logo} alt="bildit logo" /></Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/home" className="nav-link">Exercises</Link>
                        </li>
                        {/* <li className="navbar-item">
                            <Link to="/user/register" className="nav-link">Register User</Link>
                        </li> */}
                        {this.props.user && <li className="navbar-item">
                            <Link to={`/user/${this.props.user._id}`} className="nav-link">Profile</Link>
                        </li>}
                        <li className="navbar-item">
                            <Link to="#" onClick={this.props.logout} className="nav-link">Logout</Link>
                        </li>
                    </ul>
                    <Fab color="default" aria-label="add" className="user-icon">
                        <IoIosPerson />
                    </Fab>
                </div>
            </nav>
        );
    }
}