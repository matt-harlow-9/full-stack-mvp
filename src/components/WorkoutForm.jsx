import React, { useEffect, useState } from 'react';
import { useAppContext } from './AppContext';
import axios from 'axios';

import ExerciseRound from './ExerciseRound';


const WorkoutForm = () => {
    const {
        navigateToPage,
        selectedExerciseDetails, // object of selected exercise
        setSelectedExerciseDetails,
        allExerciseInfo, // array of all exerise objects
        setAllExerciseInfo,
        workoutId,
    } = useAppContext();
    const [selectedExercise, setSelectedExercise] = useState('');
    const [showAddExercise, setShowAddExercise] = useState(true);
    const [exerciseRounds, setExerciseRounds] = useState([]);

    // Fetch exercise names for use in drop down menu
    useEffect(() => {
        // Fetch, convert to JSON, create array of all exercise info
        fetch('http://localhost:3000/api/exercises')
            .then((res) => res.json())
            .then((data) => {
                setAllExerciseInfo(data);
            })
            .catch((error) => console.error("Error - Couldn't retrieve exercises: ", error))
    }, [])

    const addNewExerciseRound = () => {
        const newRound = {
            round: exerciseRounds.length + 1,
            exercise_id: selectedExercise,
            sets: []
        }
        setExerciseRounds([...exerciseRounds, newRound]);
    }

    return (
        <form>
            {exerciseRounds.map((round) => (
                <div className='exerciseRound'>
                    <ExerciseRound key={round.round} round={round}/>
                </div>
            ))}
            <div className='newExercise'>
                <button className='addExerciseButton' type='button' onClick={addNewExerciseRound}>Add Exercise</button>
            </div>
            <div className='finishWorkout'>
                <button className='finishWorkoutButton' type='submit'>Finish Workout</button>
            </div>
        </form>
    )
}

export default WorkoutForm;