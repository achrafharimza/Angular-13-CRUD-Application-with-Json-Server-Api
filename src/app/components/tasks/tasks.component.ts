import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasksT: Task[] = [];
  resultSearch: Task[] = [];
  editButton = false;
  addButton = false;
  searchText = '';

  myTask: Task = {
    label: '',
    completed: false,
  };

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    // this.taskService.findAll().subscribe((tasks) => (this.tasksT = tasks));
    this.taskService.findAll().subscribe((tasks) => {
      (this.tasksT = tasks), (this.resultSearch = tasks);
    });
  }
  deleteTask(id: number | undefined) {
    this.taskService.delete(id).subscribe(() => {
      this.tasksT = this.tasksT.filter((task) => task.id != id);
    });
  }

  persiteTask() {
    this.taskService.persiste(this.myTask).subscribe((task) => {
      // spread operator
      this.tasksT = [task, ...this.tasksT];
      this.resetMyTask();
      this.addButton = false;
    });
  }
  resetMyTask() {
    this.myTask = {
      label: '',
      completed: false,
    };
  }

  toggleCompleted(task: Task) {
    this.taskService.completed(task).subscribe(() => {
      task.completed = !task.completed;
    });
  }

  editTask(task: Task) {
    this.myTask = task;
    this.editButton = true;
  }
  newTask() {
    this.addButton = !this.addButton;
    this.editButton = false;
    this.resetMyTask();
  }

  updateTask() {
    console.log(this.myTask);
    this.taskService.update(this.myTask).subscribe((task) => {
      this.tasksT = [task, ...this.tasksT];
      this.resetMyTask();
      this.editButton = false;
    });
  }
  searchTasks() {
    this.resultSearch = this.tasksT.filter((task) =>
      task.label.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
