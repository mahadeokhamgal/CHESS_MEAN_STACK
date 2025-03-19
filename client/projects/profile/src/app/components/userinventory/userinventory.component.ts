import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CONFIG } from '../../../config/config';
import { AlertService } from '../../services/alerts.service';
import { User } from '../../reducers/user.reducer';
import { ColDef } from 'ag-grid-community';

import { usersColumnDef } from '../../columndefs/user.columns';
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

  constructor(private apiService: ApiService, private alert: AlertService) {
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
