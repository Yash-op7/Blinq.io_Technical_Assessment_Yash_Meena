import React from 'react'
import { useAuthContext } from '../context/useAuthContext'
import { Button } from "@/components/ui/button";
import axios from '../api/axios';


const Navbar = () => {
    const {isLoggedIn, setIsLoggedIn} = useAuthContext();
    const handleLogout = async() => {
        try {
            await axios.post('/auth/logout', {}, {withCredentials:true});
            setIsLoggedIn(false);
            console.log('log out successful.')
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert(`Error: ${error.response.data.message || 'Logout failed'}`);
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
    <div className='bg-black h-1/5 fixed top-0 flex flex-row justify-around items-center w-screen'>
        <h1 className='text-3xl text-white'>Task CRUD App</h1>
        {isLoggedIn ? <Button onClick={handleLogout}>Logout</Button>:<Button>Login</Button>}
    </div>
  )
}

export default Navbar