import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass'
})
export class NavbarComponent {
  constructor() {

  }
  ngOnInit() {
    console.log("navbar oninit");
    
  }

  ngOnDestroy() {
    console.log("Navbar destroyed");
    
  }
}
