import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserinventoryComponent } from './components/userinventory/userinventory.component';
import { inject } from '@angular/core';
import { UserState } from './reducers/user.reducer';
import { Store } from '@ngrx/store';
import { selectIsAdmin, selectIsChessUser } from './reducers/user.selector';
import { map, take } from 'rxjs';
import { HomeComponent } from './components/home/home.component';
import { AlertsService } from './services/alerts.service';
import { ChessBoardComponent } from './components/chess-board/chess-board.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';

export const adminRouteAuth: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const store = inject(Store<UserState>);
    const router = inject(Router);
    const alert = inject(AlertsService);

    return store.select(selectIsAdmin).pipe(
        take(1), // Only need the latest value
        map((isAuthenticated) => {
            if (isAuthenticated) {
                return true;
            } else {
                alert.showErrorMessage("User is not authorised to access the route");
                router.navigate(['/access-denied']);
                return false;
            }
        })
    );
}

export const chessUserRouteAuth: CanActivateFn = (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const store = inject(Store<UserState>);
    const router = inject(Router);
    const alert = inject(AlertsService);
    
    return store.select(selectIsChessUser).pipe(
        take(1), // Only need the latest value
        map((isAuthenticated) => {
            if (isAuthenticated) {
                return true;
            } else {
                alert.showErrorMessage("User is not authorised to access the route");
                router.navigate(['/access-denied']);
                return false;
            }
        })
    );
}

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'access-denied', component: AccessDeniedComponent },
    { path: 'users', component: UserinventoryComponent, canActivate: [adminRouteAuth] },
    { path: 'home', component: HomeComponent, canActivate: [chessUserRouteAuth] },
    { path: 'play', component: ChessBoardComponent, canActivate: [chessUserRouteAuth] },
    { path: "**", redirectTo: 'login' }
];
