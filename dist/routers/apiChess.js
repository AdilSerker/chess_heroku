"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const chessController = require("../controllers/chess");
exports.router = express.Router();
exports.router.get('/', chessController.createChess);
exports.router.get('/:id', chessController.chess);
//# sourceMappingURL=apiChess.js.map