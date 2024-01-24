import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];
  create(task: TaskDto) {
    this.tasks.push(task);
  }

  listAll(): TaskDto[] {
    return this.tasks;
  }

  update(task: TaskDto) {
    let taskIndex = this.tasks.findIndex(t => t.id === task.id)

    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task
      return
    }
    throw new HttpException(`Task with id ${task.id} not found`, HttpStatus.BAD_REQUEST)
  }
}
