import {Link} from 'react-router-dom'

function Workout({workout}) {
    return (
    <div class="ui inverted segment">
        <div class="ui inverted relaxed divided list">
            <Link to={`/workouts/${workout.id}`}>
                <div class="item">
                    <div class="content">  
                        <div class="header">{workout.name}</div>
                            {workout.day}
                    </div>
                </div>
            </Link>
        </div>
        
        <div class="item">
            <div class="content">
                <div class="ui right floated primary button">Edit</div>
            </div>
        </div>
      </div>
    )
}

export default Workout
