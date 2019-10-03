import React, { Component } from 'react';
import Alert from 'react-s-alert';
import AuthService from '../utils/auth-service';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DatePicker,
} from '@material-ui/pickers';

import 'react-datepicker/dist/react-datepicker.css';
import '../App.css';
import logo from '../images/bildit.png';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            <Box>{children}</Box>
        </Typography >
    );
}


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            dob: new Date(),
            tab: 0
        }
        this.Auth = new AuthService();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
        this.login = this.login.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.register = this.register.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }

    handleTabChange(event, newValue) {
        this.setState({
            tab: newValue,
            email: '',
            password: ''
        });
    };

    onChangeDate(date) {
        this.setState({
            dob: date
        })
    }


    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    onLogin(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }
        this.login(user.email, user.password);
    }

    login(email, password) {
        this.Auth.login(email, password)
            .then(res => {
                this.setState({
                    user: res.data.user,
                    loggedIn: true
                });
                this.props.loggedIn({
                    user: res.data.user,
                    loggedIn: true
                });
                Alert.success('Logged in successfully.');
                this.props.history.push('/home');
            }).catch(err => {
                Alert.error(err.response.data);
            });
    }

    register(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            password: this.state.password,
            dob: this.state.dob,
        }

        this.Auth.fetch('/users', { method: 'POST', data: JSON.stringify(user) })
            .then(res => {
                Alert.success('User successfully registered.');
                this.props.history.push(`/user/${res.data._id}`);
            }).catch(err => {
                Alert.error(err.response.data);
            });

        this.setState({
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            dob: null,
        })
    }

    render() {
        return (
            <div className="row justify-content-center vertical-center mt-0">
                <div className="col-4 text-center">
                    <img src={logo} alt="bildit logo" className="mb-5" />
                    <Paper square>
                        <Tabs
                            value={this.state.tab}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            onChange={this.handleTabChange}
                            aria-label="login-register"
                        >
                            <Tab label="Login" />
                            <Tab label="Register" />
                        </Tabs>
                    </Paper>
                    <TabPanel value={this.state.tab} index={0}>
                        <form onSubmit={this.onLogin}>
                            <div className="form-group">
                                <TextField
                                    label="E-mail"
                                    className="form-control"
                                    type="email"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                    InputLabelProps={{
                                        classes: {
                                            root: 'label'
                                        }
                                    }}
                                />
                                <TextField
                                    label="Password"
                                    className="form-control"
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    InputLabelProps={{
                                        classes: {
                                            root: 'label'
                                        }
                                    }}
                                />
                            </div>
                            <div>
                                <Fab
                                    variant="extended"
                                    size="large"
                                    type="submit"
                                    color="primary"
                                    aria-label="login"
                                    className="float-right"
                                    style={{ width: '33%' }}
                                >
                                    Login
                                <Send className="ml-3" />
                                </Fab>
                            </div>
                        </form>
                    </TabPanel>
                    <TabPanel value={this.state.tab} index={1}>
                        <form onSubmit={this.register}>
                            <div className="form-group">
                                <TextField
                                    label="First name"
                                    className="form-control"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={this.handleInputChange}
                                    InputLabelProps={{
                                        classes: {
                                            root: 'label'
                                        }
                                    }}
                                />
                                <TextField
                                    label="Last name"
                                    className="form-control"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.handleInputChange}
                                    InputLabelProps={{
                                        classes: {
                                            root: 'label'
                                        }
                                    }}
                                />
                                <TextField
                                    label="E-mail"
                                    className="form-control"
                                    type="email"
                                    autoComplete='off'
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                    InputLabelProps={{
                                        classes: {
                                            root: 'label'
                                        }
                                    }}
                                />
                                <TextField
                                    label="Password"
                                    className="form-control"
                                    type="password"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    required
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    InputLabelProps={{
                                        classes: {
                                            root: 'label'
                                        }
                                    }}
                                />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        variant="inline"
                                        inputVariant="outlined"
                                        className="form-control"
                                        format="dd.MM.yyyy"
                                        margin="normal"
                                        disableFuture
                                        clearable="true"
                                        autoOk
                                        value={this.state.dob}
                                        onChange={this.onChangeDate}
                                        id="date-picker-inline"
                                        label="Birthdate"
                                        InputLabelProps={{
                                            classes: {
                                                root: 'label'
                                            }
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                            <div>
                                <Fab
                                    variant="extended"
                                    size="large"
                                    type="submit"
                                    color="secondary"
                                    aria-label="register"
                                    className="float-right"
                                    style={{ width: '33%' }}
                                >
                                    Register
                                <Send className="ml-3" />
                                </Fab>
                            </div>
                        </form>
                    </TabPanel>
                </div>
            </div>
        )
    }
}