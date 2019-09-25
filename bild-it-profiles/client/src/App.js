import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import ViewUser from './components/view-user.component';

function App() {
  return (
    <Router>
      <div className="container-flex">
        <Navbar />
        <br />
        <div className="container-fluid">
          <Route path="/" exact component={ExercisesList} />
          <Route path="/edit/:id" exact component={EditExercise} />
          <Route path="/create" exact component={CreateExercise} />
          <Route path="/user" exact component={CreateUser} />
          <Route path="/user/:id" exact component={ViewUser} />
        </div>
      </div>
    </Router>
  );
}

export default App;
