import {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'

function EditWorkout({onDeleteWorkout}) {
    const [workout, setWorkout] = useState(null)
    const [exercises, setExercises] = useState([])
    const params = useParams()
    const history = useHistory()

    useEffect(() => {
        fetch(`http://localhost:9292/workouts/${params.id}`)
        .then(r => r.json())
        .then(data => {
            setWorkout(data.workout)
            setExercises(data.exercises)
        })
    }, [params.id])

    if (!workout) return <h2>Loading...</h2>

    const {name, day, notes} = workout

    function onDeleteWorkoutClick() {
        fetch(`http://localhost:9292/workouts/${params.id}`, {
            method: "DELETE"
        })
        onDeleteWorkout(params.id)
        history.push('/home')
    }

    function onDeleteExercise(id) {
        const updatedExercises = exercises.filter(ex => ex.id !== id)
        setExercises(updatedExercises)
    }

    const mappedExercises = exercises.map(e => {
        return <div key={e.id}>
        <p>{e.name}</p>
        <p>Sets: {e.sets}</p>
        <p>Reps: {e.reps}</p>
        <p>Weight: {e.weight}</p>
        <p>Notes: {e.notes}</p>
        <button onClick={() => {
            fetch(`http://localhost:9292/exercises/${e.id}`, {
                method: "DELETE"
            })
            onDeleteExercise(e.id)
        }} class="ui yellow inverted submit button">Delete Exercise</button>
        <div class="ui inverted divider"></div>
        </div>
    })



    return (
        <div>
            <h2 id="detailed-name">{name}</h2>
            <p>Day: {day}</p>
            <p>Notes: {notes}</p>
            <div class="ui inverted segment">
            <h4 class="ui horizontal inverted divider">
                Exercises
            </h4>
                {mappedExercises}
            </div>
            <button onClick={onDeleteWorkoutClick} class="ui red inverted submit button">Delete Workout</button>
        </div>
    )
}

export default EditWorkout
