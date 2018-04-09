"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coordinates_1 = require("../types/Coordinates");
const Piece_1 = require("./Piece");
class Queen extends Piece_1.Piece {
    constructor(pos, bool, id) {
        super(pos, bool, id);
        this.name_ = 'Queen';
    }
    select(board) {
        const char = this.pos_.char;
        const num = this.pos_.num;
        const index = Coordinates_1.KeyIndex[char];
        const moves = [];
        for (let n = num + 1; n <= 8; ++n) {
            if (!board.select(char, n).isEmpty() &&
                board.select(char, n).getPiece().color === this.color) {
                break;
            }
            else if (!board.select(char, n).isEmpty() &&
                board.select(char, n).getPiece().color !== this.color) {
                moves.push({ char, num: n });
                break;
            }
            else {
                moves.push({ char, num: n });
            }
        }
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
        for (let c = index + 1; c <= 8; c++) {
            if (!board.select(Coordinates_1.CharIndex[c], num).isEmpty() &&
                board.select(Coordinates_1.CharIndex[c], num).getPiece().color === this.color) {
                break;
            }
            else if (!board.select(Coordinates_1.CharIndex[c], num).isEmpty() &&
                board.select(Coordinates_1.CharIndex[c], num).getPiece().color !== this.color) {
                moves.push({ char: Coordinates_1.CharIndex[c], num });
                break;
            }
            else {
                moves.push({ char: Coordinates_1.CharIndex[c], num });
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
        for (let n = num - 1; n > 0; n--) {
            if (!board.select(char, n).isEmpty() &&
                board.select(char, n).getPiece().color === this.color) {
                break;
            }
            else if (!board.select(char, n).isEmpty() &&
                board.select(char, n).getPiece().color !== this.color) {
                moves.push({ char, num: n });
                break;
            }
            else {
                moves.push({ char, num: n });
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
        for (let c = index - 1; c > 0; c--) {
            if (!board.select(Coordinates_1.CharIndex[c], num).isEmpty() &&
                board.select(Coordinates_1.CharIndex[c], num).getPiece().color === this.color) {
                break;
            }
            else if (!board.select(Coordinates_1.CharIndex[c], num).isEmpty() &&
                board.select(Coordinates_1.CharIndex[c], num).getPiece().color !== this.color) {
                moves.push({ char: Coordinates_1.CharIndex[c], num });
                break;
            }
            else {
                moves.push({ char: Coordinates_1.CharIndex[c], num });
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
exports.Queen = Queen;
//# sourceMappingURL=Queen.js.map