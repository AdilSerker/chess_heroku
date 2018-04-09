"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const three = require("three");
const Board_1 = require("./Board/Board");
const types_1 = require("./Board/types");
const Pawn_1 = require("./Piece/Pawn");
const Rook_1 = require("./Piece/Rook");
const Knight_1 = require("./Piece/Knight");
const Bishop_1 = require("./Piece/Bishop");
const Queen_1 = require("./Piece/Queen");
const King_1 = require("./Piece/King");
const Coordinates_1 = require("../chess/types/Coordinates");
const main_1 = require("./main");
const chessId = Number(window.location.pathname.split('/')[2]);
class Chess {
    constructor() {
        this.pieceVec = new three.Vector2();
        this.oldPiecePos = new three.Vector2();
        this.newPiecePos = new three.Vector2();
        this.board_ = new Board_1.Board();
        this.groupMesh_ = new three.Group();
        this.pieces_ = [];
        this.selectPiece = null;
    }
    initState() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                Pawn_1.Pawn.getGeometry(),
                Rook_1.Rook.getGeometry(),
                Knight_1.Knight.getGeometry(),
                Bishop_1.Bishop.getGeometry(),
                Queen_1.Queen.getGeometry(),
                King_1.King.getGeometry(),
                Board_1.Board.getFont()
            ]);
            const board = yield this.board_.getBoard();
            this.groupMesh_.add(board);
            return this.groupMesh_;
        });
    }
    choisePiece(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const queue = this.selectPiece <= 16;
            const friend = queue ? id <= 16 : id >= 16;
            try {
                if (this.legalMove && this.legalMove.length && this.selectPiece && !friend) {
                    const piece = this.pieces_.find(item => {
                        return item.id === id;
                    });
                    main_1.socket.emit('move', Object.assign({}, piece.coordinate_));
                    this.legalMove = [];
                    this.selectPiece = null;
                }
                else {
                    main_1.socket.emit('choice piece', id);
                    this.selectPiece = id;
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    move(cellId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coordinate = this.board_.getCellById(cellId);
                main_1.socket.emit('move', Object.assign({}, coordinate));
                this.legalMove = [];
                this.selectPiece = null;
            }
            catch (error) {
                this.legalMove = [];
                console.error(error);
            }
        });
    }
    choiceCell(cellId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const coordinate = this.board_.getCellById(cellId);
                main_1.socket.emit('choice cell', Object.assign({}, coordinate));
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    initPieces(pieces) {
        pieces.forEach((item) => {
            const piece = this.initPiece(item);
            this.pieces_.push(piece);
            this.groupMesh_.add(piece.initMesh());
        });
    }
    updateState(pieces) {
        this.newState = pieces;
        const movedPiece = this.getMovedPiece(pieces);
        if (movedPiece) {
            this.movedMesh = movedPiece.getMesh();
            this.oldPiecePos = new three.Vector2(movedPiece.getMesh().position.x, movedPiece.getMesh().position.z);
            this.newPiecePos = this.getNewPosition(movedPiece, pieces);
            this.pieceVec = new three.Vector2().subVectors(this.newPiecePos, this.oldPiecePos);
        }
    }
    staticUpdateState(pieces) {
        this.updatePieces(pieces);
    }
    update(dt) {
        if (this.movedMesh) {
            this.movedMesh.position.x += this.pieceVec.x * 2 * dt;
            this.movedMesh.position.z += this.pieceVec.y * 2 * dt;
            const currentPos = this.get2Vector(this.movedMesh.position);
            const subVec = new three.Vector2().subVectors(currentPos, this.oldPiecePos);
            if (subVec.length() > this.pieceVec.length()) {
                this.movedMesh.position.x = this.newPiecePos.x;
                this.movedMesh.position.z = this.newPiecePos.y;
                this.pieceVec = new three.Vector2();
                this.movedMesh = null;
                this.oldPiecePos = null;
                this.newPiecePos = null;
                this.updatePieces(this.newState);
            }
        }
    }
    clearShiftPawn() {
        const shftPawn = document.getElementById('shift');
        shftPawn.innerHTML = '';
    }
    initShiftPawn() {
        const shiftPawn = document.createElement('div');
        shiftPawn.id = 'shift';
        document.body.appendChild(shiftPawn);
        let queen, bishop, knight, rook;
        queen = document.createElement('span');
        queen.id = 'Queen';
        queen.innerText = '♕';
        bishop = document.createElement('span');
        bishop.id = 'Bishop';
        bishop.innerText = '♗';
        knight = document.createElement('span');
        knight.id = 'Knight';
        knight.innerText = '♘';
        rook = document.createElement('span');
        rook.id = 'Rook';
        rook.innerText = '♖';
        shiftPawn.appendChild(queen);
        shiftPawn.appendChild(bishop);
        shiftPawn.appendChild(knight);
        shiftPawn.appendChild(rook);
    }
    updatePieces(pieces) {
        this.groupMesh_.children = this.groupMesh_.children.filter(item => {
            return item.type === 'Group' || item.type === 'swap';
        });
        this.pieces_ = [];
        pieces.forEach((item) => {
            if (item) {
                const piece = this.initPiece(item);
                this.pieces_.push(piece);
                this.groupMesh_.add(piece.initMesh());
            }
        });
    }
    get2Vector(vector) {
        const { x, z } = vector;
        return new three.Vector2(x, z);
    }
    getNewPosition(movedPiece, pieces) {
        const newPos = pieces.find(item => {
            return item.id === movedPiece.id;
        });
        const x = types_1.array[movedPiece.coordinate_.num] * 100 - movedPiece.getMesh().position.x;
        const z = types_1.array[Coordinates_1.KeyIndex[movedPiece.coordinate_.char]] * 100 - movedPiece.getMesh().position.z;
        return new three.Vector2(types_1.array[newPos.position.num] * 100 - x, types_1.array[Coordinates_1.KeyIndex[newPos.position.char]] * 100 - z);
    }
    getMovedPiece(pieces) {
        return this.pieces_.find(item => {
            const piece = pieces.find(piece => {
                return piece.id === item.id;
            });
            return piece ? item.coordinate_.char !== piece.position.char ||
                item.coordinate_.num !== piece.position.num :
                false;
        });
    }
    initPiece(piece) {
        switch (piece.name) {
            case `Pawn`:
                return new Pawn_1.Pawn(piece.id, piece.position, piece.color);
            case `Rook`:
                return new Rook_1.Rook(piece.id, piece.position, piece.color);
            case `Knight`:
                return new Knight_1.Knight(piece.id, piece.position, piece.color);
            case `Bishop`:
                return new Bishop_1.Bishop(piece.id, piece.position, piece.color);
            case `Queen`:
                return new Queen_1.Queen(piece.id, piece.position, piece.color);
            case `King`:
                return new King_1.King(piece.id, piece.position, piece.color);
            default:
                return null;
        }
    }
    _initPawn(id, position, bool) {
        const pawn = new Pawn_1.Pawn(id, position, bool);
        this.pieces_.push(pawn);
        return pawn.initMesh();
    }
    _initRook(id, position, bool) {
        const rook = new Rook_1.Rook(id, position, bool);
        this.pieces_.push(rook);
        return rook.initMesh();
    }
    _initKnight(id, position, bool) {
        const knight = new Knight_1.Knight(id, position, bool);
        this.pieces_.push(knight);
        return knight.initMesh();
    }
    _initBishop(id, position, bool) {
        const bishop = new Bishop_1.Bishop(id, position, bool);
        this.pieces_.push(bishop);
        return bishop.initMesh();
    }
    _initQueen(id, position, bool) {
        const queen = new Queen_1.Queen(id, position, bool);
        this.pieces_.push(queen);
        return queen.initMesh();
    }
    _initKing(id, position, bool) {
        const king = new King_1.King(id, position, bool);
        this.pieces_.push(king);
        return king.initMesh();
    }
}
exports.Chess = Chess;
//# sourceMappingURL=Chess.js.map