import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { User, UserState } from '../../reducers/user.reducer';
import { Store } from '@ngrx/store';
import { selectUser } from '../../reducers/user.selector';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, NgIf, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass'
})
export class NavbarComponent {
  user$: Observable<User | null> | undefined;

  constructor(private store: Store<{ user: UserState }>) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
  }
}
