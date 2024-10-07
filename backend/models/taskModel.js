import mongoose, { mongo } from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required.']
    },
    content: {
        type: String,
        default: ''
    },
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task;