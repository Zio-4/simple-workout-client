
import Workout from './Workout'
import Exercise from './Exercise'

function Workouts({workouts}) {


    return (
        <div>
            <h2>All Workouts</h2>
            {workouts.map(workout => <Workout key={workout.id} workout={workout}/>)}
        </div>
    )
}

export default Workouts

