import Task from "../models/taskModel.js";
import User from "../models/userModel.js";

const getAllTasks = async (req, res) => {
  try {
    const newUser = await User.findById(req.user._doc._id).populate("tasks");
    const tasks = newUser.tasks;
    return res.status(200).json({
      message: "Successfully fetched all the tasks",
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Database error",
      error,
    });
  }
};
const updateTask = async (req, res) => {
    const taskId = req.params.id;
  try {
    const doesTaskExist = await Task.findOne({ _id: taskId });
    if (!doesTaskExist) {
      return res.status(400).json({
        message: "Task to be updated doesn't exist.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to find task in the database.",
      error,
    });
  }

  try {
    const updatedTask = await Task.updateOne({_id: taskId}, {...req.body});
    console.log(updateTask)
    res.status(200).json({
        message:'Updated task successfully.'
    })
  } catch (error) {
    return res.status(500).json({
        message:'DB error while updating task.',
        error
    })
  }

};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const doesTaskExist = await Task.findOne({ _id: taskId });
    if (!doesTaskExist) {
      return res.status(400).json({
        message: "Task to be deleted doesn't exist.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete",
      error,
    });
  }

  try {
    await Task.deleteOne({ _id: taskId });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete",
      error,
    });
  }
  return res.status(200).json({
    message: "Successfully deleted task",
  });
};

const createTask = async (req, res) => {
  let newTask;
  try {
    newTask = await Task.create(req.body);
  } catch (error) {
    return res.status(500).json({
      message: "Database error while creating task, please try again.",
    });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._doc._id, {
      $push: { tasks: newTask._id },
    });
    return res.status("200").json({
      message: "Succesfully created the task.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Database error while creating task, please try again.",
    });
  }
};

const taskContoller = { getAllTasks, updateTask, deleteTask, createTask };
export default taskContoller;
