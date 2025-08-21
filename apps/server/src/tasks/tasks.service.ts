import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';
import { UserData } from '@repo/types';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async findAll(userId: string): Promise<Task[]> {
    return this.taskModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async create(createTaskDto: CreateTaskDto, user: UserData): Promise<Task> {
    const task = new this.taskModel({
      ...createTaskDto,
      userId: user._id,
    });
    return task.save();
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: UserData,
  ): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: id, userId: user._id });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    Object.assign(task, updateTaskDto);
    return task.save();
  }

  async remove(id: string, user: UserData): Promise<void> {
    const result = await this.taskModel.deleteOne({
      _id: id,
      userId: user._id,
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException('Task not found');
    }
  }

  async toggle(id: string, user: UserData): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: id, userId: user._id });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    task.completed = !task.completed;
    return task.save();
  }
}
