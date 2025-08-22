import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';
import { Task, ApiResponse } from '@repo/types';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(@Request() req): Promise<ApiResponse<Task[]>> {
    try {
      const tasks = await this.tasksService.findAll(req.user._id);
      return {
        success: true,
        data: tasks,
        message: 'Tasks retrieved successfully',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  }

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req,
  ): Promise<ApiResponse<Task>> {
    try {
      const task = await this.tasksService.create(createTaskDto, req.user);
      return {
        success: true,
        data: task,
        message: 'Task created successfully',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ): Promise<ApiResponse<Task>> {
    try {
      const task = await this.tasksService.update(id, updateTaskDto, req.user);
      return {
        success: true,
        data: task,
        message: 'Task updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Request() req,
  ): Promise<ApiResponse<null>> {
    try {
      await this.tasksService.remove(id, req.user);
      return {
        success: true,
        data: null,
        message: 'Task deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  }

  @Patch(':id/toggle')
  async toggle(
    @Param('id') id: string,
    @Request() req,
  ): Promise<ApiResponse<Task>> {
    try {
      const task = await this.tasksService.toggle(id, req.user);
      return {
        success: true,
        data: task,
        message: 'Task toggled successfully',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  }
}
