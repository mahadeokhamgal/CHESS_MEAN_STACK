import { Component } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { CONFIG } from '../../../config/config';
import { AlertsService } from '../../services/alerts.service';
import { User } from '../../reducers/user.reducer';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { usersColumnDef } from '../../model/user.columns';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-userinventory',
  imports: [ AgGridAngular ],
  templateUrl: './userinventory.component.html',
  styleUrl: './userinventory.component.sass'
})
export class UserinventoryComponent {
  public users: User[];
  public gridOptions: GridOptions<any>;
  private gridApi!: GridApi;
  public columnDefs: ColDef[] = usersColumnDef;
  
  constructor(private apiService: ApiServiceService, private alert: AlertsService) {
    this.users = [];
    this.gridOptions = <GridOptions>{
      columnDefs: this.columnDefs,
      rowData: this.users
    };
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api
    if(this.users) {
      this.gridApi.setGridOption('rowData', this.users);
    }
  }

  ngOnInit() {
    this.apiService.get(`${CONFIG.SERVER_URL}/users`)
    .subscribe((data) => {
      console.log(data);
      this.users = data.users;
      if(this.gridApi) {
        this.gridApi.setGridOption('rowData', this.users);
      }
    }, (err) => {
      console.log(err);
      this.alert.showErrorMessage("Error while fetching users!");
    })
  }
}
