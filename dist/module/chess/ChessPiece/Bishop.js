"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coordinates_1 = require("../types/Coordinates");
const Piece_1 = require("./Piece");
class Bishop extends Piece_1.Piece {
    constructor(pos, bool, id) {
        super(pos, bool, id);
        this.name_ = 'Bishop';
    }
    select(board) {
        const char = this.pos_.char;
        const num = this.pos_.num;
        const index = Coordinates_1.KeyIndex[char];
        const moves = [];
        for (let c = index + 1, n = num + 1; c <= 8 && n <= 8; ++c, ++n) {
            if (board.select(Coordinates_1.CharIndex[c], n).isEmpty()) {
                moves.push({ char: Coordinates_1.CharIndex[c], num: n });
            }
            else if (board.select(Coordinates_1.CharIndex[c], n).getPiece().color !== this.color) {
                moves.push({ char: Coordinates_1.CharIndex[c], num: n });
                break;
            }
            else {
                break;
            }
        }
        for (let c = index + 1, n = num - 1; c <= 8 && n > 0; ++c, --n) {
            if (board.select(Coordinates_1.CharIndex[c], n).isEmpty()) {
                moves.push({ char: Coordinates_1.CharIndex[c], num: n });
            }
            else if (board.select(Coordinates_1.CharIndex[c], n).getPiece().color !== this.color) {
                moves.push({ char: Coordinates_1.CharIndex[c], num: n });
                break;
            }
            else {
                break;
            }
        }
        for (let c = index - 1, n = num - 1; c > 0 && n > 0; --c, --n) {
            if (board.select(Coordinates_1.CharIndex[c], n).isEmpty()) {
                moves.push({ char: Coordinates_1.CharIndex[c], num: n });
            }
            else if (board.select(Coordinates_1.CharIndex[c], n).getPiece().color !== this.color) {
                moves.push({ char: Coordinates_1.CharIndex[c], num: n });
                break;
            }
            else {
                break;
            }
        }
        for (let c = index - 1, n = num + 1; c > 0 && n <= 8; --c, ++n) {
            if (board.select(Coordinates_1.CharIndex[c], n).isEmpty()) {
                moves.push({ char: Coordinates_1.CharIndex[c], num: n });
            }
            else if (board.select(Coordinates_1.CharIndex[c], n).getPiece().color !== this.color) {
                moves.push({ char: Coordinates_1.CharIndex[c], num: n });
                break;
            }
            else {
                break;
            }
        }
        return this.legalMove_ = moves;
    }
}
exports.Bishop = Bishop;
//# sourceMappingURL=Bishop.js.map