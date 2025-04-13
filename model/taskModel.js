import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: Boolean, default: false, required: true}
},
{
    timestamps: true,
}

);

const Task = mongoose.model('Task', taskSchema)
export default Task;