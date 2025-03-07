import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiServiceService } from './services/api-service.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'profile';
  
  constructor(private apiServiceService: ApiServiceService) {
    console.log("app component constructor");  
  }

  ngOnChanges() {
    console.warn("onchanges detected in app component !");
  }

  ngDoCheck() {
    console.warn("ngdocheck detected in app component");
  }

  ngAfterViewInit() {
    this.apiServiceService.get('https://jsonplaceholder.typicode.com/todos/1')
    .subscribe((data: any) => {
      console.log(data);
      
    })
  }
}
