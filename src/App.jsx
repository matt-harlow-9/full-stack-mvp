// Import hooks, context provider, CSS styling
import { useState, useEffect } from 'react';
import { AppProvider, useAppContext } from './components/AppContext';
import './App.css'

// Import components
import Home from './components/Home';
import ExerciseList from './components/ExerciseList';
import ExerciseDetails from './components/ExerciseDetails';
import Workout from './components/Workout';

// AppContent component will choose which component to render based on the currentPage
const AppContent = () => {
  const { currentPage } = useAppContext();
  
  return (
    <>
      {currentPage === 'home' && <Home />}
      {currentPage === 'exerciseList' && <ExerciseList />}
      {currentPage === 'exerciseDetails' && <ExerciseDetails />}
      {currentPage === 'workout' && <Workout />}
    </>
  )
}
// App component wraps selected components in AppProvider
const App = () => {
  return (
    <>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </>
  )
}

export default App;
