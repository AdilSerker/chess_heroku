"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coordinates_1 = require("./types/Coordinates");
const Board_1 = require("./Board/Board");
const Bishop_1 = require("./ChessPiece/Bishop");
const King_1 = require("./ChessPiece/King");
const Knight_1 = require("./ChessPiece/Knight");
const Pawn_1 = require("./ChessPiece/Pawn");
const Queen_1 = require("./ChessPiece/Queen");
const Rook_1 = require("./ChessPiece/Rook");
const _ = require("lodash");
class Chess {
    /**
     * PUBLIC
     */
    constructor(id) {
        this.status = false;
        this.queue = true;
        this.changePawn_ = false;
        this.id = id;
        this.board_ = new Board_1.Board();
        this.choicesPiece_ = null;
        this.pieces_ = [];
        this.pieceId = 0;
    }
    init() {
        if (!this.status) {
            this.status = true;
            this.pieces_ = [];
            this._initWhitePieces();
            this._initBlackPieces();
            this.queue = true;
            this.legalMoves_ = [];
            this.changePawn_ = false;
            this._setPieces(this.pieces_);
        }
    }
    get isChangePawn() {
        return this.changePawn_;
    }
    choiceCell(pos) {
        if (!this.changePawn_) {
            const piece = this._getPieceByPos(pos.char, pos.num);
            if (piece) {
                this.choicesPiece_ = piece;
                this.legalMoves_ = piece.select(this.board_);
                this.board_.flashCells(this.legalMoves_);
                return this.legalMoves_;
            }
            else {
                this.legalMoves_ = [];
            }
        }
        else {
            throw new Error('Change Pawn');
        }
    }
    choicePiece(id) {
        if (!this.changePawn_) {
            const piece = this._getPiece(id);
            if (piece) {
                this.choicesPiece_ = piece;
                this.legalMoves_ = piece.select(this.board_);
                this.board_.flashCells(this.legalMoves_);
                return this.legalMoves_;
            }
            else {
                throw new Error('NOT ACCEPTABLE');
            }
        }
        else {
            throw new Error('Change Pawn');
        }
    }
    move(coordinate) {
        if (this.choicesPiece_) {
            this._makeDump();
            this._move(coordinate);
            if (this._isCheck()) {
                this._revert();
                throw new Error('move on check');
            }
            else {
                this.queue = !this.queue;
                this.choicesPiece_ = null;
                return this.pieces_;
            }
        }
        else {
            console.log('CHOICE PIECE');
        }
    }
    getStatus() {
        return this.status;
    }
    setStatus(bool) {
        this.status = bool;
    }
    getState() {
        return this.board_;
    }
    cancelMove() {
        this._revert();
        return this.pieces_;
    }
    pieces(bool) {
        return this._getPieces(bool).map((piece) => {
            return {
                name: piece.name,
                id: piece.id,
                position: Object.assign({}, piece.position),
                color: piece.color
            };
        });
    }
    changePawn(piece) {
        if (this.changePawn_) {
            const pieces = this._getPieces(this.queue);
            const row = this.queue ? 8 : 1;
            const pawn = pieces.filter(item => {
                return item.name === 'Pawn' &&
                    item.position.num === row;
            })[0];
            this._insertPiece(piece, pawn);
            this.changePawn_ = false;
            this.queue = !this.queue;
        }
        return this.pieces_;
    }
    getLegalMove() {
        return this.legalMoves_;
    }
    getQueue() {
        return this.queue;
    }
    /**
     * PRIVATE
     */
    _delPiece(coordinate) {
        this.pieces_ = this.pieces_.filter(piece => {
            return piece.position.char === coordinate.char
                && piece.position.num === coordinate.num ?
                false : true;
        });
    }
    _insertPiece(piece, pawn) {
        switch (piece) {
            case 'Queen':
                const queen = new Queen_1.Queen(pawn.position, pawn.color, pawn.id);
                this._delPiece(pawn.position);
                this.pieces_.push(queen);
                this.board_.insertPiece(queen);
                break;
            case 'Rook':
                const rook = new Rook_1.Rook(pawn.position, pawn.color, pawn.id);
                this._delPiece(pawn.position);
                this.pieces_.push(rook);
                this.board_.insertPiece(rook);
                break;
            case 'Bishop':
                const bishop = new Bishop_1.Bishop(pawn.position, pawn.color, pawn.id);
                this._delPiece(pawn.position);
                this.pieces_.push(bishop);
                this.board_.insertPiece(bishop);
                break;
            case 'Knight':
                const knight = new Knight_1.Knight(pawn.position, pawn.color, pawn.id);
                this._delPiece(pawn.position);
                this.pieces_.push(knight);
                this.board_.insertPiece(knight);
                break;
            default:
                break;
        }
    }
    _getPieces(bool) {
        let pieces = [];
        if (bool) {
            pieces = this.pieces_.filter(item => {
                return item.color === bool;
            });
        }
        else if (bool !== undefined) {
            pieces = this.pieces_.filter(item => {
                return item.color === bool;
            });
        }
        else {
            pieces = this.pieces_.slice();
        }
        return pieces;
    }
    _initWhitePieces() {
        for (let i = 1; i <= 8; ++i) {
            this.pieces_.push(new Pawn_1.Pawn({ char: Coordinates_1.CharIndex[i], num: 2 }, true, ++this.pieceId));
        }
        this.pieces_.push(new Rook_1.Rook({ char: 'a', num: 1 }, true, ++this.pieceId));
        this.pieces_.push(new Rook_1.Rook({ char: 'h', num: 1 }, true, ++this.pieceId));
        this.pieces_.push(new Knight_1.Knight({ char: 'b', num: 1 }, true, ++this.pieceId));
        this.pieces_.push(new Knight_1.Knight({ char: 'g', num: 1 }, true, ++this.pieceId));
        this.pieces_.push(new Bishop_1.Bishop({ char: 'c', num: 1 }, true, ++this.pieceId));
        this.pieces_.push(new Bishop_1.Bishop({ char: 'f', num: 1 }, true, ++this.pieceId));
        this.pieces_.push(new Queen_1.Queen({ char: 'd', num: 1 }, true, ++this.pieceId));
        this.pieces_.push(new King_1.King({ char: 'e', num: 1 }, true, ++this.pieceId));
    }
    _initBlackPieces() {
        for (let i = 1; i <= 8; ++i) {
            this.pieces_.push(new Pawn_1.Pawn({ char: Coordinates_1.CharIndex[i], num: 7 }, false, ++this.pieceId));
        }
        this.pieces_.push(new Rook_1.Rook({ char: 'a', num: 8 }, false, ++this.pieceId));
        this.pieces_.push(new Rook_1.Rook({ char: 'h', num: 8 }, false, ++this.pieceId));
        this.pieces_.push(new Knight_1.Knight({ char: 'b', num: 8 }, false, ++this.pieceId));
        this.pieces_.push(new Knight_1.Knight({ char: 'g', num: 8 }, false, ++this.pieceId));
        this.pieces_.push(new Bishop_1.Bishop({ char: 'c', num: 8 }, false, ++this.pieceId));
        this.pieces_.push(new Bishop_1.Bishop({ char: 'f', num: 8 }, false, ++this.pieceId));
        this.pieces_.push(new Queen_1.Queen({ char: 'd', num: 8 }, false, ++this.pieceId));
        this.pieces_.push(new King_1.King({ char: 'e', num: 8 }, false, ++this.pieceId));
    }
    _isLegalMove(coordinate) {
        return JSON.stringify(this.legalMoves_).indexOf(JSON.stringify(coordinate)) !== -1;
    }
    _move(coordinate) {
        const char = this.choicesPiece_.position.char, num = this.choicesPiece_.position.num, index = Coordinates_1.KeyIndex[char], board = this.board_;
        if (this._isLegalMove(coordinate)) {
            board.select(char, num).emptyCell();
            if (!board.select(coordinate.char, coordinate.num).isEmpty()) {
                board.select(coordinate.char, coordinate.num).emptyCell();
                this.pieces_ = this.pieces_.filter(piece => {
                    return piece.position.char === coordinate.char
                        && piece.position.num === coordinate.num ?
                        false : true;
                });
            }
            if (this.choicesPiece_.name === 'King') {
                if (Coordinates_1.KeyIndex[coordinate.char] - Coordinates_1.KeyIndex[char] === 2 ||
                    Coordinates_1.KeyIndex[char] - Coordinates_1.KeyIndex[coordinate.char] === 2) {
                    this._castling(coordinate);
                }
            }
            if (this.choicesPiece_.name === 'Pawn') {
                this._pawnMove(coordinate);
            }
            else {
                this._unEnPass();
            }
            this.choicesPiece_.move(coordinate);
            const row = this.queue ? 8 : 1;
            if (this.choicesPiece_.position.num === row && this.choicesPiece_.name === 'Pawn') {
                this.queue = !this.queue;
                this.changePawn_ = true;
            }
            this.board_.insertPiece(this.choicesPiece_);
            this.board_.flashOffAllCells();
            this.legalMoves_ = [];
        }
        else {
            this.choicesPiece_ = null;
            throw new Error('Bad Request');
        }
    }
    _pawnMove(coordinate) {
        const char = this.choicesPiece_.position.char, num = this.choicesPiece_.position.num, index = Coordinates_1.KeyIndex[char], board = this.board_;
        const step = this.queue ? coordinate.num - num : num - coordinate.num;
        const cell = this.queue ? coordinate.num - 1 : coordinate.num + 1;
        if (this.choicesPiece_.isNotMove() && step === 2) {
            this.choicesPiece_.enPassant = true;
        }
        else if (!board.select(coordinate.char, cell).isEmpty() &&
            board.select(coordinate.char, cell).getPiece().color !== this.choicesPiece_.color &&
            board.select(coordinate.char, cell).getPiece().enPassant) {
            const id = board.select(coordinate.char, cell).getPiece().id;
            board.select(coordinate.char, cell).emptyCell();
            this.pieces_ = this.pieces_.filter(item => {
                return item.id !== id;
            });
            this._unEnPass();
        }
        else {
            this._unEnPass();
        }
    }
    _unEnPass() {
        this.pieces_.forEach(item => {
            item.enPassant = false;
        });
    }
    _castling(coordinate) {
        const char = this.choicesPiece_.position.char, num = this.choicesPiece_.position.num, index = Coordinates_1.KeyIndex[char], board = this.board_;
        const prev = Coordinates_1.KeyIndex[coordinate.char] - index === 2 ? 'h' : 'a';
        const aftr = Coordinates_1.KeyIndex[coordinate.char] - index === 2 ? 'f' : 'd';
        const rook = this._getPieceByPos(prev, num);
        board.select(prev, num).emptyCell();
        const array = rook.select(board);
        board.select(prev, num).emptyCell();
        rook.move({ char: aftr, num });
        board.insertPiece(rook);
    }
    _isAttackedSquare(coordinate) {
        let cellAttack = [];
        const opponentPieces = this._getPieces(!this.queue);
        opponentPieces.forEach(function (item) {
            cellAttack = cellAttack.concat(item.select(this.board_));
        }.bind(this));
        return JSON.stringify(cellAttack).indexOf(JSON.stringify(coordinate)) !== -1;
    }
    _makeDump() {
        this.dumpBoard = _.cloneDeep(this.board_);
        this.dumpPiece = this.pieces_.map(item => {
            return _.cloneDeep(item);
        });
        this.dumpQueue = this.queue;
    }
    _revert() {
        this.board_ = _.cloneDeep(this.dumpBoard);
        this.queue = this.dumpQueue;
        this.pieces_ = this.dumpPiece.map(item => {
            return _.cloneDeep(item);
        });
    }
    _isCheck() {
        let cellAttack = [];
        const opponentPieces = this._getPieces(!this.queue);
        opponentPieces.forEach((item) => {
            cellAttack = cellAttack.concat(item.select(this.board_));
        });
        const king = this.pieces_.filter((item) => {
            return item.color === this.queue && item.name === 'King';
        })[0];
        return JSON.stringify(cellAttack)
            .includes(JSON.stringify(king.position));
    }
    _isWhite(piece) {
        return piece.color === true;
    }
    _isBlack(piece) {
        return piece.color === false;
    }
    _setPieces(pieces_) {
        pieces_.forEach(piece => {
            this.board_.insertPiece(piece);
        });
    }
    _getPiece(id) {
        const pieces_Player = this.queue ?
            this.pieces_.filter(this._isWhite) :
            this.pieces_.filter(this._isBlack);
        const piece = pieces_Player.filter(item => {
            return item.id == id;
        })[0];
        return piece;
    }
    _getPieceByPos(char, num) {
        const pieces_Player = this.queue ?
            this.pieces_.filter(this._isWhite) :
            this.pieces_.filter(this._isBlack);
        const piece = pieces_Player.filter(item => {
            return item.position.char === char && item.position.num === num;
        })[0];
        return piece;
    }
}
exports.Chess = Chess;
//# sourceMappingURL=Chess.js.map