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
    
    // Check if req.body is available
    if (!req.body) {
      return res.status(400).json({ message: "No task data provided", success: false });
    }
    
    const { title, description, status } = req.body;
    
    // Use explicit checks so that false (a valid value) doesn't trigger an error
    if (title === undefined || description === undefined || status === undefined) {
      return res.status(400).json({ message: "Please fill all fields", success: false });
    }
    
    try {
      // Update all necessary fields. You can include 'status' here if you want to update it.
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
        return res.status(400).json({ 
            success: false,
            message: "Status field required" 
        });
    }

    try {
        const task = await Task.findByIdAndUpdate(
            id,
            { 
                status: typeof status === 'string' 
                    ? status.toLowerCase() === 'true'
                    : Boolean(status)
            },
            { new: true, runValidators: true }
        );

        return task 
            ? res.json({ success: true, data: task })
            : res.status(404).json({ success: false, message: "Task not found" });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Server error"
        });
    }
};