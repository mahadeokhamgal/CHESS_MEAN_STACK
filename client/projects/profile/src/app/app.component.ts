import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User, UserState } from './reducers/user.reducer';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgIf } from '@angular/common';
import { selectUser } from './reducers/user.selector';
import { BackgroundcolorDirective } from './directives/backgroundcolor.directive';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, AsyncPipe, BackgroundcolorDirective, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'profile';
  user$: Observable<User | null> | undefined;

  constructor(private store: Store<{ user: UserState }>) {
    console.log("app component constructor");
  }

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
    console.log(this.user$);
    
    this.user$.subscribe((data) => {
      console.log("state update to app component");
      
    })
  }

  ngOnChanges() {
    console.warn("onchanges detected in app component !");
  }

  ngDoCheck() {
    console.warn("ngdocheck detected in app component");
  }

  ngAfterViewInit() {}
}
