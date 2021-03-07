import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { GenericValidators } from 'src/app/shared/generic-validators';
import { createUser } from 'src/app/state/user/user.actions';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<UserFormComponent>
  ) {
    this.userForm = this.fb.group({
      name: ['',Validators.required],
      cpf: ['',GenericValidators.isValidCpf],
      phone: ['', Validators.compose([Validators.maxLength(11),Validators.minLength(11)])],
      email: ['',Validators.email],
      role: ['',Validators.required]
    })
   }

  ngOnInit(): void {
  }

  saveUser(){
    this.store.dispatch(createUser(this.userForm.value));
    this.dialogRef.close();
  }

}
