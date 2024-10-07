import React from 'react'
import { useAuthContext } from '../context/useAuthContext'
import { Button } from "@/components/ui/button";


const Navbar = () => {
    const {isLoggedIn} = useAuthContext();
  return (
    <div className='bg-black h-1/5 fixed top-0 flex flex-row justify-around items-center w-screen'>
        <h1 className='text-3xl text-white'>Task CRUD App</h1>
        {isLoggedIn ? <Button>Logout</Button>:<Button>Login</Button>}
    </div>
  )
}

export default Navbar