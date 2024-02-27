import { useState, useEffect } from 'react';
import './App.css'
import Home from './components/Home';

const App = () => {
  const [exerciseList, setExerciseList] = useState([]);
  const [currentExercise, setCurrentExercise] = useState({});

  useEffect(() => {
    const getExerciseList = async () => {
      const res = await fetch('http://localhost:3000/api/exercises/')
      const data = await res.json()
      console.log(data);
      setExerciseList(data);
    }
    getExerciseList()
  }, []);

  const getSingleExercise = async (id) => {
    const res = await fetch(`http://localhost:3000/api/exercises/${id}`)
    const data = await res.json()
    setCurrentExercise(data)
  }


  return (
    <>
      <Home 
        exerciseList={exerciseList}
        getSingleExercise={getSingleExercise} 
      />
    </>
  )
}

export default App;
