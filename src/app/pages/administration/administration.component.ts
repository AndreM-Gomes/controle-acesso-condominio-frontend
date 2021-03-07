import { UserFormComponent } from './user-form/user-form.component';
import { GenericValidators } from './../../shared/generic-validators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  
  constructor(public dialog: MatDialog){}

  ngOnInit(): void {
    
  }

  openDialog(){
    this.dialog.open(UserFormComponent, {
      width: '600px'
    })
  }

}
