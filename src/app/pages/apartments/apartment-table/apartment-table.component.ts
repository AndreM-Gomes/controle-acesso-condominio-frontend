import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Apartment } from 'src/app/api/model/apartment';
import { User } from 'src/app/api/model/user';
import { deleteApartment, loadApartments } from 'src/app/state/apartment/apartment.actions';
import { selectAllApartments } from 'src/app/state/apartment/apartment.selector';
import { AppState } from 'src/app/state/app.state';
import { ApartmentFormComponent } from '../apartment-form/apartment-form.component';

@Component({
  selector: 'app-apartment-table',
  templateUrl: './apartment-table.component.html',
  styleUrls: ['./apartment-table.component.scss']
})
export class ApartmentTableComponent implements OnInit {

  dataSource = new MatTableDataSource<Apartment>();
  displayedColumns = ['apartmentNumber','residents','actions']

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadApartments());
    this.store.select(selectAllApartments).subscribe(value => {
      console.log(value)
      if(value){
        this.dataSource.data = value;
      }
    })
  }

  formatResidents(residents: User[]){
    return residents
            .map(user => user.name)
            .reduce( (previous,current) => {
                return `${previous}, ${current}`
            })
  }

  editApartment(id: number){
    this.dialog.open(ApartmentFormComponent,{
      width: '900px',
      data: {id}
    });
  }

  deleteApartment(id: number){
    this.store.dispatch(deleteApartment({id}))
  }

}
