import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';
import { User } from '../../model/user';
import { Rank } from '../../model/rank';
import { ApiServiceService } from '../../services/api-service.service';
import { CONFIG } from '../../../config/config';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, NgFor, MatSnackBarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass'
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public user: User;
  public ranks: String[];

  constructor(public apiService: ApiServiceService, public router: Router, public alert: AlertsService) {
    this.user = {
      name: "Untitled ...",
      rating: 800,
      rank: Rank.BEGGINER,
      email: '',
      registerDate: new Date()
    };

    this.ranks = Object.values(Rank);

    this.registerForm = new FormGroup({
      name: new FormControl(this.user.name,
        [Validators.required, Validators.minLength(4)]),
      rank: new FormControl(this.user.rank),
      rating: new FormControl(this.user.rating, [Validators.required, Validators.min(200), Validators.max(2800)]),
      email: new FormControl(this.user.email, [Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.maxLength(16)]),
      cpassword: new FormControl('', [Validators.minLength(6), Validators.maxLength(16)])//add custom validator to match this field with password
    });
  }

  ngOnInit() {

  }

  onSubmit(event: Event) {
    event.preventDefault();
    const postObj = this.registerForm.value;
    delete postObj.cpassword;
    if(!this.registerForm.valid){
      this.alert.showErrorMessage("Form is invalid!");
      return;
    }else if(this.registerForm.controls['password'].value != this.registerForm.controls['cpassword'].value){
      this.alert.showErrorMessage("Passords should match!");
    }

    this.apiService.post(`${CONFIG.SERVER_URL}/register`, postObj)
    .subscribe((data) => {
      console.log("API completed", data);
      this.alert.showSuccessMessage("Successfully created user!");
      
      this.router.navigate(['login'])
      .then(() => {
        console.log("routed successfully to login route");
      })
      .catch((err) => {
        console.log("error with navigating to login page");
        
      })
    }, (err) => {
      console.log("error creatig user", err.error.error);
      this.alert.showErrorMessage("Error creatig user" + err.error.error)
    })
  }

  ngDoCheck() {
    console.log("ngDoCkeck triggered in register component");
  }

}

