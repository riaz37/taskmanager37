import mongoose, { Document, Schema } from 'mongoose';
import { ITask } from '@repo/types';

export interface ITaskDocument extends ITask, Document {
  userId: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITaskDocument>({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    minlength: [1, 'Task title must be at least 1 character long'],
    maxlength: [100, 'Task title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Task description cannot exceed 500 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  }
}, {
  timestamps: true
});

// Index for better query performance
taskSchema.index({ userId: 1, createdAt: -1 });

export const Task = mongoose.model<ITaskDocument>('Task', taskSchema); 