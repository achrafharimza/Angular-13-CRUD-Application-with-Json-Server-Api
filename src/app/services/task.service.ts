import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  apiUrl = 'http://localhost:3000/tasks';

  findAll() {
    return this.http.get<Task[]>('http://localhost:3000/tasks');
  }
  delete(id: number | undefined) {
    return this.http.delete(`http://localhost:3000/tasks/${id}`);
  }

  persiste(task: Task) {
    return this.http.post<Task>(this.apiUrl, task);
  }
  completed(task: Task) {
    return this.http.patch(`${this.apiUrl}/${task.id}`, {
      completed: !task.completed,
    });
  }
  update(task: Task) {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }
}
