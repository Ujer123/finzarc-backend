import Task from "../model/taskModel.js";

export const createTask = async(req, res)=>{
    const {title, description} = req.body;
    if(!title || !description ){
        return res.status(400).json({message: "Please fill all fields", success: false})
    }
    try {
        const task = new Task({title, description});
        await task.save();
        return res.status(201).json({message: "Task created successfully", success: true})
    } catch (error) {
        res.status(500).json({message: "Internal server error", success: false})
    }
}

export const getTask = async(req, res)=>{
    try {
        const tasks = await Task.find();
        return res.status(200).json({data: tasks, success: true})
    } catch (error) {
        res.status(500).json({message: "Internal server error", success: false})
    }
}

export const updateTask = async (req, res) => {
    const { id } = req.params;
    if (!req.body) {
      return res.status(400).json({ message: "No task data provided", success: false });
    }
    
    const { title, description, status } = req.body;
    
    if (title === undefined || description === undefined || status === undefined) {
      return res.status(400).json({ message: "Please fill all fields", success: false });
    }
    
    try {
      const task = await Task.findByIdAndUpdate(id, { title, description, status }, { new: true });
      if (!task) {
        return res.status(404).json({ message: "Task not found", success: false });
      }
      return res.status(200).json({
        message: "Task updated successfully", 
        success: true,
        data: task
      });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", success: false });
    }
  };
  

export const deleteTask = async(req, res)=>{
    const {id} = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);
        if(!task){
            return res.status(404).json({message: "Task not found", success: false})
        }
        return res.status(200).json({message: "Task deleted successfully", success: true})
    } catch (error) {
        res.status(500).json({message: "Internal server error", success: false})
    }
}

export const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (status === undefined) {
        return res.status(400).json({message: "Please provide the status", success: false});
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(id,{ status });
        if (!updatedTask) {
            return res.status(404).json({message: "Task not found", success: false});
        }

        return res.status(201).json({message: "Status updated successfully", success: true, data: updatedTask});
    } catch (error) {
        return res.status(500).json({message: "Internal server error", success: false});
    }
};