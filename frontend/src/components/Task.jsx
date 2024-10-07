import React from "react";
import {Button} from './ui/button'

const Task = ({ data }) => {
  return (
    <div className="w-screen flex flex-row items-center justify-between border p-2">
      <div className="flex flex-col items-center justify-around  p-2">
        <h1 className="text-3xl">{data.title}</h1>
        <p>{data.content}</p>
      </div>
      <div className="flex gap-3">
        <Button>Update</Button>
        <Button>Delete</Button>
      </div>
    </div>
  );
};

export default Task;
