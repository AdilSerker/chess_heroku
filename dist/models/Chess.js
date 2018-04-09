"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const chessSchema = new mongoose.Schema({
    board: Object,
    pieces: Array,
    queue: Boolean
});
const ChessModel = mongoose.model('Chess', chessSchema);
exports.default = ChessModel;
//# sourceMappingURL=Chess.js.map