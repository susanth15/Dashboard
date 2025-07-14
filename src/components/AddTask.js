import React, { useState } from 'react';

function AddTask({ onAdd }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if(inputValue.trim()===''){
      alert('Task cannot be empty!');
      return;
    }
    onAdd(inputValue);
    setInputValue('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter new task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Task</button>
    </div>
  );
}

export default AddTask;