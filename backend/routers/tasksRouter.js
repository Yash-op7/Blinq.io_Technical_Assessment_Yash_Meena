import express from "express";
import taskContoller from "../controllers/tasksController.js";
import { validateTaskSchema } from "../middlewares/validator.js";

const router = express.Router();

// CRUD routes
router.get('/all', taskContoller.getAllTasks)
router.post('/new',validateTaskSchema , taskContoller.createTask)
router.delete('/:id', taskContoller.deleteTask)
router.patch('/:id', taskContoller.updateTask)


export {router};