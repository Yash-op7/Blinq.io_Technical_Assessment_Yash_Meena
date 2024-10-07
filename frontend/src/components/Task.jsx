import React from "react";
import {Button} from './ui/button'
import axios from "../api/axios";

const Task = ({ data, setTriggerRefetch }) => {
    const handleUpdate = async () =>{
        
    }
    const handleDelete = async () =>{
        try {
            const response = await axios.delete(`/api/tasks/${data._id}`, {withCredentials:true});
            setTriggerRefetch(prev => !prev);
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert(`Error: ${error.response.data.message || 'Deletion failed'}`);
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
    <div className="w-screen flex flex-row items-center justify-between border p-2">
      <div className="flex flex-col items-center justify-around  p-2">
        <h1 className="text-3xl">{data.title}</h1>
        <p className="max-w-56">{data.content}</p>
      </div>
      <div className="flex gap-3">
        <Button onClick={handleUpdate}>Update</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default Task;
