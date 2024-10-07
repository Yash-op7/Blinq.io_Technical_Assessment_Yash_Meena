import React, { useRef } from 'react';
import axios from '../api/axios';
import { Button } from "@/components/ui/button";
import { useAuthContext } from '../context/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuthContext();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    try {
      const user = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
      };
      const response = await axios.post('/auth/signup', user, { withCredentials: true });
      console.log(user);
      
      setUser(user);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(`Error: ${error.response.data.message || 'Signup failed'}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        alert('Error: No response from server');
      } else {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <div className='p-4 border shadow-md border-black flex flex-col gap-5'>
        <h1 className='text-4xl m-5'>Signup Form</h1>
        <form ref={formRef} onSubmit={submitHandler} className='flex flex-col gap-5'>
          <div className='flex gap-5 justify-between items-center'>
            <label htmlFor='name'>Name</label>
            <input className='border border-gray-300 p-1 rounded-md drop-shadow' type='text' id='name' name='name' placeholder='Enter Name' required />
          </div>
          <div className='flex gap-5 justify-between items-center'>
            <label htmlFor='email'>Email</label>
            <input className='border border-gray-300 p-1 rounded-md drop-shadow' type='email' id='email' name='email' placeholder='Enter Email' required />
          </div>
          <div className='flex gap-5 justify-between items-center'>
            <label htmlFor='password'>Password</label>
            <input className='border border-gray-300 p-1 rounded-md drop-shadow' type='password' id='password' name='password' placeholder='Enter Password' required />
          </div>
          <Button type='submit' className='text-white'>Submit</Button>
        </form>
        <h1 className='text-center'>OR</h1>
        <Button onClick={handleLoginRedirect} className='w-full'>Already have an account? Log in</Button>
      </div>
    </div>
  );
};

export default Signup;
