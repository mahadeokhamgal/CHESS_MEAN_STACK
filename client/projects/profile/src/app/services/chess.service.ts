import { Injectable } from '@angular/core';
import { Chess, Color, Square } from 'chess.js'; // Import Chess.js

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
      this.chess.move(move);
      return this.chess.fen();
    } catch(err) {
      console.warn("Invalid move", move);
      return null;
    }
  }

  // Get the current board FEN (chess position)
  getFEN(): string {
    return this.chess.fen();
  }

  restorePreviousState() {
    // this.chess.load(this.previousFEN); // Load the previous valid FEN
  }

  undoMove() {
    try {
      this.chess.undo();
      return this.chess.fen();
    } catch(err) {
      return this.chess.fen();
    }
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

  getTurn(): Color {
    return this.chess.turn();
  }
}
