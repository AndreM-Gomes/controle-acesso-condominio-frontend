import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { concatMap, map, startWith, switchMap } from 'rxjs/operators';
import { ApartmentService } from 'src/app/api/apartment.service';
import { Apartment } from 'src/app/api/model/apartment';
import { ApartmentDTO } from 'src/app/api/model/apartment.dto';
import { User } from 'src/app/api/model/user';
import { mapToArray } from 'src/app/shared/utils';
import { createApartment, updateApartment } from 'src/app/state/apartment/apartment.actions';
import { selectApartmentById } from 'src/app/state/apartment/apartment.selector';
import { AppState } from 'src/app/state/app.state';
import { loadUsers } from 'src/app/state/user/user.actions';
import { selectUsersByName } from 'src/app/state/user/user.selector';

@Component({
  selector: 'app-apartment-form',
  templateUrl: './apartment-form.component.html',
  styleUrls: ['./apartment-form.component.scss']
})
export class ApartmentFormComponent implements OnInit {

  apartmentNumberControl = new FormControl('',Validators.required);
  resident = new FormControl('');
  selectedOptions$ = this.resident.valueChanges.pipe(
    concatMap(value => this.apartmentService.findNonResidents(value))
  )
  users = new Map<number,User>();
  usersSubject = new BehaviorSubject<User[]>([]);
  filteredOptions$ = combineLatest([this.selectedOptions$,this.usersSubject.asObservable()],
    (filteredUser,selectedUser)=> {
      return filteredUser.filter( user => {
        return !selectedUser.includes(user);
      })
    });
  
  constructor(
    private store: Store<AppState>,
    private apartmentService: ApartmentService,
    @Inject(MAT_DIALOG_DATA) public data: {id: number}
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadUsers())
    if(this.data?.id){
      this.store.select(selectApartmentById,{id: this.data.id}).subscribe( value => {
        const {id,...apartment} = value as Apartment;
        if(value){
          this.apartmentNumberControl.setValue(apartment.apartmentNumber);
          apartment.residents.forEach( resident => {
            this.users.set(resident.id as number,resident);
            this.usersSubject.next(mapToArray(this.users));
          })
        }
      })
    }
  }

  displayFn(user: User){
    return user.name;
  }

  addToResident(){
    this.users.set(this.resident.value.id,this.resident.value);
    this.usersSubject.next(mapToArray(this.users));
    this.resident.setValue('');
  }

  removeResident(id: number){
    this.users.delete(id);
    this.usersSubject.next(mapToArray(this.users));
  }

  save(){
    const apartment: ApartmentDTO = {
      apartmentNumber: this.apartmentNumberControl.value,
      residents: mapToArray(this.users).map(user => user.id) as number[]
    }
    if(this.data?.id){
      this.store.dispatch(updateApartment({apartment,id: this.data?.id}))
    }else{
      this.store.dispatch(createApartment(apartment))
    }
    
  }
}

