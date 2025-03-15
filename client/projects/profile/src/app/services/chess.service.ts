import { Injectable } from '@angular/core';
import { Chess, Square } from 'chess.js'; // Import Chess.js

@Injectable({
  providedIn: 'root'
})
export class ChessService {

  chess: Chess; // Instance of Chess.js game

  constructor() {
    this.chess = new Chess();
  }

  // Reset the game
  resetGame() {
    this.chess.reset();
  }

  // Make a move
  makeMove(move: string) {
    const result = this.chess.move(move);
    return result ? this.chess.fen() : null; // Return updated FEN after move
  }

  // Get the current board FEN (chess position)
  getFEN(): string {
    return this.chess.fen();
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
