import {Link} from 'react-router-dom'

function Workout({workout}) {
    return (
    <div class="ui inverted segment">
        <div class="ui inverted relaxed divided list">
            <Link to={`/workouts/${workout.id}`}>
                <div class="item">
                    <div class="content">  
                        <div id="workout-name-home" class="header">{workout.name}</div>
                            {workout.day}
                    </div>
                </div>
            </Link>
        </div>
        
        <div class="item">
            <div class="content">
            <Link to={`workouts/${workout.id}/edit`}> <div class="ui floated primary button">Edit</div> </Link>
            </div>
        </div>
      </div>
    )
}

export default Workout
