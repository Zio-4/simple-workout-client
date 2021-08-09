import {useState, useEffect} from 'react'

function NewWorkoutForm({addNewWorkout}) {
    const [workoutFormData, setWorkoutFormData] = useState({
        name: "",
        day: "",
        notes: ""
    })

    function handleChange(e) {
        setWorkoutFormData({
            ...workoutFormData, [e.target.id]: e.target.value}
        )}

    function handleSubmit(e) {
        e.preventDefault()
        fetch("http://localhost:9393/workouts/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: workoutFormData.name, day: workoutFormData.day, notes: workoutFormData.notes})
        })
        .then(r => r.json())
        .then(data => {
            addNewWorkout(data)
            setWorkoutFormData({
                name: "",
                day: "",
                notes: ""
            })
        })
    }
    



    return (
        <form id="workout-form" onSubmit={handleSubmit}>
            <div class="ui inverted segment">
            <div class="ui inverted form">
                <div class="two fields">
                    <div class="field"></div>
                        <label>Name of Workout:</label>
                        <input
                            type="text"
                            id="name"
                            value={workoutFormData.name}
                            placeholder="Upper Body, Leg day, etc"
                            onChange={handleChange}
                        />
                    <div class="field"></div>
                        <label>Day:</label>
                        <input
                            type="text"
                            id="day"
                            value={workoutFormData.day}
                            placeholder="Monday, Tuesday, etc"
                            onChange={handleChange}
                        />
                </div>
            </div>
                    <div class="field">
                        <label>Notes:</label>
                        <textarea
                            id="notes"
                            value={workoutFormData.notes}
                            placeholder="'Deload after 12 weeks'"
                            onChange={handleChange}
                            rows="5">
                        {/*<input
                            
                            type="text"
                            id="notes"
                            value={workoutFormData.notes}
                            placeholder="'Deload after 12 weeks'"
                            onChange={handleChange}
                            
                        />*/}
                        </textarea>
                    </div>
            <button class="ui submit button">Create Workout</button>
            </div>
        </form>
    )
}

export default NewWorkoutForm
