import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgGridComponent } from "../ag-grid/ag-grid.component";
import { gameHistoryolumnDefs } from '../../columndefs/gameHistoryColumns';
import { ColDef } from 'ag-grid-community';
import { Game } from '../../interfaces/game';

@Component({
  selector: 'app-user-profile',
  imports: [DatePipe, AgGridComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.sass'
})
export class UserProfileComponent {
  public columns: ColDef[];
  public games: Game[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.columns = gameHistoryolumnDefs;
    this.games = [];//Here show last 10 games only.
    //User has to navigate to dedicated games page to see all history.
  }

}
