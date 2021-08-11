
import Workout from './Workout'

function Workouts({workouts}) {


    return (
        <div>
            <h2 id="workouts-header">All Workouts</h2>
            {workouts.map(workout => <Workout key={workout.id} workout={workout}/>)}
        </div>
    )
}

export default Workouts

