import { Component } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { CONFIG } from '../../../config/config';
import { AlertsService } from '../../services/alerts.service';
import { User } from '../../reducers/user.reducer';
import { ColDef } from 'ag-grid-community';

import { usersColumnDef } from '../../model/user.columns';
import { AgGridComponent } from "../ag-grid/ag-grid.component";


@Component({
  selector: 'app-userinventory',
  imports: [AgGridComponent],
  templateUrl: './userinventory.component.html',
  styleUrl: './userinventory.component.sass'
})
export class UserinventoryComponent {
  public users: User[];
  public columnDefs: ColDef[];

  constructor(private apiService: ApiServiceService, private alert: AlertsService) {
    this.users = [];
    this.columnDefs = usersColumnDef;
  }

  ngOnInit() {
    this.apiService.get(`${CONFIG.SERVER_URL}/users`)
      .subscribe((data) => {
        console.log(data);
        this.users = data.users;
      }, (err) => {
        console.log(err);
        this.alert.showErrorMessage("Error while fetching users!");
      })
  }
}
