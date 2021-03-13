import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { User } from 'src/app/api/model/user';
import { GenericValidators } from 'src/app/shared/generic-validators';
import { AppState } from 'src/app/state/app.state';
import { createUser, updateUser } from 'src/app/state/user/user.actions';
import { selectUserById } from 'src/app/state/user/user.selector';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number}
  ) {
    this.userForm = this.fb.group({
      name: ['',Validators.required],
      cpf: ['',GenericValidators.isValidCpf],
      phone: ['', Validators.compose([Validators.maxLength(11),Validators.minLength(10)])],
      email: ['',Validators.email],
      role: ['',Validators.required]
    })
   }

  ngOnInit(): void {
    if(this.data?.id){
      this.store.select(selectUserById,{id: this.data.id}).subscribe( value => {
        const {id,...user} = value as User;
        if(value){
          this.userForm.setValue(user);
        }
      })
    }
  }

  saveUser(){
    if(this.data?.id){
      this.store.dispatch(updateUser({user: this.userForm.value,id: this.data.id}))
    }else{
      this.store.dispatch(createUser(this.userForm.value));
    }
    this.dialogRef.close();
  }

}
