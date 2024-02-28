import React, { useState } from 'react';

const WeightNumber = ({ index, set, onWeightChange }) => {
  
  return (
      <div className='weight'>
        <input
          type='text'
          value={set.weight}
          placeholder='Weight'
          onChange={(e) => onWeightChange(index, e.target.value)}
        />
      </div>
  );
};

export default WeightNumber;