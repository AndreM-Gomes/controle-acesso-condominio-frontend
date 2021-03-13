import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { tryFirstAccess } from 'src/app/state/first-access/first-access.actions';

@Component({
  selector: 'app-first-access',
  templateUrl: './first-access.component.html',
  styleUrls: ['./first-access.component.scss']
})
export class FirstAccessComponent implements OnInit {

  firstAccessForm!: FormGroup;
  stateMatcher = new PasswordStateMatcher();

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { 
    this.firstAccessForm = fb.group({
      email: ['',Validators.email],
      password: ['',Validators.compose([Validators.minLength(6),Validators.required])],
      passwordConfirm: ['',]
    },{validators: this.verifyPasswordMatchs})
  }

  ngOnInit(): void {
  }

  tryFirstAccess(){
    const {email,password} = this.firstAccessForm.value;
    this.store.dispatch(tryFirstAccess({email,password}))
  }

  verifyPasswordMatchs(group: FormGroup){
    const password = group.get('password')?.value;
    const passwordConfirm = group.get('passwordConfirm')?.value;
    return password === passwordConfirm ? null: {notMatch: true}
  }

}

export class PasswordStateMatcher implements ErrorStateMatcher{
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean{
      const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
      const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

      return invalidCtrl || invalidParent;
    }
}