import { Injectable } from '@angular/core';
import { Chess, Square } from 'chess.js'; // Import Chess.js

@Injectable({
  providedIn: 'root'
})
export class ChessService {

  chess: Chess; // Instance of Chess.js game
  previousFEN: string;

  constructor() {
    this.chess = new Chess();
    this.previousFEN = this.chess.fen();
  }

  // Reset the game
  resetGame() {
    this.chess.reset();
  }

  // Make a move
  makeMove(move: string) {
    this.previousFEN = this.chess.fen();
    try {
      const result = this.chess.move(move);
      return result;
    } catch(err) {
      console.warn("Invalid move", move);
    }
    return null; // Return updated FEN after move
  }

  // Get the current board FEN (chess position)
  getFEN(): string {
    return this.chess.fen();
  }

  restorePreviousState() {
    this.chess.load(this.previousFEN); // Load the previous valid FEN
  }

  // Check if the game is over
  gameOver(): boolean {
    this.chess.reset();
    return true;
  }

  // Get the possible moves for a piece
  getMoves(square: Square): any[] {
    return this.chess.moves({ square });
  }
}
