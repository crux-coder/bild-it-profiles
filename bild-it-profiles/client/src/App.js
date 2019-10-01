import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AuthService from './utils/auth-utils/auth-service';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

import Navbar from "./components/navbar-ui.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import RegisterUser from "./components/register-user.component";
import ViewUser from './components/view-user.component';
import Login from './components/login-user.component';
import PrivateRoute from './components/private-route.component';
import Alert from 'react-s-alert';

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      loggedIn: false
    }

    this.Auth = new AuthService();

    this.onSubmit = this.onSubmit.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (this.Auth.loggedIn()) {
      this.setState({
        user: this.Auth.getProfile(),
        loggedIn: true
      })
    }
  }

  onSubmit(email, password) {
    this.Auth.login(email, password)
      .then(res => {
        this.setState({
          user: res.data.user,
          loggedIn: true
        });
        Alert.success('Logged in successfully.');
      }).catch(err => console.log(err));
  }

  logout(e) {
    e.preventDefault();
    this.Auth.logout();
    this.setState({
      user: null,
      loggedIn: false
    });
    Alert.success('Logged out successfully.');
  }

  render() {
    return (
      <Router>
        {this.state.loggedIn && <Redirect to={{ pathname: '/home' }} />}
        <div className="container-flex" >
          {this.state.loggedIn && <Navbar user={this.state.user} logout={this.logout} />}
          <div className="container-fluid mt-5 pt-5">
            <Switch>
              <Route exact path='/' render={(props) => <Login {...props} onSubmit={this.onSubmit} />} />
              <PrivateRoute exact path="/home" user={this.state.user} loggedIn={this.state.loggedIn} component={ExercisesList} />
              <PrivateRoute exact path="/edit/:id" user={this.state.user} loggedIn={this.state.loggedIn} component={EditExercise} />
              <PrivateRoute exact path="/create" user={this.state.user} loggedIn={this.state.loggedIn} component={CreateExercise} />
              <PrivateRoute exact path="/user/register" user={this.state.user} loggedIn={this.state.loggedIn} component={RegisterUser} />
              <PrivateRoute exact path="/user/:id" user={this.state.user} loggedIn={this.state.loggedIn} component={ViewUser} />
            </Switch>
            <Alert stack={{ limit: 3 }} offset="100" position="top-right" effect="slide" />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
