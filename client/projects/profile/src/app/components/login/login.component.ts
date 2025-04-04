import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alerts.service';
import { Rank } from '../../enums/rank';
import { CONFIG } from '../../../config/config';
import { Store } from '@ngrx/store';
import { setUser } from '../../reducers/user.actions';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  public loginForm: FormGroup;
  public user: User;
  
  constructor(public apiService: ApiService, public router: Router, public alert: AlertService, private store: Store) {
    this.user = {
      name: "Untitled ...",
      rating: 800,
      rank: Rank.BEGGINER,
      email: '',
      registerDate: new Date()
    };

    this.loginForm = new FormGroup({
      email: new FormControl(this.user.email, [Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.maxLength(16)])
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const postObj = this.loginForm.value;

    if (!this.loginForm.valid) {
      this.alert.showErrorMessage("Form is invalid!");
      return;
    }

    this.apiService.post(`${CONFIG.SERVER_URL}/login`, postObj, { withCredentials: true })
      .subscribe((data) => {
        console.log("API completed", data);
        const { name, rank, rating, createdDate, access } = data;
        this.alert.showSuccessMessage(`Successfully Logged in! Welcome ${name}`);//To do , save the user details as state using .
        this.store.dispatch(setUser({ user: { name, rank, rating, createdDate, access } }));
        
        this.router.navigate(['home'])//to do , this is based on user role on which route to route to.
          .then(() => {
            console.log("routed successfully to welcome route");
          })
          .catch((err) => {
            console.log("error with navigating to welcome page");
          })
      }, (err) => {
        if(err.status == 401) {
          this.alert.showErrorMessage("Wrong password!")
        } else {
          console.log("Error loggin in", (err.error.error ?? err.error.message));
          this.alert.showErrorMessage("Error Loggin in" + (err.error.error ?? err.error.message))
        }
      })
  }
}
