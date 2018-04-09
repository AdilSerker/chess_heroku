"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coordinates_1 = require("../types/Coordinates");
const Piece_1 = require("./Piece");
class King extends Piece_1.Piece {
    constructor(pos, bool, id) {
        super(pos, bool, id);
        this.name_ = 'King';
    }
    select(board) {
        const char = this.pos_.char;
        const num = this.pos_.num;
        const index = Coordinates_1.KeyIndex[char];
        const moves = [];
        const row = this.color_ ? 1 : 8;
        if (num + 1 <= 8 &&
            (board.select(char, num + 1).isEmpty() ||
                board.select(char, num + 1).getPiece().color !== this.color)) {
            moves.push({ char, num: num + 1 });
        }
        if (num + 1 <= 8 && index + 1 <= 8 &&
            (board.select(Coordinates_1.CharIndex[index + 1], num + 1).isEmpty() ||
                board.select(Coordinates_1.CharIndex[index + 1], num + 1).getPiece().color !== this.color)) {
            moves.push({ char: Coordinates_1.CharIndex[index + 1], num: num + 1 });
        }
        if (index + 1 <= 8 &&
            (board.select(Coordinates_1.CharIndex[index + 1], num).isEmpty() ||
                board.select(Coordinates_1.CharIndex[index + 1], num).getPiece().color !== this.color)) {
            moves.push({ char: Coordinates_1.CharIndex[index + 1], num });
        }
        if (num - 1 > 0 && index + 1 <= 8 &&
            (board.select(Coordinates_1.CharIndex[index + 1], num - 1).isEmpty() ||
                board.select(Coordinates_1.CharIndex[index + 1], num - 1).getPiece().color !== this.color)) {
            moves.push({ char: Coordinates_1.CharIndex[index + 1], num: num - 1 });
        }
        if (index - 1 > 0 &&
            (board.select(Coordinates_1.CharIndex[index - 1], num).isEmpty() ||
                board.select(Coordinates_1.CharIndex[index - 1], num).getPiece().color !== this.color)) {
            moves.push({ char: Coordinates_1.CharIndex[index - 1], num });
        }
        if (num - 1 > 0 && index - 1 > 0 &&
            (board.select(Coordinates_1.CharIndex[index - 1], num - 1).isEmpty() ||
                board.select(Coordinates_1.CharIndex[index - 1], num - 1).getPiece().color !== this.color)) {
            moves.push({ char: Coordinates_1.CharIndex[index - 1], num: num - 1 });
        }
        if (num - 1 > 0 &&
            (board.select(char, num - 1).isEmpty() ||
                board.select(char, num - 1).getPiece().color !== this.color)) {
            moves.push({ char, num: num - 1 });
        }
        if (num + 1 <= 8 && index - 1 <= 8 &&
            (board.select(Coordinates_1.CharIndex[index - 1], num + 1).isEmpty() ||
                board.select(Coordinates_1.CharIndex[index - 1], num + 1).getPiece().color !== this.color)) {
            moves.push({ char: Coordinates_1.CharIndex[index - 1], num: num + 1 });
        }
        if (!this.steps_ && !board.select('a', row).isEmpty() &&
            board.select('a', row).getPiece().isNotMove() &&
            board.select('b', row).isEmpty() &&
            board.select('c', row).isEmpty() &&
            board.select('d', row).isEmpty() &&
            !this._isSquareAttacked({ char: 'e', num: row }, board) &&
            !this._isSquareAttacked({ char: 'd', num: row }, board) &&
            !this._isSquareAttacked({ char: 'c', num: row }, board)) {
            moves.push({ char: 'c', num: row });
        }
        if (!this.steps_ && !board.select('h', row).isEmpty() &&
            board.select('h', row).getPiece().isNotMove() &&
            board.select('g', row).isEmpty() &&
            board.select('f', row).isEmpty() &&
            !this._isSquareAttacked({ char: 'e', num: row }, board) &&
            !this._isSquareAttacked({ char: 'f', num: row }, board) &&
            !this._isSquareAttacked({ char: 'g', num: row }, board)) {
            moves.push({ char: 'g', num: row });
        }
        return this.legalMove_ = moves;
    }
    _isSquareAttacked(square, board) {
        const enemys = board.getPieces(!this.color);
        for (let i = 0; i < enemys.length; ++i) {
            if (enemys[i].name !== 'King') {
                if (JSON.stringify(enemys[i].select(board)).includes(JSON.stringify(square))) {
                    return true;
                }
            }
        }
        return false;
    }
}
exports.King = King;
//# sourceMappingURL=King.js.map