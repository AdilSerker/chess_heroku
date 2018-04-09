"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('../lib/OBJLoader');
class Piece {
    constructor(id, position, bool) {
        this.id = id;
        this.coordinate_ = position;
        this.color_ = bool;
    }
    getMesh() {
        return this.mesh_;
    }
}
exports.Piece = Piece;
//# sourceMappingURL=Piece.js.map