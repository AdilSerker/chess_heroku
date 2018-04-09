"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Piece {
    constructor(pos, bool, id) {
        this.id_ = id;
        this.pos_ = pos;
        this.steps_ = 0;
        this.legalMove_ = [];
        this.color_ = bool;
    }
    get id() {
        return this.id_;
    }
    isNotMove() {
        return this.steps_ === 0;
    }
    get position() {
        return Object.assign({}, this.pos_);
    }
    get name() {
        return this.name_;
    }
    get color() {
        return this.color_;
    }
    isFirstStep() {
        return this.steps_ === 1;
    }
    move(pos) {
        if (JSON.stringify(this.legalMove_)
            .includes(JSON.stringify(pos))) {
            this.pos_ = pos;
            this.steps_++;
        }
        else {
            console.error('Invalid move');
        }
    }
}
exports.Piece = Piece;
//# sourceMappingURL=Piece.js.map