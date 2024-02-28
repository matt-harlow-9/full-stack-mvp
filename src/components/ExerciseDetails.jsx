import React, { useState, useEffect } from 'react';
import { useAppContext } from './AppContext';

const ExerciseDetails = () => {
    const {
        navigateToPage,
        selectedExerciseId,
        selectedExerciseDetails,
        setSelectedExerciseDetails
    } = useAppContext();

    useEffect(() => {
        fetch(`https://full-stack-mvp.onrender.com/api/exercises/${selectedExerciseId}`)
            .then((res) => res.json())
            .then((data) => {
                setSelectedExerciseDetails(data[0]);
            })
            .catch((error) => console.error('Error fetching exercise details: ', error))
    }, []);

    return (
        <div>
            <h2>{selectedExerciseDetails.name}</h2>
            <p>Category: {selectedExerciseDetails.category}</p>
            <p>Description: {selectedExerciseDetails.description}</p>
            <button onClick={() => navigateToPage('exerciseList')}>Back To Exercises</button>
        </div>
    )
}

export default ExerciseDetails;