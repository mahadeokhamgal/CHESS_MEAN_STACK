import { Component } from '@angular/core';
import { GamePerformanceComponent } from "../game-performance/game-performance.component";
import { AgGridComponent } from "../ag-grid/ag-grid.component";
import { ColDef } from 'ag-grid-community';
import { Game } from '../../interfaces/game';
import { gameHistoryolumnDefs } from '../../columndefs/gameHistoryColumns';

@Component({
  selector: 'app-home',
  imports: [GamePerformanceComponent, AgGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {
  public columns: ColDef[];
  public games: Game[];
  constructor() {
    this.columns = gameHistoryolumnDefs;
    this.games = [];
  }

  ngOnInit() {
    //to do make api to get users game data and show.
  }
}
