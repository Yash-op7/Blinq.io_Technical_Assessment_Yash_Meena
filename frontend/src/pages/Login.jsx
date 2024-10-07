import React, { useRef } from 'react'
import axios from '../api/axios';
import { Button } from "@/components/ui/button"
import { useAuthContext } from '../context/useAuthContext';

import { useNavigate } from 'react-router-dom';

const Login = () => {
  const formRef = useRef();
  const navigate= useNavigate();
  const {setIsLoggedIn, setUser} = useAuthContext();
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
    <div className='flex flex-col p-5 border justify-center items-center'>
      <h1 className='relative mb-4'>Login Form</h1>
      <form ref={formRef} onSubmit={submitHandler} className='flex flex-col justify-center items-center gap-5'>
        <div className='m-1 flex flex-row justify-end gap-5 items-center'>
          <label>Email</label>
          <input className='p-1 border border-gray-300' type='text' name='email' placeholder='Enter Email' />
        </div>
        <div className='m-1 flex flex-row justify-evenly gap-5 items-center'>
          <label>Password</label>
          <input className='p-1 border border-gray-300' type='password' name='password' placeholder='Enter Password' />
        </div>
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  )
}

export default Login