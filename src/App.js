import logo from './logo.svg';
import './App.css';
import Workouts from './components/Workouts';
import Header from './components/Header'
import {useEffect, useState} from 'react'
import NewWorkoutForm from './components/NewWorkoutForm';
import ExerciseForm from './components/ExerciseForm';


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
      <Workouts workouts={workouts}/>
      <NewWorkoutForm addNewWorkout={addNewWorkout}/>
      <br/>
      <ExerciseForm />
    </div>
  );
}

export default App;
