import React, { useEffect, useState } from 'react';
import AddTask from './components/AddTask';
import ListTask from './components/ListTask';
import FilterTask from './components/FilterTask';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(()=>{
    const stored = localStorage.getItem('tasks');
    return stored? JSON.parse(stored):[];
  });
  const [filter, setFilter] = useState('All');

  useEffect(()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
  },[tasks]);

  function addTask(title) {
    if (title.trim() === '') return;
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>Task Management Dashboard</h1>
      <AddTask onAdd={addTask} />
      <FilterTask filter={filter} setFilter={setFilter} />
      <ListTask
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default App;