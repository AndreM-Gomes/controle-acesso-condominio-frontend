import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/api/model/user';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-residents-table',
  templateUrl: './residents-table.component.html',
  styleUrls: ['./residents-table.component.scss']
})
export class ResidentsTableComponent implements OnInit,OnDestroy {

  @Input() users$!: Observable<User[]>;
  @Output() delete = new EventEmitter<number>();
  private userSubscription!: Subscription;
  dataSource = new MatTableDataSource<User>();
  displayedColumns = ['name','cpf','phone','actions']
  constructor(
    private store: Store<AppState>,
    private dialogRef: MatDialog
  ) { 
    
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.users$.subscribe( data => {
      this.dataSource.data = data;
    })
  }

  deleteUser(id: number){
    this.delete.next(id);
  }


}
