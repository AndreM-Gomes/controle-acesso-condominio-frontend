import { selectAllUsers } from './../../../state/user/user.selector';
import { deleteUser, loadUsers } from './../../../state/user/user.actions';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { User } from 'src/app/api/model/user';
import { AppState } from 'src/app/state/app.state';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  dataSource = new MatTableDataSource<User>();
  displayedColumns = ['name','cpf','phone','actions']

  constructor(
    private store: Store<AppState>,
    private dialogRef: MatDialog
  ) { 
    
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.select(selectAllUsers).subscribe(value => {
      console.log(value)
      if(value){
        this.dataSource.data = value;
      }
    })
  }

  deleteUser(id: number){
    console.log('Dispatching delete to =>',id)
    this.store.dispatch(deleteUser({id}));
  }

  editUser(id: number){
    this.dialogRef.open(UserFormComponent,{
      data: {id}
    });
  }

}
