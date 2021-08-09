import {NavLink} from 'react-router-dom' 

function NavBar() {
    return (
        <nav className="ui centered grid">
            <NavLink exact to="/">Workouts</NavLink>
            <NavLink to="/new_workout">+ Add New Workout</NavLink>
        </nav>
    )
}

export default NavBar