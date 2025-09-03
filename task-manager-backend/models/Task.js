import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, // Link to the user who created it
        ref: 'User', 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    completed: { 
        type: Boolean, 
        default: false 
    },
}, { timestamps: true });

const Task = model('Task', taskSchema);

export default Task;