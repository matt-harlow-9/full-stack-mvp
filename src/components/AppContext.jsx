// MyContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

// Provider component that wraps children
export const AppProvider = ({ children }) => {
  const [exerciseNameList, setExerciseNameList] = useState([]);
  const [currentExercise, setCurrentExercise] = useState({});
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);

  const navigateToPage = (page, exerciseId = null) => {
    setCurrentPage(page);
    setSelectedExerciseId(exerciseId);
  }

  const contextValue = {
    exerciseNameList,
    setExerciseNameList,
    currentPage,
    selectedExerciseId,
    navigateToPage,
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
