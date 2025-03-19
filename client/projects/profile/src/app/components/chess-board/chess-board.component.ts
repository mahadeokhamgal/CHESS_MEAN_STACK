import { Component, inject } from '@angular/core';
import { Chessground } from 'chessground';
import { ChessService } from '../../services/chess.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Color, Square } from 'chess.js'; // Import Chess.js
import { BackgroundcolorDirective } from '../../directives/backgroundcolor.directive';
import { Observable } from 'rxjs';
import { User, UserState } from '../../reducers/user.reducer';
import { selectUser } from '../../reducers/user.selector';
import { Store } from '@ngrx/store';
import { TimeControl } from '../../interfaces/timecontrols.interface';
import { AlertService } from '../../services/alerts.service';

@Component({
  selector: 'app-chess-board',
  imports: [NgIf, NgFor, BackgroundcolorDirective, AsyncPipe],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.sass'
})
export class ChessBoardComponent {
  chessground: any;
  isTimeSelected: boolean = false;
  timeControls: TimeControl[] = [
    { value: "1+0", time: 1, increament: 0 },
    { value: "2+1", time: 2, increament: 1 },
    { value: "3+0", time: 3, increament: 0 },
    { value: "3+2", time: 3, increament: 2 },
    { value: "5+0", time: 5, increament: 0 },
    { value: "5+3", time: 5, increament: 3 },
    { value: "10+0", time: 10, increament: 0 },
    { value: "10+5", time: 10, increament: 5 },
    { value: "15+10", time: 15, increament: 10 },
    { value: "30+0", time: 30, increament: 0 },
    { value: "30+20", time: 30, increament: 20 },
    { value: "Custom", time: 0, increament: 0 }
  ];
  selectedTimeControl: TimeControl = this.timeControls[0];
  user$: Observable<User | null> | undefined;
  opponent: string = '';
  opponentTime: number = 0;
  userTime: number = 0;
  lastInterval:any = 0;
  constructor(private chessService: ChessService, private store: Store<{ user: UserState }>) { }

  ngOnInit() {
    this.user$ = this.store.select(selectUser);
  }

  ngAfterViewInit(): void {

  }

  initializeBoard() {
    const element = document.getElementById('chess-board')!;
    this.chessground = Chessground(element, {
      turnColor: 'white',
      draggable: {
        enabled: true,
        deleteOnDropOff: false,
        showGhost: true,
      },
      animation: {
        enabled: true,        // enable piece animations, moving and fading
        duration: 200,        // animation duration in milliseconds
      },
      movable: {
        free: true,
        color: "both",
        events: {
          after: (orig, dest, metadata) => {
            console.log("move happened");//possibilty to use handlemove here.
            this.handleMove(orig, dest);
          }
        },
        showDests: true,
        rookCastle: true
      },
      events: {
        move: (orig, dest, capturedPiece) => {
          console.log("move", orig, dest);
        },

        select: (key) => {
          console.log("key", key);
          console.log("Possible moves are", this.chessService.getMoves(key as Square));
        }
      },
      premovable: {
        enabled: true,
        events: {
          set(orig, dest, metadata) {
            console.log("premove called");
          },
        }
      },
      fen: this.chessService.getFEN(),//Attached FEN from chess instance.
      //onDrop: (from: string, to: string) => this.handleMove(from, to) -- Need ondrop hook to feed move to chess instnace
    });
  }

  startGame() {
    this.chessground.setPosition('start');
  }

  clearBoard() {
    this.chessground.setPosition('');
  }

  getAscii() {
    return this.chessService.chess.ascii();
  }

  handleMove(from: string, to: string) {
    const newFEN = this.chessService.makeMove(from + to); // Format as 'e2e4'
    if (newFEN) {//Valid move
      this.chessground.set({ fen: newFEN });
      console.log(newFEN);
      this.startClock();
      this.toggleOrientation();
    } else {
      this.chessground.set({ fen: this.chessService.previousFEN })
    }
  }

  startClock() {
    if(this.lastInterval) {
      clearTimeout(this.lastInterval)
    }
    this.lastInterval = setInterval(this.updateClock.bind(this), 1000); // Update every second
  }

  updateClock() {
    let currPlayer: Color = this.chessService.getTurn();
    if (currPlayer === 'w') {
      this.userTime -= 1;
    } else {
      this.opponentTime -= 1;
    }
  
    // Update Chessground's clock UI (you can use your own method)
    // this.chessground.setClock(currPlayer === 'w' ? this.userTime : this.opponentTime);
  
    if (this.userTime <= 0 || this.opponentTime <= 0) {
      // alertService.showSuccessMessage(`Player ${currPlayer == "w" ? "Black" : "White"} Won by timeout`);
      clearInterval(this.lastInterval)
    }
  }

  resetGame() {
    this.chessService.resetGame();
    const newFEN = this.chessService.getFEN()
    this.chessground.set({ fen: newFEN });
  }

  undoMove() {
    const newFEN = this.chessService.undoMove();
    this.chessground.set({ fen: newFEN });
  }

  gameOver() {
    // this.chessService.gameOver();
    return false;
  }

  ngOnDestroy() {
    if (this.chessService.chess) {
      this.chessService.chess.clear(); // Destroy Chessground instance
    }
  }

  toggleOrientation() {
    this.chessground.toggleOrientation();
  }

  selectTimeControl(index: number) {
    this.selectedTimeControl = this.timeControls[index];
    this.userTime = this.opponentTime = this.selectedTimeControl.time * 60;
    this.isTimeSelected = true;
    this.opponent = ["alice", 'john', 'doe', 'philip'][Math.round(Math.random() * 10) % 4];
    setTimeout(() => {
      this.initializeBoard();
    }, 0)
  }
}
