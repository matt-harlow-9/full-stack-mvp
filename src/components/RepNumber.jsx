import React, { useState } from 'react';

const RepNumber = ({ index, set, onRepsChange }) => {
  
  return (
      <div className='reps'>
        <input 
          type='text'
          value={set.reps}
          placeholder='Reps'
          onChange={(e) => onRepsChange(index, e.target.value)}
        />
      </div>
  );
};

export default RepNumber;