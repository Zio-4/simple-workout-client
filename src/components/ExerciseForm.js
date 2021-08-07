import {useState} from 'react'

function ExerciseForm() {

    const [exerciseFormData, setExerciseFormData] = useState({
        name: "",
        reps: 0,
        sets: 0,
        notes: "",
        weight: 0
    })

    function handleChange(e) {
        setExerciseFormData({
            ...exerciseFormData, [e.target.id]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch ('http://localhost:9393/exercises/', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: exerciseFormData.name, reps: exerciseFormData.reps, sets: exerciseFormData.sets, notes: exerciseFormData.notes, weight: exerciseFormData.weight})
        })
        .then(r => r.json())
        .then(data => {
            setExerciseFormData({
                name: "",
                reps: 0,
                sets: 0,
                notes: "",
                weight: 0  
            })
        })
    }



    return (
        <form onSubmit={handleSubmit}>
            <label>Name of Exercise:</label>
                <input
                    type="text"
                    id="name"
                    value={exerciseFormData.name}
                    placeholder="Deadlift, Benchpress, etc"
                    onChange={handleChange}
            />
            <label>Reps:</label>
                <input
                    type="number"
                    id="reps"
                    value={exerciseFormData.reps}
                    placeholder="5, 10, etc"
                    onChange={handleChange}
            />
            <label>Sets:</label>
                <input
                    type="number"
                    id="sets"
                    value={exerciseFormData.sets}
                    placeholder="1, 2, 3, etc"
                    onChange={handleChange}
            />
            <label>Notes:</label>
                <input
                    type="text"
                    id="notes"
                    value={exerciseFormData.notes}
                    placeholder="'Watch for curve in back'"
                    onChange={handleChange}
            />
            <label>Weight:</label>
                <input
                    type="number"
                    id="weight"
                    value={exerciseFormData.weight}
                    placeholder="175, 250, etc"
                    onChange={handleChange}
            />
            <button>Add Exercise</button>
        </form>
    )
}

export default ExerciseForm
