import React from 'react';
import { useAppContext } from './AppContext';

const Home = () => {
    const { navigateToPage, startNewWorkout } = useAppContext();
    return (
        <div>
            <h1>Galvanize Workout Tracker</h1>
            <button className='startWorkoutButton' onClick={() => startNewWorkout('workout')}>Start New Workout</button>
            <button onClick={() => navigateToPage('exerciseList')}>Exercise List</button>
        </div>
    )
}

export default Home;