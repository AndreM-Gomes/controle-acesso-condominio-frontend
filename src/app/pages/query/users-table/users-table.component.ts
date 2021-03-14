import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { User } from 'src/app/api/model/user';
import { AppState } from 'src/app/state/app.state';
import { selectUsersFoundByCpf } from 'src/app/state/user/user.selector';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  dataSource = new MatTableDataSource<User>();
  displayedColumns = ['name','cpf','phone','apartmentNumber']

  constructor(
    private store: Store<AppState>,
  ) { 
    
  }

  ngOnInit(): void {
    this.store.select(selectUsersFoundByCpf).subscribe(value => {
      console.log(value)
      if(value){
        this.dataSource.data = value;
      }
    })
  }
}
