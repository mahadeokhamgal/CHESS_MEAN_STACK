import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserinventoryComponent } from './components/userinventory/userinventory.component';

export const routes: Routes = [
    { path:'register', component: RegisterComponent },
    { path:'login', component: LoginComponent },
    { path:'users', component: UserinventoryComponent },
    { path:"**", redirectTo: 'register' }
];
