import './App.css';
import Workouts from './components/Workouts'
import Header from './components/Header'
import {useEffect, useState} from 'react'
import NewWorkoutForm from './components/NewWorkoutForm'
import {Switch, Route, Redirect} from 'react-router-dom'
import NavBar from './components/NavBar'
import WorkoutDetailed from './components/WorkoutDetailed';
import EditWorkout from './components/EditWorkout';


function App() {

  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    fetch("http://localhost:9292/workouts/")
    .then(resp => resp.json())
    .then(data => {
        setWorkouts(data.workouts)
    })
  }, [])

  function addNewWorkout(newWorkout) {
    const addW = [...workouts, newWorkout]
    setWorkouts(addW)
  }

  function onDeleteWorkout(paramsID) {
    const updatedWorkouts = workouts.filter(w => w.id !== parseInt(paramsID))
    setWorkouts(updatedWorkouts)
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
        <Route path="/workouts/:id/edit">
          <EditWorkout onDeleteWorkout={onDeleteWorkout}/>
        </Route>
        <Route path="/workouts/:id">
          <WorkoutDetailed />
        </Route>
        <Route path="/home">
          <Workouts workouts={workouts}/>
        </Route>
        <Route path="*">
          <h1>404 not found</h1>
          <Redirect from="*" to="/home" />
        </Route> 
      </Switch>
    </div>
  );
}

export default App;
