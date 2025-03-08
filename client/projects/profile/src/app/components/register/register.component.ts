import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { Rank } from '../../model/rank';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, NgFor],
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass'
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public user: User;
  public ranks: String[];
  constructor() {
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
      email: new FormControl(this.user.email, Validators.required)
    });
    
  }

  ngOnInit() {

  }

  onSubmit(event: Event) {
    event.preventDefault();

    console.log(this.user);
    console.log(this.registerForm.controls);
    Object.entries(this.registerForm.controls).forEach((arr: [string, AbstractControl]) => {
      const [keyName, formControl] = arr;
      console.log(keyName, formControl.value);
      // this.user[keyName] = formControl.value;
    })
    // console.log(this.user);
  }

  ngDoCheck() {
    console.log("ngDoCkeck triggered in register component");
  }

}

