import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoList } from 'src/app/models/todolist.interface';
import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-todo-list-form',
  templateUrl: './todo-list-form.component.html',
  styleUrls: ['./todo-list-form.component.scss'],
})
export class TodoListFormComponent implements OnChanges {
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output() returnedData: EventEmitter<TodoList> = new EventEmitter();
  @Input() title: string = '';
  @Input() details?: TodoList;
  @Input() set showModal(value: boolean) {
    this.show = value;
  }
  form: FormGroup = this.initForm();
  show: boolean = false;
  constructor(
    private fb: FormBuilder,
    private todoListService: TodoListService
  ) {}

  ngOnChanges() {
    console.log(this.details);
    if (this.details) {
      this.form.patchValue(this.details);
    }
  }

  initForm() {
    return this.fb.group({
      id: this.fb.control(null),
      title: this.fb.control('', Validators.required),
    });
  }

  handleCloseDialog() {
    this.close.emit(true);
    this.form.reset();
  }

  handleFormSubmit() {
    if (this.form.valid) {
      const body = { ...this.form.value };
      if (this.form.value.id == null) {
        this.todoListService.addTodoList(body).subscribe((res) => {
          this.handleCloseDialog();
          this.returnedData.emit(res);
        });
      } else {
        this.todoListService.updateTodoList(body.id, body).subscribe((res) => {
          this.handleCloseDialog();
          this.handleCloseDialog();
          this.returnedData.emit(res);
        });
      }
    }
  }
}
