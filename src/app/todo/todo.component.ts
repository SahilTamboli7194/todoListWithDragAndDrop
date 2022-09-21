import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms'
import { ITask } from '../model/task';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm !: FormGroup;
  task : ITask[] = [];
  inProgress : ITask[] = [];
  done : ITask[] = [];
  updateIndex!:any;
  isEditEnabled :boolean = false;
  constructor(private fb:FormBuilder ) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item : ['', Validators.required]
    });
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addTask(){
   this.task.push({
      description:this.todoForm.value.item,
      done:false
   });


  }

  onEdit(item:ITask, index:number){
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex= index;
    this.isEditEnabled = true;

  }

  updateTask(){

    this.task[this.updateIndex].description = this.todoForm.value.item;
    this.task[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;

  }
  deleteTask( index :number ){
    this.task.splice(index,1);
  }

  deleteInprogress( index :number ){
    this.inProgress.splice(index,1);
  }

  deleteDone( index :number ){
    this.done.splice(index,1);
  }
}
