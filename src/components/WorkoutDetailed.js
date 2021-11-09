import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

function WorkoutDetailed() {
    const [workout, setWorkout] = useState(null)
    const [exercises, setExercises] = useState([])
    const params = useParams()

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

    const mappedExercises = exercises.map(e => {
        return <div key={e.id}>
        <p>{e.name}</p>
        <p>Sets: {e.sets}</p>
        <p>Reps: {e.reps}</p>
        <p>Weight: {e.weight}</p>
        <p>Notes: {e.notes}</p>
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
        </div>
    )
}

export default WorkoutDetailed
