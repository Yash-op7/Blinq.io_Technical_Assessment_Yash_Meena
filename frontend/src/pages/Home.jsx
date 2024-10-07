import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import { useAuthContext } from '../context/useAuthContext'
import Cookies from 'js-cookie';
import Task from '../components/Task';

const Home = () => {
  const {user} = useAuthContext();
  const [tasks, setTasks] = useState();



  useEffect( () => {
    async function fetchAllTasks  () {
      try {
        const userTasks = await axios.get('/api/tasks/all',{ withCredentials: true });
        setTasks(userTasks.data.data)
      } catch (error) {
        console.log(error)
      }
    }
     fetchAllTasks();
  },[])

  return (
    <div>
      <h1>
        Welcome {user.name}
      </h1>
      {
        tasks?.map((task, idx) => {
          return <Task key={idx} data={task} />
        } )
      }
    </div>
  )
}

export default Home