import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

// Import the React components
import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import Visualization from "./components/visualization.component";

import CreateStudySession from "./components/create-studysession.component";
import StudySessionsList from "./components/studysessions-list.component";


// Returns JSX which is loaded by index.js into the index.html
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
          <Route path="/" exact component={ExercisesList} />
          <Route path="/edit/:id" component={EditExercise} />
          <Route path="/create" component={CreateExercise} />
          <Route path="/user" component={CreateUser} />
          <Route path="/viz" component={Visualization} />
          <Route path="/createstudy" component={CreateStudySession} />
          <Route path="/studylist" component={StudySessionsList} />
      </div>
    </Router>
  );
}

export default App;
