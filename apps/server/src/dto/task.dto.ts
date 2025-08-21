import { IsString, IsOptional, IsBoolean, MinLength } from 'class-validator';
import { CreateTaskRequest, UpdateTaskRequest } from '@repo/types';

export class CreateTaskDto implements CreateTaskRequest {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateTaskDto implements UpdateTaskRequest {
  @IsString()
  @MinLength(1)
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
