import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { ApiServiceService } from '../../services/api-service.service';
import { Router } from '@angular/router';
import { AlertsService } from '../../services/alerts.service';
import { Rank } from '../../model/rank';
import { CONFIG } from '../../../config/config';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  public loginForm: FormGroup;
  public user: User;

  constructor(public apiService: ApiServiceService, public router: Router, public alert: AlertsService) {
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

    this.apiService.post(`${CONFIG.SERVER_URL}/login`, postObj)
      .subscribe((data) => {
        console.log("API completed", data);
        const { name, rank, rating } = data;
        this.alert.showSuccessMessage(`Successfully Logged in! Welcome ${name}`);//To do , save the user details as state using .
        // this.router.navigate(['welcome'])
        //   .then(() => {
        //     console.log("routed successfully to welcome route");
        //   })
        //   .catch((err) => {
        //     console.log("error with navigating to welcome page");

        //   })
      }, (err) => {
        console.log("Error loggin in", err.error.error || err.error.message);
        this.alert.showErrorMessage("Error Loggin in" + err.error.error || err.error.message)
      })
  }
}
