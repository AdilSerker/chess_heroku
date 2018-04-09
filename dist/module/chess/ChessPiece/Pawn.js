"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coordinates_1 = require("../types/Coordinates");
const Piece_1 = require("./Piece");
class Pawn extends Piece_1.Piece {
    constructor(pos, bool, id) {
        super(pos, bool, id);
        this.name_ = 'Pawn';
    }
    select(board) {
        const char = this.pos_.char;
        const num = this.pos_.num;
        const moves = [];
        const index = Coordinates_1.KeyIndex[char];
        const step = this.color ? num + 1 : num - 1;
        const doubleStep = this.color ? num + 2 : num - 2;
        const n = this.color ? 5 : 4;
        if (this.isNotMove() && board.select(char, doubleStep) &&
            board.select(char, doubleStep).isEmpty()) {
            moves.push({ char: char, num: doubleStep });
        }
        if (board.select(char, step) && board.select(char, step).isEmpty()) {
            moves.push({ char, num: step });
        }
        if (Coordinates_1.CharIndex[index + 1] && step <= 8 &&
            board.select(Coordinates_1.CharIndex[index + 1], step) &&
            !board.select(Coordinates_1.CharIndex[index + 1], step).isEmpty() &&
            board.select(Coordinates_1.CharIndex[index + 1], step).getPiece().color !== this.color) {
            moves.push({ char: Coordinates_1.CharIndex[index + 1], num: step });
        }
        if (Coordinates_1.CharIndex[index - 1] && step <= 8 &&
            board.select(Coordinates_1.CharIndex[index - 1], step) &&
            !board.select(Coordinates_1.CharIndex[index - 1], step).isEmpty() &&
            board.select(Coordinates_1.CharIndex[index - 1], step).getPiece().color !== this.color) {
            moves.push({ char: Coordinates_1.CharIndex[index - 1], num: step });
        }
        if (Coordinates_1.CharIndex[index - 1] && num === n &&
            board.select(Coordinates_1.CharIndex[index - 1], num) &&
            !board.select(Coordinates_1.CharIndex[index - 1], num).isEmpty() &&
            board.select(Coordinates_1.CharIndex[index - 1], num).getPiece().enPassant &&
            board.select(Coordinates_1.CharIndex[index - 1], num).getPiece().isFirstStep()) {
            moves.push({ char: Coordinates_1.CharIndex[index - 1], num: step });
        }
        if (Coordinates_1.CharIndex[index + 1] && num === n &&
            board.select(Coordinates_1.CharIndex[index + 1], num) &&
            !board.select(Coordinates_1.CharIndex[index + 1], num).isEmpty() &&
            board.select(Coordinates_1.CharIndex[index + 1], num).getPiece().enPassant &&
            board.select(Coordinates_1.CharIndex[index + 1], num).getPiece().isFirstStep()) {
            moves.push({ char: Coordinates_1.CharIndex[index + 1], num: step });
        }
        return this.legalMove_ = moves;
    }
}
exports.Pawn = Pawn;
//# sourceMappingURL=Pawn.js.map