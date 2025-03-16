import { Component } from '@angular/core';
import { Chessground } from 'chessground';
import { ChessService } from '../../services/chess.service';
import { NgIf } from '@angular/common';
import { Square } from 'chess.js'; // Import Chess.js

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
      this.chessground.set({fen: newFEN});
      console.log(newFEN);
      this.toggleOrientation();
    } else {
      this.chessground.set({fen: this.chessService.previousFEN})
    }
  }

  resetGame() {
    this.chessService.resetGame();
    const newFEN = this.chessService.getFEN()
    this.chessground.set({fen: newFEN});
  }

  undoMove() {
    const newFEN = this.chessService.undoMove();
    this.chessground.set({fen: newFEN});
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
}
