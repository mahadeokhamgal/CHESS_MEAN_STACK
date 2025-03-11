import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserinventoryComponent } from './components/userinventory/userinventory.component';
import { inject } from '@angular/core';
import { UserState } from './reducers/user.reducer';
import { Store } from '@ngrx/store';
import { selectAuthState } from './reducers/user.selector';
import { map, take } from 'rxjs';

export const userInvetoryRouteAuth: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const store = inject(Store<UserState>);
    const router = inject(Router);

    return store.select(selectAuthState).pipe(
        take(1), // Only need the latest value
        map((isAuthenticated) => {
            if (isAuthenticated) {
                return true;
            } else {
                router.navigate(['/login']);
                return false;
            }
        })
    );
}

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UserinventoryComponent, canActivate: [userInvetoryRouteAuth] },
    { path: "**", redirectTo: 'login' }
];
