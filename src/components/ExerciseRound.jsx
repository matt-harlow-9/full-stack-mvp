import React, { useEffect, useState } from 'react';
import { useAppContext } from './AppContext';
import axios from 'axios';
import ExerciseSet from './ExerciseSet';
import SetNumber from './SetNumber';
import RepNumber from './RepNumber';
import WeightNumber from './WeightNumber';

import '../App.css';

const ExerciseRound = () => {
    const {
        navigateToPage,
        selectedExerciseDetails,
        setSelectedExerciseDetails,
        allExerciseInfo, // array of all exercise objects
        setAllExerciseInfo,
        workoutId,
    } = useAppContext();

    const [selectedExercise, setSelectedExercise] = useState('');
    const [sets, setSets] = useState([]);
    const [repNumber, setRepNumber] = useState();
    const [weightNumber, setWeightNumber] = useState();

    const handleExerciseSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            workout_id: workoutId,
            exercise_id: selectedExercise,
            sets: sets.length,
            reps: repNumber,
            weight: sets[sets.length - 1].weight
        }
        try {
            const res = await axios.post('http://localhost:3000/api/workout-details', formData);
            if (res.status === 200) {
                console.log('Exercise submitted successfully')
            } else {
                console.error('Failed to submit exercise round: ', res.statusText)
            }
        } catch (error) {
            console.error('Error submitting exercise: ', error.message);
        }
    }
    
    const handleExerciseChange = (event) => {
        setSelectedExercise(event.target.value);
    }

    const handleRepsChange = (index, value) => {
        const updatedSets = [...sets];
        updatedSets[index].reps = value;
        setSets(updatedSets);
      };
    
    const handleWeightChange = (index, value) => {
        const updatedSets = [...sets];
        updatedSets[index].weight = value;
        setSets(updatedSets);
    };

    const addNewSet = () => {
        const newSet = {
            set: sets.length + 1,
            reps: '',
            weight: ''
        }
        setSets([...sets, newSet]);
    }

    const selectedExerciseInfo = allExerciseInfo[Number(selectedExercise) - 1];

    return (
        <>
            <div className='dropdown-container'>
                <select className='dropdown-select' value={selectedExercise} onChange={handleExerciseChange}>
                    <option value='' disabled>Select an exercise</option>
                    {allExerciseInfo.map((exercise) => (
                        <option key={exercise.exercise_id} value={exercise.exercise_id}>
                            {exercise.name}
                        </option>
                    ))}
                </select>
                <div className='dropdown-options'>
                    {allExerciseInfo.map((exercise) => (
                        <option key={exercise.exercise_id} value={exercise.exercise_id}>
                            {exercise.name}
                        </option>
                    ))}
                </div>
            </div>
            {selectedExercise && (
                <>
                    <div className='selectedExercise'>{selectedExerciseInfo.name}</div>
                    <div className='roundTemplate'>
                        <span className='columnHeading'>Sets</span>
                        <span className='columnHeading'>Reps</span>
                        <span className='columnHeading'>Weight</span>
                    </div>
                    {sets.map((set, index) => (
                        <ExerciseSet set={set} key={index} />
                    ))}
                    <button className='newSetButton' type='button' onClick={addNewSet}>
                        Add New Set
                    </button>
                </>
            )}
        </>
    );
};

export default ExerciseRound;
