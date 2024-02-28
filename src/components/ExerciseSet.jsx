import React, { useState } from 'react';

const ExerciseSet = ({ index, set, onRepsChange, onWeightChange }) => {
  
  return (
    <div className='setContainer'>
      <div className='set'>{set.set}</div>
      <div className='reps'>
        <input 
          type='text'
          placeholder='Reps'
          onChange={(e) => onRepsChange(index, e.target.value)}
        />
      </div>
      <div className='weight'>
        <input
          type='text'
          placeholder='Weight'
          onChange={(e) => onWeightChange(index, e.target.value)}
        />
      </div>
    </div>
  );
};

export default ExerciseSet;
