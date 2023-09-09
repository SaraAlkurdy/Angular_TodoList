import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { TodoListService } from 'src/app/services/todo-list.service';
import { TodoList } from 'src/app/models/todolist.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  showModal: boolean = false;
  isEdit: boolean = false;
  date = new Date();
  todoList: TodoList[] = [];
  details?: TodoList;

  constructor(private todoListService: TodoListService) {}

  ngOnInit(): void {
    this.handleGetTodoList();
  }

  getDayName(date = new Date(), locale = 'en-US') {
    return date.toLocaleDateString(locale, { weekday: 'long' });
  }

  getMonthName(date = new Date(), locale = 'en-US') {
    return date.toLocaleDateString(locale, { month: 'long' });
  }

  handleGetTodoList() {
    this.todoListService
      .getTodoList()
      .pipe(map((item) => item.slice(0, 5)))
      .subscribe((res) => {
        this.todoList = res;
      });
  }

  handleAddItem() {
    this.showModal = true;
    this.isEdit = false;
    this.details = undefined;
  }

  handleDeleteItem(item: TodoList) {
    this.todoListService.deleteTodoList(item.id).subscribe((res) => {
      const index = this.todoList.indexOf(item);
      this.todoList.splice(index, 1);
    });
  }

  handleUpdateItem(value: TodoList) {
    this.showModal = true;
    this.details = value;
    this.isEdit = true;
  }

  handleReceivedDate(value: TodoList) {
    if (this.isEdit == false) this.todoList.push(value);
    else {
      const index = this.todoList.findIndex((e: TodoList) => e.id == value.id);
      this.todoList[index] = value;
      this.details = undefined;
    }
  }
}
