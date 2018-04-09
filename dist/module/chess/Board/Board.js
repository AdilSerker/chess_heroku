"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cell_1 = require("./Cell");
class Board {
    constructor() {
        this.field_ = {
            a: [null],
            b: [null],
            c: [null],
            d: [null],
            e: [null],
            f: [null],
            g: [null],
            h: [null]
        };
        this.counter = 0;
        let id = 1, booleanColor = true;
        for (const key in this.field_) {
            booleanColor = !booleanColor;
            for (let i = 1; i <= 8; ++i) {
                this.field_[key].push(new Cell_1.Cell(id++, booleanColor, { char: key, num: i }));
                booleanColor = !booleanColor;
            }
        }
    }
    insertPiece(piece) {
        this.field_[piece.position.char][piece.position.num].insertPiece(piece);
    }
    select(char, num) {
        return this.field_[char][num];
    }
    flashCells(coordinates) {
        coordinates.forEach(item => {
            this.field_[item.char][item.num].flash();
        });
    }
    flashOffAllCells() {
        for (const key in this.field_) {
            this.field_[key].forEach((cell) => {
                if (cell) {
                    cell.flashOff();
                }
            });
        }
    }
    getPieces(bool) {
        const pieces = [];
        try {
            for (const key in this.field_) {
                for (let i = 1; i <= 8; ++i) {
                    if (this.field_[key][i] && !this.field_[key][i].isEmpty()) {
                        if (this.field_[key][i].getPiece().color === bool) {
                            const piece = this.field_[key][i].getPiece();
                            pieces.push(piece);
                        }
                    }
                }
            }
            return pieces;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.Board = Board;
//# sourceMappingURL=Board.js.map