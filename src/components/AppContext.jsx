// MyContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AppContext = createContext();

// Provider component that wraps children
export const AppProvider = ({ children }) => {
  const [exerciseNameList, setExerciseNameList] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);
  const [selectedExerciseDetails, setSelectedExerciseDetails] = useState({});
  const [allExerciseInfo, setAllExerciseInfo] = useState([]);
  const [workoutId, setWorkoutId] = useState(null);
  const [workoutDate, setWorkoutDate] = useState(null);
  const [workoutForm, setWorkoutForm] = useState([]);

  const navigateToPage = (page, exerciseId = null) => {
    setCurrentPage(page);
    setSelectedExerciseId(exerciseId);
    setSelectedExerciseDetails({});
  }

  const startNewWorkout = async (page, exerciseId) => {
    try {
      const res = await axios.post('http://localhost:3000/api/workouts', {
          date: new Date(),  // Add the date parameter if required
          notes: '',  // Add the notes parameter if required
      });
      if (res.status === 200) {
        const newWorkoutId = res.data.workout_id;
        const newWorkoutDate = res.data.date;
        setWorkoutId(newWorkoutId);
        setWorkoutDate(newWorkoutDate);
        console.log('New workout created with id: ', newWorkoutId);
      } else {
        console.error('Failed to start a new workout: ', res.status, '-', res.statusText);
      }
    } catch (error) {
      console.error('Error starting new workout: ', error)
    }
    addWorkoutForm();
    navigateToPage(page, null);
  };

  const addWorkoutForm = () => {
    const newWorkoutForm = {
        formId: workoutForm.length + 1,
        workoutId: workoutId,
        workoutDate: workoutDate
    }
    setWorkoutForm([...workoutForm, newWorkoutForm]);
}

  const contextValue = {
    exerciseNameList,
    setExerciseNameList,
    currentPage,
    selectedExerciseId,
    navigateToPage,
    selectedExerciseDetails,
    setSelectedExerciseDetails,
    allExerciseInfo,
    setAllExerciseInfo,
    startNewWorkout,
    workoutId,
    workoutDate,
    workoutForm,
    addWorkoutForm
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
