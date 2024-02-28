import React, { useEffect } from 'react';
import { useAppContext } from './AppContext';

const ExerciseList = () => {
    const { navigateToPage, exerciseNameList, setExerciseNameList } = useAppContext();
    useEffect(() => {
        fetch('https://full-stack-mvp.onrender.com/api/exercises')
            .then((res) => res.json())
            .then((data) => {
                const names = data.map((exercise) => exercise.name);
                setExerciseNameList(names);
            })
            .catch((error) => console.error('Error fetching exercise name list: ', error));
    }, []);
    return (
        <div>
            <h1>Exercise List</h1>
            <ul>
                {exerciseNameList.map((exName, index) => (
                    <li key={index}>
                        <button onClick={() => navigateToPage('exerciseDetails', index + 1)}>{exName}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ExerciseList