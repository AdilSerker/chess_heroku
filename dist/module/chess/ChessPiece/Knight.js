"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coordinates_1 = require("../types/Coordinates");
const Piece_1 = require("./Piece");
class Knight extends Piece_1.Piece {
    constructor(pos, bool, id) {
        super(pos, bool, id);
        this.name_ = 'Knight';
    }
    select(board) {
        const char = this.pos_.char;
        const num = this.pos_.num;
        const index = Coordinates_1.KeyIndex[char];
        const moves = [];
        moves.push(...this._checkCell(index + 1, num + 2, board));
        moves.push(...this._checkCell(index + 2, num + 1, board));
        moves.push(...this._checkCell(index + 2, num - 1, board));
        moves.push(...this._checkCell(index + 1, num - 2, board));
        moves.push(...this._checkCell(index - 1, num - 2, board));
        moves.push(...this._checkCell(index - 2, num - 1, board));
        moves.push(...this._checkCell(index - 2, num + 1, board));
        moves.push(...this._checkCell(index - 1, num + 2, board));
        return this.legalMove_ = moves;
    }
    _checkCell(charIndex, number, board) {
        const num = number;
        const moves = [];
        const index = charIndex;
        if (Coordinates_1.CharIndex[index] && num <= 8 && num > 0 &&
            (board.select(Coordinates_1.CharIndex[index], num).isEmpty() ||
                board.select(Coordinates_1.CharIndex[index], num).getPiece().color !== this.color)) {
            moves.push({ char: Coordinates_1.CharIndex[index], num });
        }
        return moves;
    }
}
exports.Knight = Knight;
//# sourceMappingURL=Knight.js.map