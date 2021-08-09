import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

function WorkoutDetailed() {
    const [workout, setWorkout] = useState(null)
    const params = useParams()

    useEffect(() => {
        fetch(`http://localhost:9393/workouts/${params.id}`)
        .then(r => r.json())
        .then(data => {
            console.log("Data in WorkoutDetailed: ", data)
            setWorkout(data.workouts)
        })
    }, [params.id])

    if (!workout) return <h2>Loading...</h2>

    const {name, day, notes, exercises} = workout

    return (
        <div>
            <h2>{name}</h2>
            <p>{day}</p>
            <p>{notes}</p>


        </div>
    )
}

export default WorkoutDetailed
