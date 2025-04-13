import express from "express";
import { createTask, deleteTask, updateTask, getTask, updateStatus } from "../controller/taskController.js";

const taskRouter = express.Router();

taskRouter.route('/').post(createTask).get(getTask);
taskRouter.route('/:id').put(updateTask).delete(deleteTask);
taskRouter.route('/status/:id').put(updateStatus);

export default taskRouter;