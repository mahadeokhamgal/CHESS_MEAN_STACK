import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { User, UserState } from './reducers/user.reducer';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser } from './reducers/user.selector';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'profile';
  user$: Observable<User | null> | undefined;

  constructor(private store: Store<{ user: UserState }>) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
  }

  ngOnChanges() {
    // console.info("onchanges detected in app component !");
  }

  ngDoCheck() {
    // console.info("ngdocheck detected in app component");
  }

  ngAfterViewInit() {}
}
