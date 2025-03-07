import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { Rank } from '../../model/rank';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass'
})
export class RegisterComponent {
  public registerForm: FormGroup;
  public user: User;
  constructor() {

    this.user = {
      name: "Untitled ...",
      rating: 800,
      rank: Rank.BEGGINER,
      email: '',
      registerDate: new Date()
    }

    this.registerForm = new FormGroup({
      name: new FormControl(this.user.name,
        [Validators.required, Validators.minLength(4)]),
      rating: new FormControl(this.user.rating),
      email: new FormControl(this.user.email, Validators.required),
      registerDate: new FormControl(this.user.registerDate)
    })
  }

  ngOnInit() {

  }

  onSubmit(event: Event) {
    event.preventDefault();

    console.log(this.user);
    console.log(this.registerForm.get('name')?.value);
    this.user.name = this.registerForm.get('name')?.value;
  }

  ngDoCheck() {
    console.log("ngDoCkeck triggered in register component");
  }
}

