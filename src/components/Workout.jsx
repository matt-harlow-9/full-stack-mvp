import React, { useState } from 'react';
import WorkoutForm from './WorkoutForm';
import { useAppContext } from './AppContext';

// Page for new workout
// Allow you to pick exercise, then listing entry boxes for each set, reps, and weight
const Workout = () => {
    const { workoutId, workoutDate, workoutForm, addWorkoutForm } = useAppContext();

    return (
        <>
            <h2>New Workout</h2>
            <WorkoutForm key={workoutForm.formId} />
            <button className="homeButton" onClick={() => navigateToPage('home')}>Home</button>
        </>
    )
}

export default Workout;