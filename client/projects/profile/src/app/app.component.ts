import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiServiceService } from './services/api-service.service';
import { User, UserState } from './reducers/user.reducer';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, AsyncPipe],
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
    this.user$ = this.store.select(state => state?.user?.user);
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
