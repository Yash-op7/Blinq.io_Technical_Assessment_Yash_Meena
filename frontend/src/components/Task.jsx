import React, { useState } from "react";
import { Button } from './ui/button';
import axios from "../api/axios";

const Task = ({ data, setTriggerRefetch }) => {
    const [isEditing, setIsEditing] = useState(false);
const [updatedTitle, setUpdatedTitle] = useState(data.title);
    const [updatedContent, setUpdatedContent] = useState(data.content);

    const handleUpdate = async () => {
        try {
            const response = await axios.patch(
                `/api/tasks/${data._id}`,
                { title: updatedTitle, content: updatedContent },
                { withCredentials: true }
            );
            console.log('Update response:', response.data);
            setTriggerRefetch(prev => !prev);
            setIsEditing(false); 
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                alert(`Error: ${error.response.data.message || 'Update failed'}`);
            } else if (error.request) {
                console.error('Error request:', error.request);
                alert('Error: No response from server');
            } else {
                console.error('Error:', error.message);
                alert(`Error: ${error.message}`);
            }
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/api/tasks/${data._id}`, { withCredentials: true });
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
    };

    return (
        <div className="w-screen flex flex-row items-center justify-between border p-2">
            <div className="flex flex-col items-center justify-around p-2">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            className="border p-1"
                        />
                        <textarea
                            value={updatedContent}
                            onChange={(e) => setUpdatedContent(e.target.value)}
                            className="border p-1"
                        />
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl">{data.title}</h1>
                        <p className="max-w-56">{data.content}</p>
                    </>
                )}
            </div>
            <div className="flex gap-3">
                {isEditing ? (
                    <>
                        <Button onClick={handleUpdate}>Save</Button>
                        <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                    </>
                ) : (
                    <Button onClick={() => setIsEditing(true)}>Update</Button>
                )}
                <Button onClick={handleDelete}>Delete</Button>
            </div>
        </div>
    );
};

export default Task;
