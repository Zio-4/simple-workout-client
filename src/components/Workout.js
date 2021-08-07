import Exercise from "./Exercise"

function Workout({workout}) {
    return (
    <div class="ui inverted segment">
        <div class="ui inverted relaxed divided list">
          <div class="item">
            <div class="content">
              <div class="header">{workout.name}</div>
              {workout.day}
            </div>
          </div>
        </div>
      </div>
    )
}

export default Workout
