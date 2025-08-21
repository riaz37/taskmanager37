import express, { Request, Response } from 'express';
import { Task } from '../models/Task';
import { auth } from '../middleware/auth';
import { CreateTaskRequest, UpdateTaskRequest, ApiResponse } from '@repo/types';

const router = express.Router();

// Apply auth middleware to all task routes
router.use(auth);

// Get all tasks for the authenticated user
router.get('/', async (req: Request, res: Response<ApiResponse>) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: tasks,
      message: 'Tasks retrieved successfully'
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Create a new task
router.post('/', async (req: Request<{}, {}, CreateTaskRequest>, res: Response<ApiResponse>) => {
  try {
    const { title, description } = req.body;
    
    const task = new Task({
      title,
      description,
      userId: req.user._id
    });
    
    await task.save();
    
    res.status(201).json({
      success: true,
      data: task,
      message: 'Task created successfully'
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Update a task
router.put('/:id', async (req: Request<{ id: string }, {}, UpdateTaskRequest>, res: Response<ApiResponse>) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      updates,
      { new: true, runValidators: true }
    );
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      data: task,
      message: 'Task updated successfully'
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Delete a task
router.delete('/:id', async (req: Request<{ id: string }>, res: Response<ApiResponse>) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Toggle task completion status
router.patch('/:id/toggle', async (req: Request<{ id: string }>, res: Response<ApiResponse>) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findOne({ _id: id, userId: req.user._id });
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }
    
    task.completed = !task.completed;
    await task.save();
    
    res.json({
      success: true,
      data: task,
      message: 'Task status updated successfully'
    });
  } catch (error) {
    console.error('Toggle task error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export default router; 