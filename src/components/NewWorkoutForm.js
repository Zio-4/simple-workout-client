import {useState} from 'react'

function NewWorkoutForm({addNewWorkout}) {
    const [workoutFormData, setWorkoutFormData] = useState({
        name: "",
        day: "",
        notes: ""
 
    })

// Used as a base to clone objects
    const blankExercise = {
        name: "",
        reps: 0,
        sets: 0,
        notes: "",
        weight: 0
    }
    const [exerciseFormData, setExerciseFormData] = useState([
        {...blankExercise}
    ])

    function handleChange(e) {
        setWorkoutFormData({
            ...workoutFormData, [e.target.id]: e.target.value}
        )}


/* clone exerciseFormData to keep renders pure. 
   Use the idx data attribute to locate the index of the particular set of exercise inputs.
   Then, to find out which input that’s been changed, we use the className attribute.
   Have to use className attribute since there are more than one exercises and the name attribute has to be unique so we cant use it.
   Using className we can set it to match exercises property names 
*/
    function handleExerciseChange(e) {
        const updatedExercises = [...exerciseFormData]
        updatedExercises[e.target.dataset.idx][e.target.className] =
        e.target.value
        setExerciseFormData(updatedExercises)
    }

    const addExercise = () => {
        setExerciseFormData([...exerciseFormData, {...blankExercise}])
    }



    
       /* function handleExerciseChange(e) {
            setExerciseFormData({
                ...exerciseFormData, [e.target.id]: e.target.value
            })
        } */
        

    function handleSubmit(e) {
        e.preventDefault()
        fetch("http://localhost:9393/workouts/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: workoutFormData.name, day: workoutFormData.day, notes: workoutFormData.notes, exercises_attributes: exerciseFormData})
        })
        .then(r => r.json())
        .then(data => {
            addNewWorkout(data.workout)
            setWorkoutFormData({
                name: "",
                day: "",
                notes: ""
            })

        })
    }



// Mappping over array of exercises in exercise state  and using the maps index value to assign each pair of inputs unique ids, names, keys, and labels. The data-idx attribute will match the inputs to the index of the corresponding exercise object in the exercises state array.
    const mappedExerciseState = exerciseFormData.map((val, idx) => {
        const exerciseID = `name-${idx}`
        const repsID = `reps-${idx}`
        const setsID = `sets-${idx}`
        const notesID = `notes-${idx}`
        const weightID = `weight-${idx}`
        return (
            <div key={`exercise-${idx}`}>
                <label htmlFor={exerciseID}>{`Exercise #${idx + 1}`}</label>
                <input
                    type="text"
                    name={exerciseID}
                    data-idx={idx}
                    id={exerciseID}
                    className="name"
                    value={exerciseFormData[idx].name}
                    onChange={handleExerciseChange}
                />
                <label htmlFor={repsID}>Reps: </label>
                <input
                    type="number"
                    name={repsID}
                    data-idx={idx}
                    id={repsID}
                    className="reps"
                    value={exerciseFormData[idx].reps}
                    onChange={handleExerciseChange}
                />
                <label htmlFor={setsID}>Sets: </label>
                <input
                    type="number"
                    name={setsID}
                    data-idx={idx}
                    id={setsID}
                    className="sets"
                    value={exerciseFormData[idx].sets}
                    onChange={handleExerciseChange}
                />
                <label htmlFor={notesID}>Notes: </label>
                <input
                    type="text"
                    name={notesID}
                    data-idx={idx}
                    id={notesID}
                    className="notes"
                    value={exerciseFormData[idx].notes}
                    onChange={handleExerciseChange}
                />
                <label htmlFor={weightID}>Weight: </label>
                <input
                    type="number"
                    name={weightID}
                    data-idx={idx}
                    id={weightID}
                    className="weight"
                    value={exerciseFormData[idx].weight}
                    onChange={handleExerciseChange}
                />
            <div class="ui inverted divider"></div>
            </div>
        )
    })
    
    



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
                <div class="field"></div>
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
                <h4 class="ui horizontal inverted divider">
                    Add Exercises
                </h4>
                {/* <div class="field"></div>
                    <label>Name of Exercise:</label>
                    <input
                        type="text"
                        id="name"
                        value={exerciseFormData.name}
                        placeholder="Deadlift, Benchpress, etc"

                        />
                <div class="field"></div>
                    <label>Reps:</label>
                        <input
                            type="number"
                            id="reps"
                            value={exerciseFormData.reps}
                            placeholder="5, 10, etc"

                        />
                <div class="field"></div>
                    <label>Sets:</label>
                        <input
                            type="number"
                            id="sets"
                            value={exerciseFormData.sets}
                            placeholder="1, 2, 3, etc"

                        />
                <div class="field"></div>
                    <label>Notes:</label>
                        <input
                            type="text"
                            id="notes"
                            value={exerciseFormData.notes}
                            placeholder="'Watch for curve in back'"

                        />
                <div class="field"></div>
                    <label>Weight:</label>
                        <input
                            type="number"
                            id="weight"
                            value={exerciseFormData.weight}
                            placeholder="175, 250, etc"

                    /> */}
                    {mappedExerciseState}
                <br></br>
            {/*Type button inputs (not button elements) do not submit the form */}
            <input type="button" value="Add New Exercise" onClick={addExercise} />
            </div>
                <br></br>
            <button class="ui inverted submit button">Create Workout</button>
            </div>
        </form>
    )
}

export default NewWorkoutForm
