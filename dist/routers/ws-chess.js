"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Socket = require("socket.io");
const _ = require("lodash");
const server_1 = require("../server");
const Chess_1 = require("../module/chess/Chess");
const chessRoom = {};
chessRoom[0] = [];
const chess = {};
const io = Socket(server_1.server);
io.on('connection', (socket) => {
    const sid = getSid(socket);
    const connect = {};
    let roomId;
    connect[sid] = socket;
    // socket.on('console', (data: any) => {
    //     console.log(data);
    // })
    socket.on('loaded', (id) => {
        if (id !== null) {
            roomId = id;
            if (!chessRoom[id] || chessRoom[id].length == 0) {
                chessRoom[id] = [];
                chessRoom[id].push(connect);
                socket.emit('player', true);
                socket.emit('notify', 'click the URL to copy');
                console.log(`in room ${id} ${chessRoom[id].length} users`);
            }
            else if (chessRoom[id].length == 1) {
                chessRoom[id].push(connect);
                socket.emit('player', false);
                console.log(`in room ${id} ${chessRoom[id].length} users`);
                if (!chess[id]) {
                    chess[id] = new Chess_1.Chess(id);
                    chess[id].init();
                }
                const queue = chess[id].getQueue();
                const pieces = chess[id].pieces();
                chessRoom[id].forEach((player) => {
                    for (const sid in player) {
                        player[sid].emit('initial_pieces', { pieces, queue });
                    }
                });
                if (chess[roomId].isChangePawn) {
                    const queue = chess[roomId].getQueue() ? 0 : 1;
                    const key = getKey(chessRoom[roomId][queue]);
                    chessRoom[roomId][queue][key].emit('is_change_pawn', true);
                }
            }
            else if (authChess(id, sid)) {
                const player = _.find(chessRoom[id], (player) => {
                    return getKey(player) === sid;
                });
                player[sid] = socket;
                const queue = chess[id].getQueue();
                const pieces = chess[id].pieces();
                player[sid].emit('initial_pieces', { pieces, queue });
                const index = _.findIndex(chessRoom[id], (player) => {
                    return getKey(player) === sid;
                }) == 0;
                player[sid].emit('player', index);
                if (chess[roomId].isChangePawn) {
                    const queue = chess[roomId].getQueue() ? 0 : 1;
                    const key = getKey(chessRoom[roomId][queue]);
                    chessRoom[roomId][queue][key].emit('is_change_pawn', true);
                }
            }
        }
        else {
            chessRoom[0].push(connect);
        }
    });
    socket.on('choice piece', (id) => {
        if (chess[roomId]) {
            try {
                chess[roomId].choicePiece(id);
                socket.emit('legal move', { legalMove: chess[roomId].getLegalMove() });
            }
            catch (error) {
                const queue = chess[roomId].getQueue() ? 0 : 1;
                const key = getKey(chessRoom[roomId][queue]);
                chessRoom[roomId][queue][key].emit('notify', error.message.toUpperCase());
            }
        }
    });
    socket.on('choice cell', (data) => {
        try {
            chess[roomId].choiceCell(Object.assign({}, data));
            socket.emit('legal move', { legalMove: chess[roomId].getLegalMove() });
        }
        catch (error) {
            const queue = chess[roomId].getQueue() ? 0 : 1;
            const key = getKey(chessRoom[roomId][queue]);
            chessRoom[roomId][queue][key].emit('notify', error.message.toUpperCase());
        }
    });
    socket.on('move', (data) => {
        try {
            chess[roomId].move(Object.assign({}, data));
            const pieces = chess[roomId].pieces();
            const queue = chess[roomId].getQueue();
            chessRoom[roomId].forEach((element) => {
                for (const key in element) {
                    element[key].emit('update', { pieces, queue });
                }
            });
            if (chess[roomId].isChangePawn) {
                const queue = chess[roomId].getQueue() ? 0 : 1;
                const key = getKey(chessRoom[roomId][queue]);
                chessRoom[roomId][queue][key].emit('is_change_pawn', true);
            }
        }
        catch (error) {
            const queue = chess[roomId].getQueue() ? 0 : 1;
            const key = getKey(chessRoom[roomId][queue]);
            chessRoom[roomId][queue][key].emit('notify', error.message.toUpperCase());
        }
    });
    socket.on('change_pawn', (data) => {
        chess[roomId].changePawn(data);
        const pieces = chess[roomId].pieces();
        const queue = chess[roomId].getQueue();
        chessRoom[roomId].forEach((element) => {
            for (const key in element) {
                element[key].emit('static_update', { pieces, queue });
            }
        });
    });
    socket.on('lose', () => {
        if (chessRoom[roomId]) {
            chessRoom[roomId] = chessRoom[roomId].filter((connect) => {
                return getKey(connect) !== sid;
            });
            console.log(`in room ${roomId} ${chessRoom[roomId].length} users`);
        }
    });
    socket.on('disconnect', () => {
        console.log(`user whit sid: ${sid} disconnect`);
    });
});
function authChess(id, sid) {
    return chessRoom[id].filter((element) => {
        return getKey(element) === sid;
    }).length > 0;
}
function getKey(connect) {
    return Object.keys(connect)[0];
}
function getSid(socket) {
    const io = socket.request.headers.cookie.split(' ');
    return io.map((key) => {
        return key.split('=');
    }).filter((item) => {
        return item[0] === 'connect.sid';
    })[0][1];
}
//# sourceMappingURL=ws-chess.js.map