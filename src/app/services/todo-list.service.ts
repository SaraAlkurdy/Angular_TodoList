import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoList } from '../models/todolist.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  baseURL = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient) {}

  getTodoList(): Observable<any> {
    return this.http.get(this.baseURL + 'posts');
  }

  deleteTodoList(id: number): Observable<any> {
    return this.http.delete(this.baseURL + 'posts/' + id);
  }

  addTodoList(body: TodoList): Observable<any> {
    return this.http.post(this.baseURL + 'posts', body);
  }

  updateTodoList(id: number, body: TodoList): Observable<any> {
    return this.http.put(this.baseURL + 'posts/' + id, body);
  }
}
