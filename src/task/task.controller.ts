import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  create(@Body() task: TaskDto) {
    return this.taskService.create(task);
  }

  @Get()
  listAll(): TaskDto[] {
    return this.taskService.listAll();
  }

  @Put()
  update(@Body() task: TaskDto) {
    return this.taskService.update(task);
  }
}
