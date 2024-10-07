import React, { useRef } from 'react'
import axios from '../api/axios';
import { Button } from "@/components/ui/button"
import { useAuthContext } from '../context/useAuthContext';

import { useNavigate } from 'react-router-dom';

const Login = () => {
  const formRef = useRef();
  const navigate= useNavigate();
  const {setIsLoggedIn, setUser, isLoggedIn} = useAuthContext();
  const submitHandler =async(e) => {
    e.preventDefault();
    const formData= new FormData(formRef.current);

    try {
      const user = {
        email:formData.get('email'),
        password: formData.get('password')
      }
      const response = await axios.post('/auth/login', user, { withCredentials: true });
      setUser(response.data.user);
      setIsLoggedIn(true);
navigate('/');
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(`Error: ${error.response.data.message || 'Login failed'}`);
    } else if (error.request) {
        console.error('Error request:', error.request);
        alert('Error: No response from server');
    } else {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
    }

    }
  }
  return (
    <div className='h-screen flex flex-col justify-center items-center'>

    <div className=' p-4 border  shadow-md border-black'>
      {/* {isLoggedIn ? <p>welcome user</p>:<p>please log in</p>} */}
      <h1 className='text-4xl m-5'>Login Form</h1>
      <form ref={formRef} onSubmit={submitHandler} className='flex flex-col gap-5'>
        <div className='flex gap-5 justify-between items-center'>
          <label htmlFor='email'>Email</label>
          <input className='border border-gray-300 p-1 rounded-md drop-shadow' type='email' id='email' name='email' placeholder='Enter Email'/>
        </div>
        <div className='flex gap-5 justify-between items-center'>
          <label htmlFor='password'>Password</label>
          <input className='border border-gray-300 p-1 rounded-md' type='password' id='password' name='password' placeholder='Enter Password'/>
        </div>
        <Button value='Submit' type='submit' className='text-white'> Submit</Button>
      </form>
    </div>
  </div>
  )
}

export default Login