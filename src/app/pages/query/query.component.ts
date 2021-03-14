import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { concat } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { UserService } from 'src/app/api/user.service';
import { AppState } from 'src/app/state/app.state';
import { searchByCpf } from 'src/app/state/user/user.actions';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  cpfControl = new FormControl('');

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.cpfControl.valueChanges.subscribe( 
      value => this.store.dispatch(
        searchByCpf({cpf: value})
      )
    )
  }
}
