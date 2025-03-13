import { Component, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, ColDef, GridApi, GridOptions, GridReadyEvent, ModuleRegistry } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-ag-grid',
  imports: [AgGridAngular],
  templateUrl: './ag-grid.component.html',
  styleUrl: './ag-grid.component.sass'
})
export class AgGridComponent {
  @Input()
  public gridLabel!: string;
  @Input()
  public data!: any[];
  public gridOptions!: GridOptions<any>;
  private gridApi!: GridApi;
  @Input()
  public columnDefs!: ColDef[];

  constructor() {
    this.gridOptions = <GridOptions>{
      columnDefs: this.columnDefs,
      rowData: this.data
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.setGridOption('columnDefs', this.columnDefs);
    if (this.data) {
      this.gridApi.setGridOption('rowData', this.data);
    }
  }

  onViewInit() {
    console.log("afterview init aggrid");
  }

}
