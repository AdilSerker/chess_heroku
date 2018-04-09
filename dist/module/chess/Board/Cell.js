"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cell {
    constructor(id, bool, coordinate) {
        this.id_ = id;
        this.color_ = bool ? 'white' : 'black';
        this.flash_ = false;
        this.coordinate_ = coordinate;
        this.piece_ = null;
    }
    insertPiece(piece) {
        this.piece_ = piece;
    }
    emptyCell() {
        this.piece_ = null;
    }
    getPiece() {
        return this.piece_;
    }
    flash() {
        this.flash_ = true;
    }
    isEmpty() {
        return this.piece_ === null;
    }
    flashOff() {
        this.flash_ = false;
    }
}
exports.Cell = Cell;
//# sourceMappingURL=Cell.js.map