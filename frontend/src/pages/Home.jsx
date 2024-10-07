import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useAuthContext } from '../context/useAuthContext';
import Task from '../components/Task';
import { Button } from '../components/ui/button';

const Home = () => {
  const { user } = useAuthContext();
  const [tasks, setTasks] = useState([]);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskContent, setNewTaskContent] = useState('');

  useEffect(() => {
    async function fetchAllTasks() {
      try {
        const userTasks = await axios.get('/api/tasks/all', { withCredentials: true });
        setTasks(userTasks.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllTasks();
  }, [triggerRefetch]);

  const handleNewTask = async () => {
    if (!newTaskTitle || !newTaskContent) {
      alert('Please provide both title and content for the new task.');
      return;
    }

    try {
      const response = await axios.post('/api/tasks/new', { title: newTaskTitle, content: newTaskContent }, { withCredentials: true });
      console.log('New Task Created:', response.data);
      setNewTaskTitle(''); 
      setNewTaskContent('');
      setTriggerRefetch(prev => !prev); 
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(`Error: ${error.response.data.message || 'Creation failed'}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        alert('Error: No response from server');
      } else {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h1 className='text-5xl text-center m-10'>
        Welcome {user.name}
      </h1>
      <div className="mb-4 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="border p-1 mr-2"
        />
        <textarea
          placeholder="Task Content"
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
          className="border p-1 mr-2"
        />
        <Button onClick={handleNewTask}>Create Task</Button>
      </div>
      {
        tasks?.map((task, idx) => (
          <Task key={idx} setTriggerRefetch={setTriggerRefetch} data={task} />
        ))
      }
    </div>
  );
};

export default Home;
