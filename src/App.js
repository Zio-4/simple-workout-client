import './App.css';
import Workouts from './components/Workouts'
import Header from './components/Header'
import {useEffect, useState} from 'react'
import NewWorkoutForm from './components/NewWorkoutForm'
import ExerciseForm from './components/ExerciseForm'
import {Switch, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import WorkoutDetailed from './components/WorkoutDetailed';


function App() {

  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    fetch("http://localhost:9393/workouts/")
    .then(resp => resp.json())
    .then(data => {
        setWorkouts(data.workouts)
    })
  }, [])

  function addNewWorkout(newWorkout) {
    const addW = [...workouts, newWorkout]
    setWorkouts(addW)
  }


  return (
    <div className="App">
      <Header />
      <br></br>
      <NavBar />
      <Switch>
        <Route path="/new_workout">
          <NewWorkoutForm addNewWorkout={addNewWorkout}/>
        </Route>
        <Route path="/workouts/:id">
          <WorkoutDetailed />
        </Route>
        <Route path="/add_exercises">
          <ExerciseForm />
        </Route>
        <Route path="/">
          <Workouts workouts={workouts}/>
        </Route>
        <Route path="*">
          <h1>404 not found</h1>
        </Route> 
      </Switch>
    </div>
  );
}

export default App;
