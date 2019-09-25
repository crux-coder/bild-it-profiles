import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import RegisterUser from "./components/register-user.component";
import ViewUser from './components/view-user.component';
import Login from './components/login-user.component';
import PrivateRoute from './components/private-route.component';

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      loggedIn: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.logout = this.logout.bind(this);
  }

  onSubmit(email, password) {

    const user = {
      email: email,
      password: password
    }

    axios.post('/users/login', user)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            user: res.data,
            loggedIn: true
          });
        }
        else
          console.log(res);
      });
  }

  logout(e) {
    e.preventDefault();
    this.setState({
      user: null,
      loggedIn: false
    });

  }

  render() {
    return (
      <Router>
        {this.state.loggedIn && <Redirect to={{ pathname: '/home' }} />}
        <div className="container-flex">
          {this.state.loggedIn && <Navbar user={this.state.user} logout={this.logout} />}
          <br />
          <div className="container-fluid">
            <Switch>
              <Route exact path='/' render={(props) => <Login {...props} onSubmit={this.onSubmit} />} />
              <PrivateRoute exact path="/home" user={this.state.user} loggedIn={this.state.loggedIn} component={ExercisesList} />
              <PrivateRoute exact path="/edit/:id" user={this.state.user} loggedIn={this.state.loggedIn} component={EditExercise} />
              <PrivateRoute exact path="/create" user={this.state.user} loggedIn={this.state.loggedIn} component={CreateExercise} />
              <PrivateRoute exact path="/user/register" user={this.state.user} loggedIn={this.state.loggedIn} component={RegisterUser} />
              <PrivateRoute exact path="/user/:id" user={this.state.user} loggedIn={this.state.loggedIn} component={ViewUser} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
