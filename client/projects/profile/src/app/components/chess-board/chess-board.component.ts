import { Component } from '@angular/core';
import { Chess } from 'chess.js';
import { Chessground } from 'chessground';
import { ChessService } from '../../services/chess.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-chess-board',
  imports: [NgIf],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.sass'
})
export class ChessBoardComponent {
  chessground: any;

  constructor(private chessService: ChessService) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    this.initializeBoard();
  }

  initializeBoard() {
    const element = document.getElementById('chess-board')!;
    this.chessground = Chessground(element, {
      turnColor: 'white',
      draggable: {
        enabled: true,
        deleteOnDropOff: false,
      },
      movable: {
        events: {
          after: (orig, dest, metadata) => {
            console.log("move happened");//possibilty to use handlemove here.
            this.handleMove(orig, dest);
          }
        },
        rookCastle: true
      },
      events: {
        move: (orig, dest, capturedPiece) => {
          console.log("move", orig, dest);
        },

        select: (key) => {
          console.log("key", key);
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
  // Handle the move logic
  handleMove(from: string, to: string) {
    const move = this.chessService.makeMove(from + to); // Format as 'e2e4'
    if (move) {
      this.chessground.setPosition(move); // Update the board
    } else {
      this.chessService.restorePreviousState();
      this.chessground.cancelMove();
    }
  }

  resetGame() {
    this.chessService.resetGame(); // Reset the game logic
    this.chessground.setPosition('start'); // Reset the board
  }

  gameOver() {
    this.chessService.gameOver();
  }

  ngOnDestroy() {
    if (this.chessService.chess) {
      this.chessService.chess.clear(); // Destroy Chessground instance
    }
  }
}
