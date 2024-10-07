import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import { useAuthContext } from '../context/useAuthContext'
import Cookies from 'js-cookie';


const Home = () => {
  const {user} = useAuthContext();
  const [tasks, setTasks] = useState();



  useEffect( () => {
    async function fetchAllTasks  () {
      try {
        const userTasks = await axios.get('/api/tasks/all');
        console.log(userTasks);
      } catch (error) {
        console.log(error)
      }
    }
    //  fetchAllTasks();
    console.log(Cookies.get('Authorization'))
  },[])

  return (
    <div>
      <h1>
        Welcome {user.name}
      </h1>
      {

      }
    </div>
  )
}

export default Home